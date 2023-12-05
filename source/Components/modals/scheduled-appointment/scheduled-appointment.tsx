import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { Formik } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import { BtnPrimary } from '~/Components/atoms/btn'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import useSteps from '~/hooks/use-steps'
import useListPetsOfTutor from '~/store/hooks/list-pets-of-tutor'
import { IPet } from '~/types/pet'
import { IPetV2 } from '~/types/pet-v2'
import StepDocument from '../modal-list-pets/components/steps/step-document'
import StepListBreeds from '../modal-list-pets/components/steps/step-list-breeds'
import StepListGender from '../modal-list-pets/components/steps/step-list-gender'
import StepListPets from '../modal-list-pets/components/steps/step-list-pets'
import StepListSpecies from '../modal-list-pets/components/steps/step-list-species'
import StepTutor from '../modal-list-pets/components/steps/step-tutor'
import { ModalConfirmProps, StepProps } from '../modal-list-pets/types'
import StepScheduledAppointment from './components/steps/step-scheduled-appointment'

const STEPS = [
    {
        id: 1,
        title: 'Documento',
        component: (props: StepProps) => <StepDocument {...props} />
    },
    {
        id: 2,
        title: 'Pets',
        component: (props: StepProps) => <StepListPets {...props} />
    },
    {
        id: 3,
        title: 'Espécie',
        component: (props: StepProps) => <StepListSpecies {...props} />
    },
    {
        id: 4,
        title: 'Raça',
        component: (props: StepProps) => <StepListBreeds {...props} />
    },
    {
        id: 5,
        title: 'Gênero',
        component: (props: StepProps) => <StepListGender {...props} />
    },
    {
        id: 6,
        title: 'Tutor',
        component: (props: StepProps) => <StepTutor {...props} />
    },
]

const STEPS_HIDDEN = [
    {
        id: 7,
        title: 'Agendar Consulta',
        component: (props: StepProps & { pet: IPetV2 }) => <StepScheduledAppointment {...props} />
    }
]


const ModalListPets = ({
    children,
    selectedTabInitial = 1
}: ModalConfirmProps) => {
    const [pet, setPet] = useState<IPetV2 | null>(null)
    const [document, setDocument] = useState('')
    const { closeModal, open, showModal } = useModal()

    const { activeData: pets, handleSubmit, isLoading } = useListPetsOfTutor(document)

    const initialValues: IPet = useMemo(() => ({
        id: null,
        name: '',
        cpf_tutor: document,
        species: null,
        breed: null,
        ownerEmergencyContact: {
            cpf_cnpj: document,
            phone: pets.length > 0 ? pets[0].contact_tutor.phone as string : '',
            email: pets.length > 0 ? pets[0].contact_tutor.email as string : '',
            name: pets.length > 0 ? pets[0].name_tutor : '',
        },
        castrated: false,
        date_birth: '',
        gender: null as any,
    }), [document, pets])

    const {
        nextStep,
        onChangeSelectedTab,
        previousStep,
        selectedTab,
    } = useSteps(STEPS, selectedTabInitial)


    const onChangeDocument = (doc: string) => {
        setDocument(doc)
    }

    const onSubmit = useCallback(async (values: IPet) => {
        const pet = await handleSubmit({
            name_tutor: values.ownerEmergencyContact.name as string,
            phone_tutor: values.ownerEmergencyContact.phone,
            contact_tutor: {
                email: values.ownerEmergencyContact.email,
                phone: values.ownerEmergencyContact.phone,
                whatsapp: values.ownerEmergencyContact.phone,
            },
            cpf_tutor: values.ownerEmergencyContact.cpf_cnpj,
            vets_data: [],
            location_tutor: {
                country: 'Brasil',
                zipCode: null,
                state: null,
                city: null,
                neighborhood: null,
                street: null,
                number: null,
                complement: null,
            },
            pet_data: {
                name_pet: values.name,
                specie: values.species,
                race: values.breed,
                castrated: values.castrated,
                sex: values.gender,
                microchip: null,
                identification_number: null,
                blood_type: null,
                blood_donator: null,
                organ_donor: null,
                date_birth: null,
            },
            health_insurance: {
                name: null,
                type_health: null,
                number_health: null,
                validity: null,
            },
            responsible_tutors: {
                name_tutor: null,
                cpf_tutor: null
            },
        })

        if (!pet) return

        setPet(pet)

    }, [handleSubmit])

    const handleNavigate = useCallback((pet: IPetV2) => {
        setPet(pet)
        onChangeSelectedTab(STEPS.length)
    }, [onChangeSelectedTab])

    return (
        <>
            {children?.({ onChangeOpen: showModal, onChangeDocument }) || (
                <BtnPrimary
                    onClick={showModal}
                    label="Agendar Consulta"
                    id="button-new-consult"
                    style={{ height: 42 }}
                />
            )}


            <Modal
                onOpen={() => showModal()}
                onClose={() => {
                    onChangeSelectedTab(selectedTabInitial)
                    closeModal()
                }}
                modal
                nested
                open={open}
                lockScroll
                className="py-4 min-h-[calc(100vh-4rem)] "
            >
                <Tab.Group selectedIndex={selectedTab} onChange={onChangeSelectedTab} defaultIndex={selectedTabInitial} >
                    <h1 className='text-center font-bold text-2xl'>
                        Agendar Consulta
                    </h1>
                    <h5 className='text-center text-gray-500 mb-2'>
                        Selecione ou Adicione um Pet para prosseguir no agendamento da consulta.
                    </h5>
                    <Tab.List className="flex flex-row w-full justify-between">
                        {
                            [...STEPS, ...STEPS_HIDDEN].map(
                                (item, index) => (
                                    <Tab

                                        key={item.id}
                                        className="hidden"
                                    />
                                )
                            )
                        }
                    </Tab.List>
                    <div className="flex flex-row w-full justify-between">

                        {
                            STEPS.map(
                                (item, index) => (
                                    <div
                                        key={item.id}
                                        className={cn(
                                            "p-2 text-center uppercase bg-opacity-10 bg-primary-500 flex-1 w-full",
                                            {
                                                "text-primary-500": selectedTab === index,
                                                "text-gray-400": selectedTab !== index,
                                            }
                                        )}
                                    >
                                        {item.title}
                                    </div>
                                )
                            )
                        }
                    </div>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={onSubmit}
                    >
                        <Tab.Panels className="w-full h-full relative">
                            {
                                [...STEPS, ...STEPS_HIDDEN].map(
                                    ({ component: Component, id }, index) => (
                                        <Tab.Panel key={id} tabIndex={index}>
                                            <Component
                                                pet={pet as IPetV2}
                                                onChangeStep={onChangeSelectedTab}
                                                pets={pets}
                                                handleNavigate={handleNavigate}
                                                closeModal={closeModal}
                                                nextStep={nextStep}
                                                isLoading={isLoading}
                                                previousStep={previousStep}
                                                onChangeDocument={onChangeDocument}
                                            />
                                        </Tab.Panel>
                                    )
                                )
                            }

                        </Tab.Panels>
                    </Formik>

                </Tab.Group>
            </Modal>
        </>
    )
}

export default ModalListPets