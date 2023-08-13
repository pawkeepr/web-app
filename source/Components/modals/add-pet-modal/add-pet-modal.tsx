import 'react-toastify/dist/ReactToastify.css';

// Formik
import { Formik, FormikHelpers } from "formik";
import BtnAvatar from "~/Components/atoms/btn/btn-avatar";
import FieldControl from "~/Components/molecules/field-control/field-control";

import { BtnPrimary } from "~/Components/atoms/btn";
import BoxButtons from "~/Components/molecules/box-buttons";
import FieldDocument from "~/Components/molecules/field-document";
import { useAppDispatch } from '~/store/hooks';
import { addNew } from '~/store/pets/actions';
import { Data, GenderPet } from '~/store/pets/types';
import ComboBoxFields from "./components/organisms/combo-box-fields/combo-box-fields";

type InitialValues = Partial<Nullable<Data>>

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import RadioGroupCustom from "~/Components/molecules/radio-group/radio-group";
import Modal from "~/Components/organism/modal";
import useModal from '~/hooks/use-modal';
import validationPet from '~/validations/pet';

const genders = [
    {
        name: 'Macho',
        value: GenderPet.male
    },
    {
        name: 'Fêmea',
        value: GenderPet.female
    },
    {
        name: 'Indefinido',
        value: GenderPet.unknown
    }
]

type AddModalProps = {
    children?: (showModal: () => void) => JSX.Element;
    item?: any
}


const AddNewPetModal = ({ children, item }: AddModalProps) => {
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
        gender: GenderPet.unknown,
        bloodType: '' as any,
    }

    return (
        <>
            {children?.(showModal) || (
                <BtnPrimary
                    onClick={showModal}
                    label="Adicionar Novo Pet"
                    id="button-new-consult"
                >
                    <PlusCircleIcon />
                </BtnPrimary>
            )}
            <Modal
                onOpen={() => showModal}
                onClose={() => closeModal()}
                modal
                nested
                open={open}
                lockScroll
                className="pb-0 w-[750px]"
            >
                <div className="w-full">
                    <h6 className="mb-4 font-semibold text-center uppercase">Adicionar Pet</h6>
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


                                <BtnAvatar alt="Foto do Pet" name="avatar" />

                                <FieldControl
                                    label="Nome"
                                    name="name"
                                    required
                                    className="form-control"
                                    placeholder="Qual o nome do seu pet?"
                                    type="text"
                                />
                                <FieldDocument
                                    onlyCPF
                                    label="CPF"
                                    required
                                    name="ownerEmergencyContact.document"
                                    className="form-control"
                                    placeholder="CPF do tutor"
                                    type="text"
                                />
                                <ComboBoxFields />

                                <FieldControl
                                    label="Data de Nascimento"
                                    name="dateOfBirth"
                                    className="form-control"
                                    placeholder="Escreva a data de nascimento"
                                    type="date"
                                />
                                <RadioGroupCustom items={genders} name="gender" />

                                <BoxButtons onClickCancel={closeModal} onClickSuccess={handleSubmit} isValid={isValid} />
                            </>
                        )
                    }

                </Formik>
            </Modal>
        </>
    )
}

export default AddNewPetModal