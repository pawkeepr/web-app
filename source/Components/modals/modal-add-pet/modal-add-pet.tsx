import { useCallback, useState } from "react";

// Import Images

import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalHeader from 'react-bootstrap/ModalHeader';
//Import actions
//redux

import 'react-toastify/dist/ReactToastify.css';

// Formik
import { Formik, FormikHelpers } from "formik";
import BtnAvatar from "~/Components/atoms/btn/btn-avatar";
import FieldControl from "~/Components/molecules/field-control/field-control";

import { BtnSuccess } from "~/Components/atoms/btn";
import BoxButtons from "~/Components/molecules/box-buttons";
import FieldDocument from "~/Components/molecules/field-document";
import { useAppDispatch } from '~/store/hooks';
import { addNewPet } from '~/store/pets/actions';
import { GenderPet, Pet } from '~/store/pets/types';
import ComboBoxFields from "./components/organisms/combo-box-fields/combo-box-fields";

type InitialValues = Partial<Nullable<Pet>>

import RadioGroupCustom from "~/Components/molecules/radio-group/radio-group";
import validationPet from '~/validations/pet';

const ModalAddNewPet = () => {

    const [modal, setModal] = useState(false);
    const dispatch = useAppDispatch();

    const openModal = useCallback(() => {
        setModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setModal(false);
    }, [])

    const toggle = useCallback(() => {
        setModal(state => !state);
    }, []);

    const onSubmit = (
        values: InitialValues,
        { resetForm }: FormikHelpers<InitialValues>
    ) => {
        dispatch(addNewPet(values));
        resetForm()
        closeModal();
    }

    const initialValues: InitialValues = {
        name: '',
        species: '' as any,
        breed: '' as any,
        castrated: false,
        avatar: null,
        dateOfBirth: null,
        ownerEmergencyContact: {
            document: '',
        },
        gender: GenderPet.unknown,
        bloodType: '' as any,
    }

    return (
        <>
            <div>
                <BtnSuccess onClick={openModal} label="Adicionar Pet" />
            </div>
            <Modal id="showModal" show={modal} toggle={toggle} centered size="lg">
                <ModalHeader className="bg-soft-info p-3">
                    <h1 className="text-base font-bold text-white">Adicionar Pet</h1>
                </ModalHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationPet}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {
                        ({ isValid, handleSubmit }) => (
                            <>
                                <ModalBody>
                                    <BtnAvatar />
                                    <div className="flex flex-wrap -mx-3 mt-2">
                                        <div className="w-full lg:w-1/2 px-3 mb-6">
                                            <FieldControl
                                                label="Nome"
                                                name="name"
                                                required
                                                className="form-control"
                                                placeholder="Qual o nome do seu pet?"
                                                type="text"
                                            />
                                        </div>
                                        <div className="w-full lg:w-1/2 px-3 mb-6">
                                            <FieldDocument
                                                onlyCPF
                                                label="CPF"
                                                required
                                                name="ownerEmergencyContact.document"
                                                className="form-control"
                                                placeholder="CPF do tutor"
                                                type="text"
                                            />
                                        </div>
                                        <ComboBoxFields />
                                        <div className="w-full lg:w-1/3 px-3 mb-6">
                                            <FieldControl
                                                label="Data de Nascimento"
                                                name="dateOfBirth"
                                                className="form-control"
                                                placeholder="Escreva a data de nascimento"
                                                type="date"
                                            />
                                        </div>
                                        <div className="w-full lg:w-1/3 px-3 mb-6">
                                            <RadioGroupCustom />
                                        </div>
                                        {/* Add other fields here */}
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <BoxButtons onClickCancel={closeModal} onClickSuccess={handleSubmit} isValid={isValid} />
                                </ModalFooter>
                            </>
                        )
                    }

                </Formik>
            </Modal>
        </>
    )
}

export default ModalAddNewPet