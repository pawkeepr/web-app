import { Dialog, Tab, Transition } from '@headlessui/react'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'
import useFindTutorByDocument from '~/hooks/use-find-tutor-by-document'
import routes from '~/routes'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { addNew } from '~/store/pets/actions'
import { SpeciesType } from '~/store/pets/speciesType'
import { Breed, IPet } from '~/store/pets/types'
import StepDocument from './components/organisms/steps/step-document'
import StepListBreeds from './components/organisms/steps/step-list-breeds'
import StepListPets from './components/organisms/steps/step-list-pets'
import StepListSpecies from './components/organisms/steps/step-list-species'
import StepLoading from './components/organisms/steps/step-loading'

type onChangeOpen = (arg: boolean) => void

type ChildrenProps = {
    onChangeOpen: onChangeOpen
    onChangeDocument: (doc: string) => void
}

type ModalConfirmProps = {
    label?: string
    onConfirm?: () => void
    onCancel?: () => void
    children?: (params: ChildrenProps) => React.ReactNode
    selectedTabInitial?: number
}

export type InitialValues = {
    name: string
    species: SpeciesType
    breed: Breed
    document: string
    ownerEmergencyContact: ReturnType<typeof useFindTutorByDocument>
}

const ModalListPets = ({
    children,
    label,
    onCancel,
    onConfirm,
    selectedTabInitial = 2
}: ModalConfirmProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [document, setDocument] = useState('')
    const [selectedTab, setSelectedTab] = useState(selectedTabInitial)

    const { isPetSuccess, isPetCreated } = useAppSelector(state => state.Pets)
    const dispatch = useAppDispatch()
    const tutor = useFindTutorByDocument(document);
    const router = useRouter()

    const handleNavigate = useCallback((pet: IPet) => {
        setTimeout(() => {
            router.push(`${routes.dashboard.new.appointments}?document=${document}&pet=${pet.id}`)
        }, 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [document])

    useEffect(() => {
        if (isPetSuccess && isPetCreated) {
            handleNavigate(isPetCreated)
        }

        return () => {
            // dispatch(resetCreatedPet())
        }

    }, [isPetSuccess, isPetCreated, handleNavigate, dispatch])

    const initialValues: InitialValues = {
        name: '',
        document: document,
        species: '' as any,
        breed: '' as any,
        ownerEmergencyContact: tutor
    }

    const pets = useAppSelector(state => state.Pets?.pets?.filter(pet => {
        return pet?.ownerEmergencyContact?.document === document.replace(/\D/g, '')
    }))

    const onChangeSelectedTab = (index: number) => {
        setSelectedTab(index)
    }

    const handleSubmit = useCallback((values: InitialValues) => {
        dispatch(addNew(values))
    }, [dispatch])

    const handleCancel = () => {
        onCancel?.()
        setIsOpen(false)
    }

    const onChangeOpen = (arg: boolean) => {
        setIsOpen(arg)
    }

    const closeModal = () => {
        onChangeOpen(false)
    }

    const openModal = () => {
        // dispatch(resetCreatedPet())
        onChangeOpen(true)
    }

    const onChangeDocument = (doc: string) => {
        setDocument(doc)
    }

    return (
        <>

            {
                children && children({ onChangeOpen, onChangeDocument })
            }
            {
                !children && (
                    <div className="flex items-center justify-center">
                        <button
                            type="button"
                            onClick={openModal}
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


            <Transition appear show={isOpen} as={Fragment}>
                <Tab.Group selectedIndex={selectedTab} onChange={onChangeSelectedTab}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="
                                        w-full 
                                        max-w-md 
                                        transform 
                                        overflow-hidden 
                                        rounded-2xl 
                                        bg-white 
                                        p-6 
                                        text-left 
                                        align-middle 
                                        shadow-xl 
                                        transition-all
                                        dark:!bg-dark-500
                                        dark:!text-gray-200
                                        !font-sans
                                        "
                                    >
                                        <Dialog.Title
                                            as="h2"
                                            className="text-xl font-semibold leading-6 text-gray-900 dark:!text-gray-200 text-center"
                                        >
                                            Adicionar Pet
                                        </Dialog.Title>

                                        <Dialog.Description
                                            as="p"
                                            className="text-xs text-gray-700 dark:!text-gray-200 text-center"
                                        >
                                            Selecione ou Adicione um Pet para prosseguir na consulta.
                                        </Dialog.Description>

                                        <Tab.List>
                                            {
                                                [1, 2, 3, 4, 5].map(
                                                    (item) => (
                                                        <Tab
                                                            key={item}
                                                            className="hidden"
                                                        />
                                                    )
                                                )
                                            }
                                        </Tab.List>
                                        <Formik
                                            initialValues={initialValues}
                                            enableReinitialize
                                            onSubmit={handleSubmit}
                                        >

                                            <Tab.Panels className="mt-2">
                                                <Tab.Panel key={1} tabIndex={1}>
                                                    <StepDocument
                                                        handleCancel={handleCancel}
                                                        onChangeSelectedTab={onChangeSelectedTab}
                                                        selectedTab={selectedTab}
                                                    />
                                                </Tab.Panel>
                                                <Tab.Panel key={2} tabIndex={2}>
                                                    <StepListPets
                                                        pets={pets}
                                                        handleNavigate={handleNavigate}
                                                        handleCancel={handleCancel}
                                                        onChangeSelectedTab={onChangeSelectedTab}
                                                        selectedTab={selectedTab}
                                                    />
                                                </Tab.Panel>
                                                <Tab.Panel key={3} tabIndex={3}>
                                                    <StepListSpecies
                                                        selectedTab={selectedTab}
                                                        onChangeSelectedTab={onChangeSelectedTab}
                                                    />
                                                </Tab.Panel>
                                                <Tab.Panel key={4} tabIndex={4}>
                                                    <StepListBreeds
                                                        selectedTab={selectedTab}
                                                        onChangeSelectedTab={onChangeSelectedTab}
                                                    />
                                                </Tab.Panel>
                                                <Tab.Panel key={5} tabIndex={5}>
                                                    <StepLoading
                                                        onChangeSelectedTab={onChangeSelectedTab}
                                                        selectedTab={selectedTab}
                                                        handleCloseModal={closeModal}
                                                    />
                                                </Tab.Panel>
                                            </Tab.Panels>
                                        </Formik>



                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Tab.Group>

            </Transition>
        </>
    )
}

export default ModalListPets