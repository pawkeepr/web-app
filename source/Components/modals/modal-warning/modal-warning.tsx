import { Dialog, Tab, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { BtnSecondary } from '~/Components/atoms/btn'

type ModalInvalid = {
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    description: string;
}


const ModalWarning = ({ isOpen, closeModal, title, description} : ModalInvalid) => {

    return (
        <>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" onClose={closeModal} className="relative z-10">
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
                                            className="text-xl m-3 font-bold leading-6 text-secondary-500 dark:!text-gray-200 text-center"
                                        >
                                            {title}
                                        </Dialog.Title>

                                        <Dialog.Description
                                            as="p"
                                            className="text-ms text-gray-700 dark:!text-gray-200 text-center"
                                        >
                                           {description}
                                        </Dialog.Description>
                                        <div className='flex m-3 justify-center items-center'>
                                            <BtnSecondary
                                                label='OK'
                                                className="mt-8"
                                                onClick={closeModal}
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

export default ModalWarning