
// Import Images

//Import actions
//redux

import 'react-toastify/dist/ReactToastify.css';

// Formik
import { Form, Formik } from "formik";
import MaskedInput from 'react-input-mask';
import * as Yup from "yup";
import { BtnAvatar, BtnPrimary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control";


import PlusCircleIcon from "@heroicons/react/24/solid/PlusCircleIcon";
import BoxButtons from '~/Components/molecules/box-buttons';
import Modal from "~/Components/organism/modal";
import useModal from "~/hooks/use-modal";
import ModalBodyFieldsAddress from "./components/molecules/modal-body-fields-address";

type AddModalProps = {
    children?: (showModal: () => void) => JSX.Element;
    item?: any
}

const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter Name"),
    email: Yup.string().required("Please Enter Email"),
    phone: Yup.string().required("Please Enter Phone"),
})

const AddTutorModal = ({ children, item }: AddModalProps) => {

    const { closeModal, open, showModal } = useModal()


    const onSubmit = (values: any) => {
    }


    return (
        <>
            {children?.(showModal) || (
                <BtnPrimary
                    onClick={showModal}
                    label="Adicionar Tutor"
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
                    <h6 className="mb-4 font-semibold text-center uppercase">Adicionar Tutor</h6>
                </div>

                <Formik
                    initialValues={{
                        avatar: item?.avatar || '',
                        name: item?.name || '',
                        email: item?.email || '',
                        phone: item?.phone || '',
                        cep: item?.cep || '',
                        state: item?.state || '',
                        city: item?.city || '',
                        neighborhood: item?.neighborhood || '',
                        street: item?.street || '',
                        complement: item?.complement || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {({ handleSubmit, isValid }) => (
                        <Form onSubmit={handleSubmit}>

                            <BtnAvatar src="" alt="Avatar do Tutor" />

                            <FieldControl
                                label="Nome"
                                name="name"
                                className="form-control"
                                placeholder="Nome do tutor"
                                type="text"
                                required
                            />

                            <FieldControl
                                label="Email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                type="text"
                            />

                            <FieldControl
                                label="Telefone/Celular"
                                name="phone"
                                className="form-control"
                                placeholder="Telefone/Celular"
                                type="text"
                                component={MaskedInput as any}
                                mask={"(99) 99999-9999"}
                                maskChar={null}
                                required
                            />


                            <ModalBodyFieldsAddress />

                            <BoxButtons onClickCancel={closeModal} onClickSuccess={handleSubmit} isValid={isValid} />
                        </Form>

                    )}
                </Formik>
            </Modal>
        </>
    )
}

export default AddTutorModal