import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import Modal from '~/Components/organism/modal'

import * as Yup from 'yup'
import CardTutor from '~/Components/molecules/card-tutor'
import FieldControl from '~/Components/molecules/field-control'
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

type ReScheduledModalProps = {
    children?: (params: ChildrenProps) => React.ReactNode
    closeModal: () => void
    showModal: () => void
    isOpen?: boolean
}

const ReScheduledModal = ({
    children,
    closeModal,
    showModal,
    isOpen,
}: ReScheduledModalProps) => {
    const { item, close, keys } = usePlusModal()

    const { handleSubmit, isLoading } = useListAppointments({
        mode: 'rescheduled',
        handleClose: () => close(keys.Rescheduled),
    })

    return (
        <>
            {children?.({ showModal })}

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
                    !w-fit
                "
            >
                <Formik
                    initialValues={item}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid, isSubmitting, handleSubmit, values }) => (
                        <Form
                            className="w-full h-full flex flex-col min-w-[500px]"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col min-h-full items-center justify-center p-4 text-center">
                                <h2 className="text-xl font-semibold leading-6 text-gray-600 dark:!text-gray-200 text-center">
                                    {'Reagendar Consulta'}
                                </h2>

                                <CardTutor
                                    pet={values.tutor_pet_vet?.pet}
                                    tutor={values.tutor_pet_vet?.tutor}
                                />
                                <section className="flex flex-col  mt-2 justify-start px-4 w-full">
                                    <div className="gap-2 flex-wrap flex flex-col w-full justify-between ">
                                        <p className="text-gray-500 flex justify-between">
                                            <strong className="mr-2">
                                                Tipo da Consulta:
                                            </strong>
                                            {item?.dates_consults?.type_consultation}
                                        </p>
                                        <p className="text-gray-500 flex justify-between">
                                            <strong className="mr-2">
                                                Razão da Consulta:
                                            </strong>

                                        </p>
                                        <p className="text-gray-500 text-center flex justify-between">
                                            {
                                                item?.dates_consults?.reason_consultation
                                            }
                                        </p>
                                    </div>
                                </section>

                                <section className="my-2 flex gap-3 w-full">
                                    <FieldControl
                                        ctx={values}
                                        label="Data da consulta"
                                        name="dates_consults.date_consultation"
                                        required
                                        placeholder="exemplo='05/12/2023'"
                                        type="date"
                                    />

                                    <FieldControl
                                        ctx={values}
                                        label="Hora da consulta"
                                        required
                                        name="dates_consults.time_consultation"
                                        placeholder="exemplo='14:00'"
                                        type="time"
                                    />
                                </section>

                                <div className="mt-4 flex justify-center items-center">
                                    <BtnCancel
                                        type="button"
                                        onClick={closeModal}
                                        label="Cancelar"
                                        condition={!isSubmitting && !isLoading}
                                        className="text-gray-600"
                                    />

                                    <BtnPrimary
                                        type="submit"
                                        label="Reagendar"
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

export default ReScheduledModal
