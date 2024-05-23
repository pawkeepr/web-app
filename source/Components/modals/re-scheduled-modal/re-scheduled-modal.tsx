import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import Modal from '~/Components/organism/modal'

import * as Yup from 'yup'
import CardTutor, { ItemCard } from '~/Components/molecules/card-tutor'
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
                            className="w-full h-full flex flex-col web:min-w-[500px]"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col items-center justify-center min-h-full text-center web:p-4 mobile:px-2">
                                <h2 className="text-xl font-semibold leading-6 text-gray-600 dark:!text-gray-200 text-center">
                                    {'Reagendar Consulta'}
                                </h2>

                                <CardTutor
                                    pet={values.tutor_pet_vet?.pet}
                                    tutor={values.tutor_pet_vet?.tutor}
                                    date_consultation={
                                        values.dates_consults.date_consultation
                                    }
                                    time_consultation={
                                        values.dates_consults.time_consultation
                                    }
                                />
                                <section className="flex flex-col justify-start w-full gap-1 px-2 mt-1">
                                    <ItemCard
                                        label="Tipo da Consulta"
                                        value={
                                            item?.dates_consults
                                                ?.reason_consultation
                                        }
                                    />
                                    <ItemCard
                                        label="Motivo"
                                        value={
                                            item?.dates_consults?.type_consultation
                                        }
                                    />
                                </section>

                                <section className="flex w-full my-2 web:gap-3 phone:gap-0 phone:flex-col">
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

                                <div className="flex items-center justify-center w-full gap-2 mt-1">
                                    <BtnCancel
                                        type="button"
                                        onClick={closeModal}
                                        label="Cancelar"
                                        outline
                                        condition={!isSubmitting && !isLoading}
                                        className="border-none"
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
