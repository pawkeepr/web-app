import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { Formik } from 'formik'
import { startTransition, useCallback, useMemo, useState } from 'react'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import useProfileVeterinary from '~/hooks/use-profile-veterinary'
import useSteps from '~/hooks/use-steps'
import useListPetsOfTutor from '~/store/hooks/list-pets-by-tutor'
import useListPetsByTutor from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import type { IPet } from '~/types/pet'
import type { IPetV2 } from '~/types/pet-v2'
import StepChoice from './components/steps/step-choice'
import StepDocument from './components/steps/step-document'
import StepListBreeds from './components/steps/step-list-breeds'
import StepListGender from './components/steps/step-list-gender'
import StepListPets from './components/steps/step-list-pets'
import StepListSpecies from './components/steps/step-list-species'
import StepScheduledAppointment from './components/steps/step-scheduled-appointment'
import StepTutor from './components/steps/step-tutor'
import type { ModalConfirmProps, StepProps } from './types'

export const NUMBER_STEPS = {
    DOCUMENTS: 0,
    PETS: 1,
    SPECIES: 2,
    RACE: 3,
    SEX: 4,
    TUTOR: 5,
    CHOICE: 6,
    SCHEDULED: 7,
} as const
export type NumberSteps = (typeof NUMBER_STEPS)[keyof typeof NUMBER_STEPS]

type Steps = {
    id: NumberSteps
    title: string
    component: (props: StepProps) => JSX.Element
}

const STEPS: Steps[] = [
    {
        id: NUMBER_STEPS.DOCUMENTS,
        title: 'Documento',
        component: (props: StepProps) => <StepDocument {...props} />,
    },
    {
        id: NUMBER_STEPS.PETS,
        title: 'Pets',
        component: (props: StepProps) => <StepListPets {...props} />,
    },
    {
        id: NUMBER_STEPS.SPECIES,
        title: 'Espécie',
        component: (props: StepProps) => <StepListSpecies {...props} />,
    },
    {
        id: NUMBER_STEPS.RACE,
        title: 'Raça',
        component: (props: StepProps) => <StepListBreeds {...props} />,
    },
    {
        id: NUMBER_STEPS.SEX,
        title: 'Gênero',
        component: (props: StepProps) => <StepListGender {...props} />,
    },
    {
        id: NUMBER_STEPS.TUTOR,
        title: 'Tutor',
        component: (props: StepProps) => <StepTutor {...props} />,
    },
    {
        id: NUMBER_STEPS.CHOICE,
        title: 'Consulta',
        component: (props: StepProps) => <StepChoice {...props} />,
    },
    {
        id: NUMBER_STEPS.SCHEDULED,
        title: 'Agendamento',
        component: (props: StepProps) => <StepScheduledAppointment {...props} />,
    },
]

const ModalListPets = ({
    children,
    label,
    selectedTabInitial = 0,
}: ModalConfirmProps) => {
    const [document, setDocument] = useState('')
    const [pet, setPet] = useState<IPetV2>({} as IPetV2)
    const { closeModal, open, showModal } = useModal()

    const { nextStep, onChangeSelectedTab, previousStep, selectedTab } = useSteps(
        STEPS,
        selectedTabInitial,
    )

    const onChangePet = (pet: IPetV2) => {
        setPet(pet)
    }

    const { handleSubmit } = useListPetsOfTutor({
        document,
        strategy: 'simple',
    })

    const { data: pets, isPending } = useListPetsByTutor({ document })

    const veterinary = useProfileVeterinary()

    const initialValues = useMemo(() => {
        const isArray = Array.isArray(pets)
        if (isArray && pets?.length === 0)
            return {
                cpf_cnpj: document,
                ownerEmergencyContact: {
                    cpf_cnpj: document,
                },
                date_birth: '2021-01-01', // dado falso para não dar erro no backend
                veterinary,
            }
        const pet = (isArray ? pets[0] : pets) as IPetV2
        return {
            id: pet?.id,
            name: '',
            specie: 'unknown',
            race: 'unknown',
            castrated: 'no',
            cpf_cnpj: document,
            ownerEmergencyContact: {
                last_name: pet?.main_responsible_guardian?.last_name as string,
                first_name: pet?.main_responsible_guardian?.first_name as string,
                cpf_cnpj: document,
                phone: pet?.main_responsible_guardian?.contact?.phone as string,
                email: pet?.main_responsible_guardian?.contact?.email as string,
                whatsapp: pet?.main_responsible_guardian?.contact
                    ?.whatsapp as string,
            },
            date_birth: '2021-01-01', // dado falso para não dar erro no backend
            sex: 'unknown',
            veterinary,
        } as IPet
    }, [pets, veterinary, document])

    const onChangeDocument = (doc: string) => {
        setDocument(doc)
    }

    const onSubmit = useCallback(
        async (values: IPet) => {
            const pet = await handleSubmit(values)

            if (!pet) return
            startTransition(() => {
                onChangePet(pet as IPetV2)
                onChangeSelectedTab(NUMBER_STEPS.CHOICE)
            })
        },
        [handleSubmit, closeModal],
    )

    const hasVisibleStep = useMemo(() => {
        return (
            selectedTab >= NUMBER_STEPS.SPECIES && selectedTab < NUMBER_STEPS.CHOICE
        )
    }, [selectedTab])

    return (
        <>
            {children?.({ onChangeOpen: showModal, onChangeDocument })}
            {!children && (
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={() => showModal()}
                        className="
                                rounded-md 
                                bg-secondary-500 bg-opacity-20 
                                px-4 py-2 text-sm 
                                font-medium 
                                text-white 
                                hover:bg-opacity-30 
                                focus:outline-none 
                                focus-visible:ring-2 
                                focus-visible:ring-white 
                                focus-visible:ring-opacity-75
                            "
                    >
                        {label}
                    </button>
                </div>
            )}

            <Modal
                onClose={() => {
                    closeModal()
                    onChangeDocument('')
                    onChangePet({} as IPetV2)
                    setTimeout(() => {
                        onChangeSelectedTab(0)
                    }, 300)
                }}
                mobilePage={selectedTab !== NUMBER_STEPS.DOCUMENTS}
                classNames={{
                    modal: '!min-w-[600px]',
                }}
                open={open}
            >
                <section className="web:min-w-[640px]">
                    <Tab.Group
                        selectedIndex={selectedTab}
                        onChange={onChangeSelectedTab}
                        defaultIndex={selectedTabInitial}
                    >
                        <Tab.List className="flex flex-row w-full justify-between">
                            {STEPS.map((item) => (
                                <Tab key={item.id} className="hidden" />
                            ))}
                        </Tab.List>
                        {hasVisibleStep && (
                            <div className="flex flex-row  justify-between mobile:w-[85vw]">
                                {STEPS.slice(2, STEPS.length - 2).map((item) => (
                                    <div
                                        key={item.id}
                                        className={cn(
                                            'p-2 text-center uppercase bg-opacity-10 bg-primary-500 flex-1 w-full',
                                            {
                                                'text-primary-500':
                                                    selectedTab === item.id,
                                                'text-gray-400':
                                                    selectedTab !== item.id,
                                            },
                                        )}
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        )}
                        <Formik
                            initialValues={initialValues as IPet}
                            enableReinitialize
                            onSubmit={onSubmit}
                        >
                            <Tab.Panels>
                                {STEPS.map(
                                    ({ component: Component, id }, index) => (
                                        <Tab.Panel
                                            key={id}
                                            tabIndex={index}
                                            className="w-full mt-4 "
                                        >
                                            <Component
                                                onChangePet={onChangePet}
                                                pet={pet}
                                                onChangeStep={onChangeSelectedTab}
                                                pets={(pets || []) as IPetV2[]}
                                                onChangeDocument={onChangeDocument}
                                                nextStep={nextStep}
                                                isLoading={isPending}
                                                previousStep={previousStep}
                                                closeModal={closeModal}
                                            />
                                        </Tab.Panel>
                                    ),
                                )}
                            </Tab.Panels>
                        </Formik>
                    </Tab.Group>
                </section>
            </Modal>
        </>
    )
}

export default ModalListPets
