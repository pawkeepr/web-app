import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { BtnCancel, BtnSuccess } from '~/Components/atoms/btn'

type onChangeOpen = (arg: boolean) => void

type ChildrenProps = {
    onChangeOpen: onChangeOpen
}

type ModalConfirmProps = {
    title: string
    description?: string
    message?: string
    label?: string
    onConfirm?: () => void
    onCancel?: () => void
    children?: (params: ChildrenProps) => React.ReactNode
}

const ModalConfirm = ({
    message = 'Esta ação não poderá ser desfeita.',
    onCancel,
    onConfirm,
    label = 'Confirmar',
    title = 'Você tem certeza?',
    description,
    children,
}: ModalConfirmProps) => {
    const [isOpen, setIsOpen] = useState(false)

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

    return (
        <>

            {
                children && children({ onChangeOpen })
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
                                        {title}
                                    </Dialog.Title>

                                    <Dialog.Description
                                        as="p"
                                        className="text-xs text-red-500 dark:!text-red-300 text-center"
                                    >
                                        {description}
                                    </Dialog.Description>

                                    <div className="mt-3 p-1">
                                        <p className="text-sm text-gray-500 dark:!text-gray-300 leading-6">
                                            {message}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-center items-center">
                                        <BtnCancel
                                            type="button"
                                            onClick={handleCancel}
                                        />

                                        <BtnSuccess
                                            type="button"
                                            label="Continuar"
                                            onClick={handleConfirm}
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

export default ModalConfirm