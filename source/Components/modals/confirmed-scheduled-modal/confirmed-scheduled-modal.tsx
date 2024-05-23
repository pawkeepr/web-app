import { Form, Formik } from 'formik'
import { BtnConfirm, BtnNeutral } from '~/Components/atoms/btn'
import Modal from '~/Components/organism/modal'

import * as Yup from 'yup'
import CardTutor from '~/Components/molecules/card-tutor'
import { usePlusModal } from '~/contexts/setters-status-appointments-modals-context'
import useListAppointments from '~/store/hooks/list-appointments'

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
    const { handleSubmit, isLoading } = useListAppointments({
        mode: 'confirmed',
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
                        className="px-4 py-2 text-sm font-medium text-white rounded-md bg-secondary-500 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                        Confirmar Agendamento
                    </button>
                </div>
            )}

            <Modal
                open={isOpen as boolean}
                onClose={() => closeModal()}
                mobilePage={false}
            >
                <Formik
                    initialValues={item}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid, isSubmitting, handleSubmit, values }) => (
                        <Form
                            className="flex flex-col w-full h-full "
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col items-center justify-center min-h-full text-center web:p-4 mobile:p-0">
                                <h2 className="text-xl font-semibold leading-6 text-gray-600 dark:!text-gray-200 text-center">
                                    {'Confirmar Agendamento'}
                                </h2>

                                <p className="text-xs font-bold text-primary-500 dark:!text-secondary-500 text-center mb-2">
                                    {'Esta ação não poderá ser desfeita.'}
                                </p>

                                <CardTutor
                                    pet={values.tutor_pet_vet?.pet}
                                    tutor={values?.tutor_pet_vet?.tutor}
                                    date_consultation={
                                        values.dates_consults.date_consultation
                                    }
                                    time_consultation={
                                        values.dates_consults.time_consultation
                                    }
                                />

                                <div className="flex items-center justify-center w-full gap-2 mt-2">
                                    <BtnNeutral
                                        outline
                                        type="button"
                                        onClick={closeModal}
                                        label="Cancelar"
                                        condition={!isSubmitting && !isLoading}
                                    />

                                    <BtnConfirm
                                        type="submit"
                                        label="Confirmar"
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
