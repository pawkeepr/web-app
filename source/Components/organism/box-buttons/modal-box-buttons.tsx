import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { BtnConfirm } from '~/Components/atoms/btn'
import withControl from '~/Components/helpers/with-control'
import useModal from '~/hooks/use-modal'
import type { VeterinaryConsultation } from '~/types/appointment'
import BoxButtons from './box-buttons'

type ModalBoxButtonsProps = {
    item: VeterinaryConsultation
}

const ModalBoxButtons = ({ item }: ModalBoxButtonsProps) => {
    const { closeModal, open, showModal } = useModal()

    return (
        <>
            <BtnConfirm
                label="Ver Mais"
                className="border-none mobile:!w-full mobile:col-span-full text-gray-200"
                onClick={showModal}
            />

            <Transition appear show={open} as={Fragment}>
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
                                <Dialog.Panel
                                    className="
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
                                        Title
                                    </Dialog.Title>

                                    <Dialog.Description
                                        as="p"
                                        className="text-sm font-bold text-secondary-500 dark:!text-secondary-500 text-center"
                                    >
                                        Subtitle
                                    </Dialog.Description>

                                    <div className="mt-3 p-1">
                                        <p className="text-sm text-gray-500 dark:!text-gray-300 leading-6">
                                            Message
                                        </p>
                                    </div>

                                    <BoxButtons item={item} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default withControl(ModalBoxButtons)
