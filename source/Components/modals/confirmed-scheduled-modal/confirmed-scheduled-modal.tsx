import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import Modal from '~/Components/organism/modal'

import * as Yup from 'yup'
import CardTutor from '~/Components/molecules/card-tutor'
import { usePlusModal } from '~/hooks/use-plus-modal'
import { useAppointmentConfirmed } from '~/store/hooks/appointments'
import { IAppointmentVet } from '~/store/slices/appointment-vet/types'

const validationSchema = Yup.object().shape({
    id: Yup.string().required('Campo obrigatório'),
    appointment_status: Yup.object().shape({
        reason_canceled: Yup.string().required('Campo obrigatório'),
    }),
})

type onChangeOpen = (arg: boolean) => void

type ChildrenProps = {
    showModal: onChangeOpen
}

type ConfirmedScheduledModalProps = {
    children?: (params: ChildrenProps) => React.ReactNode
    closeModal: () => void
    showModal: () => void
    isOpen?: boolean
}

const ConfirmedScheduledModal = ({
    children,
    closeModal,
    showModal,
    isOpen,
}: ConfirmedScheduledModalProps) => {
    const { item, close, keys } = usePlusModal()
    const { handleSubmit, isLoading } = useAppointmentConfirmed({
        handleClose: () => close(keys.ConfirmedScheduled),
    })

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
                        Confirmar Agendamento
                    </button>
                </div>
            )}

            <Modal
                onOpen={() => showModal}
                onClose={() => closeModal()}
                modal
                nested
                open={isOpen}
                lockScroll
                className=" 
                    h-fit
                    min-w-fit
                    flex
                    flex-col     
                "
            >
                <Formik
                    initialValues={item as any}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid, isSubmitting, handleSubmit, values }) => (
                        <Form
                            className="w-full h-full flex flex-col "
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col min-h-full items-center justify-center p-4 text-center">
                                <h2 className="text-xl font-semibold leading-6 text-gray-600 dark:!text-gray-200 text-center">
                                    {'Confirmar Agendamento'}
                                </h2>

                                <p className="text-xs font-bold text-primary-500 dark:!text-secondary-500 text-center mb-2">
                                    {'Esta ação não poderá ser desfeita.'}
                                </p>

                                <CardTutor
                                    pet={(values as IAppointmentVet).pet_data}
                                />

                                <div className="mt-4 flex justify-center items-center w-3/6">
                                    <BtnCancel
                                        type="button"
                                        onClick={closeModal}
                                        label="Cancelar"
                                        condition={!isSubmitting && !isLoading}
                                        className="text-gray-600"
                                    />

                                    <BtnPrimary
                                        type="submit"
                                        label="Confirmar Agendamento"
                                        isLoading={isSubmitting || isLoading}
                                        disabled={!isValid}
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}

export default ConfirmedScheduledModal
