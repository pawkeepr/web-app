import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { Formik } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import { BtnPrimary } from '~/Components/atoms/btn'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import useListPetsOfTutor from '~/store/hooks/list-pets-of-tutor'
import { IPet } from '~/types/pet'
import StepDocument from '../modal-list-pets/components/steps/step-document'
import StepListBreeds from '../modal-list-pets/components/steps/step-list-breeds'
import StepListGender from '../modal-list-pets/components/steps/step-list-gender'
import StepListPets from '../modal-list-pets/components/steps/step-list-pets'
import StepListSpecies from '../modal-list-pets/components/steps/step-list-species'
import StepTutor from '../modal-list-pets/components/steps/step-tutor'
import { ModalConfirmProps, StepProps } from '../modal-list-pets/types'

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


const ModalListPets = ({
    children,
    selectedTabInitial = 1
}: ModalConfirmProps) => {
    const [document, setDocument] = useState('')
    const [selectedTab, setSelectedTab] = useState(selectedTabInitial)
    const { closeModal, open, showModal } = useModal()

    const { activeData: pets, handleSubmit, isLoading } = useListPetsOfTutor(document)

    const initialValues: IPet = useMemo(() => ({
        id: null,
        name: '',
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

    const onChangeSelectedTab = (index: number) => {
        setSelectedTab(index)
    }

    const onChangeDocument = (doc: string) => {
        setDocument(doc)
    }

    const nextStep = useCallback(() => {
        setSelectedTab(state => Math.min(state + 1, STEPS.length - 1))
    }, [])

    const previousStep = useCallback(() => {
        setSelectedTab(state => Math.max(state - 1, 0))
    }, [])

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

    }, [handleSubmit])

    return (
        <>
            {children?.({ onChangeOpen: showModal, onChangeDocument }) || (
                <BtnPrimary
                    onClick={showModal}
                    label="Agendar Consulta"
                    id="button-new-consult"
                    style={{ height: 42 }}
                >

                </BtnPrimary>
            )}


            <Modal
                onOpen={() => showModal()}
                onClose={() => {
                    setSelectedTab(selectedTabInitial)
                    closeModal()
                }}
                modal
                nested
                open={open}
                lockScroll
                className="py-4 min-h-[calc(100vh-4rem)] !overflow-x-hidden"
            >
                <Tab.Group selectedIndex={selectedTab} onChange={onChangeSelectedTab} defaultIndex={selectedTabInitial} >
                    <h1 className='text-center font-bold text-2xl'>
                        Adicionar Pet
                    </h1>
                    <h5 className='text-center text-gray-500 mb-2'>
                        Selecione ou Adicione um Pet para prosseguir na consulta.
                    </h5>
                    <Tab.List className="flex flex-row w-full justify-between">
                        {
                            STEPS.map(
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
                                STEPS.map(
                                    ({ component: Component, id }, index) => (
                                        <Tab.Panel key={id} tabIndex={index}>
                                            <Component
                                                pets={pets}
                                                handleNavigate={() => { setSelectedTab(5) }}
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