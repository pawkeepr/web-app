import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import routes from '~/routes'
import usePetsByDocument from '~/store/hooks/pets/use-pets'
import { Gender } from '~/store/slices/pets/speciesType'
import { IPet } from '~/types/pet'
import StepDocument from './components/steps/step-document'
import StepListBreeds from './components/steps/step-list-breeds'
import StepListGender from './components/steps/step-list-gender'
import StepListPets from './components/steps/step-list-pets'
import StepListSpecies from './components/steps/step-list-species'
import { ModalConfirmProps } from './types'

const STEPS = [
    {
        id: 1,
        title: 'Documento',
        component: (props: any) => <StepDocument {...props} />
    },
    {
        id: 2,
        title: 'Pets',
        component: (props: any) => <StepListPets {...props} />
    },
    {
        id: 3,
        title: 'Espécie',
        component: (props: any) => <StepListSpecies {...props} />
    },
    {
        id: 4,
        title: 'Raça',
        component: (props: any) => <StepListBreeds {...props} />
    },
    {
        id: 5,
        title: 'Gênero',
        component: (props: any) => <StepListGender {...props} />
    },
]

const ModalListPets = ({
    children,
    label,
    onCancel,
    selectedTabInitial = 2
}: ModalConfirmProps) => {
    const [document, setDocument] = useState('')
    const [selectedTab, setSelectedTab] = useState(selectedTabInitial)
    const { closeModal, open, showModal } = useModal()

    const router = useRouter()

    useEffect(() => {
        return () => {
            setSelectedTab(2)
        }
    }, [])

    const handleNavigate = useCallback((pet: IPet) => {
        setTimeout(() => {
            router.push(`${routes.dashboard.new.appointments}?document=${document}&pet=${pet.id}`)
        }, 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [document])


    const initialValues: IPet = {
        name: '',
        species: '' as any,
        breed: '' as any,
        ownerEmergencyContact: {
            document,
        },
        castrated: false,
        date_birth: '',
        gender: Gender.unknown,
    }

    const { activeData: pets, handleSubmit, isLoading } = usePetsByDocument(document)

    const onChangeSelectedTab = (index: number) => {
        setSelectedTab(index)
    }

    const handleCancel = () => {
        onCancel?.()
        closeModal()
    }

    const onChangeDocument = (doc: string) => {
        setDocument(doc)
    }

    return (
        <>

            {
                children && children({ onChangeOpen: showModal, onChangeDocument })
            }
            {
                !children && (
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
                )
            }


            <Modal
                onOpen={() => showModal()}
                onClose={() => closeModal()}
                modal
                nested
                open={open}
                lockScroll
                className="w-[750px] py-4"
            >
                <Tab.Group selectedIndex={selectedTab} onChange={onChangeSelectedTab}>
                    <h1 className='text-center font-bold text-2xl'>
                        Adicionar Pet
                    </h1>
                    <h5 className='text-center text-gray-500 mb-2'>
                        Selecione ou Adicione um Pet para prosseguir na consulta.
                    </h5>
                    <Tab.List className="flex flex-row w-full justify-between">
                        {
                            STEPS.map(
                                (item) => (
                                    <div
                                        key={item.id}
                                        className={cn(
                                            "p-2 text-center uppercase bg-opacity-10 bg-primary-500 flex-1 w-full",
                                            {
                                                "text-primary-500": selectedTab === item.id,
                                                "text-gray-400": selectedTab !== item.id,
                                            }
                                        )}
                                    >
                                        {item.title}
                                    </div>
                                )
                            )
                        }
                    </Tab.List>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={handleSubmit}
                    >
                        <Tab.Panels className="w-full">
                            {
                                STEPS.map(
                                    ({ component: Component, id }) => (
                                        <Tab.Panel key={id} tabIndex={id}>
                                            <Component
                                                pets={pets}
                                                isLoading={isLoading}
                                                onCancel={handleCancel}
                                                onChangeSelectedTab={handleNavigate}
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