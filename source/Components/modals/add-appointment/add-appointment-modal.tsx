import 'react-toastify/dist/ReactToastify.css';

// Formik
import { Formik, FormikHelpers } from "formik";
import FieldControl from "~/Components/molecules/field-control/field-control";

import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import { useAppDispatch } from '~/store/hooks';
import { addNew } from '~/store/slices/newSchedule/actions';

// import ComboBoxFields from "./components/organisms/combo-box-fields/combo-box-fields";

type InitialValues = Partial<Nullable<Data>>

import FieldTextArea from '~/Components/molecules/field-text-area/field-text-area';
import Modal from "~/Components/organism/modal";
import useModal from '~/hooks/use-modal';


const AddNewAppointment = ({ children, item }: AddModalProps) => {
    const { closeModal, open, showModal } = useModal()

    const dispatch = useAppDispatch();

    const onSubmit = (
        values: InitialValues,
        { resetForm }: FormikHelpers<InitialValues>
    ) => {
        dispatch(addNew(values));
        resetForm()
    }

    const initialValues: InitialValues = {
        date: '',
        time: '',
        type: '',
        reason: '',
        observations: '',
    }

    return (
        <>
            {children?.(showModal) || (
                <BtnPrimary
                    onClick={showModal}
                    label="Agendar Consulta"
                    id="button-new-consult"
                    style={{ height: 42 }}
                >

                </BtnPrimary>
            )}
            <Modal
                onOpen={() => showModal}
                onClose={() => closeModal()}
                modal
                nested
                open={open}
                lockScroll
                className="w-[750px] py-4"
            >
                <div className="flex flex-col w-full">
                    <h6 className="font-semibold text-center uppercase">Agendamento</h6>
                    <p className='mb-4 font-semibold text-center text-secondary-500'>Obrigatório (*)</p>
                </div>

                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationPet}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {
                        ({ isValid, handleSubmit }) => (
                            <>


                                <div className='flex justify-around gap-3'>
                                    <FieldControl
                                        label="Data da consulta"
                                        name="date"
                                        required
                                        className=" "
                                        placeholder="exemplo='05/12/2023'"
                                        type="date"
                                    />

                                    <FieldControl
                                        label="Hora da consulta"
                                        required
                                        name="time"
                                        className=" "
                                        placeholder="exemplo='14:00'"
                                        type="text"
                                    />
                                </div>

                                <FieldControl
                                    label="Tipo da consulta"
                                    name="type"
                                    required
                                    className=" "
                                    placeholder="exemplo='exame'"
                                    type="text"
                                />
                                <FieldControl
                                    label="Razão da consulta"
                                    name="reason"
                                    required
                                    className=" "
                                    placeholder="exemplo='consulta de rotina'"
                                    type="text"
                                />
                                <FieldTextArea
                                    label="Orientações e Anotações"
                                    className="form-control"
                                    component="textarea"
                                    name="observations"
                                    type="text"
                                />
                                <div className='flex justify-center mt-3'>  
                                    <BtnCancel
                                        label="Voltar"
                                        onClick={() => closeModal()}
                                    />
                                    <BtnPrimary
                                        label="Agendar"
                                        onClick={() => handleSubmit()}
                                    />
                                </div>
                            </>
                        )
                    }

                </Formik>
            </Modal>
        </>
    )
}

export default AddNewAppointment