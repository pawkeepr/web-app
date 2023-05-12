import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { BtnCancel, BtnSuccess } from '~/Components/atoms/btn'
import routes from '~/routes'
import { useAppSelector } from '~/store/hooks'
import { Pet } from '~/store/pets/types'
import MiniBoxPet from './mini-box-pet'

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
}

enum EmojiPet {
    Gato = '🐱',
    Cachorro = '🐶',
    Coelho = '🐰',
    Peixe = '🐠',
    Pássaro = '🐦',
    Réptil = '🦎',
    Cavalo = '🐴',
}

const ModalListPets = ({ children, label, onCancel, onConfirm }: ModalConfirmProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [document, setDocument] = useState('')

    const pets = useAppSelector(state => state.Pets.pets.filter(pet => {
        return pet.ownerEmergencyContact.document === document.replace(/\D/g, '')
    }))


    const router = useRouter()

    const handleConfirm = () => {
        onConfirm?.()
        setIsOpen(false)
    }

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
        onChangeOpen(true)
    }

    const onChangeDocument = (doc: string) => {
        setDocument(doc)
    }

    const handleNavigate = (pet: Pet) => {
        router.push(`${routes.dashboard.new.appointments}?document=${document}&pet=${pet.id}`)
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
                                ">
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

                                    <div className="mt-3 p-1">
                                        {pets.map(pet => (
                                            <button
                                                key={pet.id}
                                                type="button"
                                                onClick={() => handleNavigate(pet)}
                                                className="
                                                    group w-full items-center justify-center 
                                                    rounded-md px-2 py-2 text-sm gap-2 
                                                    hover:bg-primary-500 dark:hover:!bg-primary-600 hover:text-white
                                                ">
                                                <div className="grid grid-cols-4 justify-center items-center">
                                                    <span className="align-middle col-span-1">{EmojiPet[pet.species]}</span>
                                                    <span className="align-middle col-span-2">{pet.name}</span>
                                                    <span className="align-middle col-span-1">{pet.species}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-4 flex justify-center items-center">
                                        <MiniBoxPet />
                                    </div>

                                    <div className="mt-4 flex flex-row justify-center items-center">
                                        <BtnSuccess
                                            type="button"
                                            label="Criar Pet"
                                            onClick={handleConfirm}
                                        />

                                        <BtnCancel
                                            type="button"
                                            onClick={handleCancel}
                                        />

                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ModalListPets