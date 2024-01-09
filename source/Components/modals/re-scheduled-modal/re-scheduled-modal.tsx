import { Form, Formik } from 'formik';
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn';
import Modal from '~/Components/organism/modal';

import * as Yup from 'yup';
import CardTutor from '~/Components/molecules/card-tutor';
import FieldControl from '~/Components/molecules/field-control';
import { usePlusModal } from '~/hooks/use-plus-modal';
import useAppointmentRescheduled from '~/store/hooks/appointments/rescheduled';
import { IAppointmentVet } from '~/store/slices/appointment-vet/types';

const validationSchema = Yup.object().shape({
    id: Yup.string().required('Campo obrigatório'),
    appointment_status: Yup.object().shape({
        reason_canceled: Yup.string().required('Campo obrigatório'),
    }),
});

type onChangeOpen = (arg: boolean) => void;

type ChildrenProps = {
    showModal: onChangeOpen;
};

type ReScheduledModalProps = {
    children?: (params: ChildrenProps) => React.ReactNode;
    closeModal: () => void;
    showModal: () => void;
    isOpen?: boolean;
};

const ReScheduledModal = ({
    children,
    closeModal,
    showModal,
    isOpen,
}: ReScheduledModalProps) => {
    const { item, close, keys } = usePlusModal();

    const { handleSubmit, isLoading } = useAppointmentRescheduled({
        handleClose: () => close(keys.Rescheduled),
    });

    return (
        <>
            {children && children({ showModal })}

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
                                    {'Reagendar Consulta'}
                                </h2>

                                <CardTutor
                                    pet={(values as IAppointmentVet).pet_data}
                                />
                                {item && (
                                    <div className="flex justify-around gap-3">
                                        <p className="text-gray-500 flex justify-between">
                                            <strong className="mr-2">
                                                Tipo da Consulta:
                                            </strong>
                                            {
                                                item.dates_consults
                                                    .type_consultation
                                            }
                                        </p>
                                        <p className="text-gray-500 flex justify-between">
                                            <strong className="mr-2">
                                                Razão da Consulta:
                                            </strong>
                                            {
                                                item.dates_consults
                                                    .reason_consultation
                                            }
                                        </p>
                                    </div>
                                )}
                                <section className="my-2">
                                    <div className="flex justify-around gap-3">
                                        <FieldControl
                                            label="Data da consulta"
                                            name="dates_consults.date_consultation"
                                            required
                                            className=" "
                                            placeholder="exemplo='05/12/2023'"
                                            type="date"
                                        />

                                        <FieldControl
                                            label="Hora da consulta"
                                            required
                                            name="dates_consults.time_consultation"
                                            className=" "
                                            placeholder="exemplo='14:00'"
                                            type="time"
                                        />
                                    </div>
                                </section>

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
    );
};

export default ReScheduledModal;
