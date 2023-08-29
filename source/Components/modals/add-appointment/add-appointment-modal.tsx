import 'react-toastify/dist/ReactToastify.css';

// Formik
import { Formik, FormikHelpers } from "formik";
import BtnAvatar from "~/Components/atoms/btn/btn-avatar";
import FieldControl from "~/Components/molecules/field-control/field-control";

import { MdPets } from 'react-icons/md';
import { BtnPrimary } from "~/Components/atoms/btn";
import BoxButtons from "~/Components/molecules/box-buttons";
import FieldDocument from "~/Components/molecules/field-document";
import { useAppDispatch } from '~/store/hooks';
import { addNew } from '~/store/pets/actions';

// import ComboBoxFields from "./components/organisms/combo-box-fields/combo-box-fields";

type InitialValues = Partial<Nullable<Data>>

import RadioGroupCustom from "~/Components/molecules/radio-group/radio-group";
import Modal from "~/Components/organism/modal";
import useModal from '~/hooks/use-modal';
import validationPet from '~/validations/pet';


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
        name: '',
        species: '' as any,
        breed: '' as any,
        castrated: false,
        avatar: null,
        dateOfBirth: null,
        bloodType: '' as any,
    }

    return (
        <>
            {children?.(showModal) || (
                <BtnPrimary
                    onClick={showModal}
                    label="Agendar Consulta"
                    id="button-new-consult"
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
                <div className="w-full">
                    <h6 className="mb-4 font-semibold text-center uppercase">Agendamento</h6>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationPet}
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
                                        placeholder="digite a data da consulta, exemplo='2023-07-05'"
                                        type="date"
                                    />

                                    <FieldDocument
                                        onlyCPF
                                        label="Hora da consulta"
                                        required
                                        name="Time"
                                        className=" "
                                        placeholder="digite a hora da consulta, exemplo='14:00'"
                                        type="text"
                                    />
                                </div>
                               
                                <FieldControl
                                    label="Tipo da consulta"
                                    name="type"
                                    required
                                    className=" "
                                    placeholder="digite o tipo da consulta, exemplo='exame'"
                                    type="text"
                                />
                                <FieldControl
                                    label="Razão da consulta"
                                    name="type"
                                    required
                                    className=" "
                                    placeholder="digite a razão da consulta, exemplo='consulta de rotina'"
                                    type="text"
                                />
                                <p className='text-gray-500'>Observações adicionais</p>
                                <textarea
                                    name="type"
                                    className=" mb-3 "
                                    placeholder="digite observações adicionais, exemplo='Cliente prioritário'"
                                    type="text"
                                />

                                <BoxButtons onClickCancel={closeModal} onClickSuccess={handleSubmit} isValid={isValid} />
                            </>
                        )
                    }

                </Formik>
            </Modal>
        </>
    )
}

export default AddNewAppointment