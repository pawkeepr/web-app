import { Dialog, Transition } from '@headlessui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import * as Yup from 'yup'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import FieldTextArea from '~/Components/molecules/field-text-area/field-text-area'
import useModal from '~/hooks/use-modal'
import useAppointmentExternal from '~/store/hooks/appointment-external/use-appointment-external'
import type { VeterinaryConsultation } from '~/types/appointment'

type ChildrenProps = {
    showModal: () => void
}

type CanceledExternalModalProps = {
    title: string
    description?: string
    message?: string
    label?: string
    item: VeterinaryConsultation
    children?: (params: ChildrenProps) => React.ReactNode
}

const validationSchema = Yup.object().shape({
    id: Yup.string().required('Campo obrigatório'),
    appointment_status: Yup.object().shape({
        reason_canceled: Yup.string().required('Campo obrigatório'),
    }),
})

const CanceledExternalModal = ({
    label = 'Confirmar',
    title = 'Você tem certeza?',
    item,
    children,
}: CanceledExternalModalProps) => {
    const { closeModal, open, showModal } = useModal()
    const router = useRouter()

    const { handleSubmit, isLoading } = useAppointmentExternal({
        mode: 'canceled',
        handleCloseModal: closeModal,
        id: item.id as string,
    })

    const onSubmit = async (values: VeterinaryConsultation) => {
        try {
            await handleSubmit(values)
            router.push('/sign-in')
        } catch (_) {}
    }

    return (
        <>
            {children?.({ showModal })}
            {!children && (
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={showModal}
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

                    <Formik
                        initialValues={item}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ values, isValid, handleSubmit }) => (
                            <Form
                                className="fixed inset-0 overflow-y-auto"
                                onSubmit={handleSubmit}
                            >
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
                                                {title}
                                            </Dialog.Title>

                                            <div className="mt-3 p-1">
                                                <p className="text-sm text-gray-500 dark:!text-gray-300 leading-6">
                                                    Está ação não poderá ser
                                                    desfeita.
                                                </p>
                                            </div>

                                            <FieldTextArea
                                                ctx={values}
                                                required
                                                label="Motivo do cancelamento"
                                                name="appointment_status.reason_canceled"
                                            />

                                            <div className="mt-4 flex justify-center items-center">
                                                <BtnCancel
                                                    condition={!isLoading}
                                                    type="button"
                                                    onClick={closeModal}
                                                />

                                                <BtnPrimary
                                                    disabled={isLoading && !isValid}
                                                    isLoading={isLoading}
                                                    type="submit"
                                                    label="Continuar"
                                                />
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Dialog>
            </Transition>
        </>
    )
}

export default CanceledExternalModal
