import { useCallback, useEffect, useState } from "react";

// Import Images

import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Row from 'react-bootstrap/Row';
//Import actions
import { getAll as onGetTutors } from "~/store/tutors/actions";
//redux

import 'react-toastify/dist/ReactToastify.css';

// Formik
import { Formik } from "formik";
import MaskedInput from 'react-input-mask';
import * as Yup from "yup";
import { BtnAvatar, BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control/field-control";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { Data } from "~/store/tutors/types";


import ModalBodyFieldsAddress from "./components/molecules/modal-body-fields-address";

const ModalAddTutor = () => {

    const dispatch = useAppDispatch();
    const [tutor, setTutor] = useState<Data | null>(null);
    const [modal, setModal] = useState(false);

    const { tutors } = useAppSelector((state) => ({
        tutors: state.Tutor.data
    }));

    const openModal = useCallback(() => {
        setModal(true);
    }, []);

    useEffect(() => {
        if (tutors && !tutors.length) {
            dispatch(onGetTutors());
        }
    }, [dispatch, tutors]);

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            setTutor([]);
        } else {
            setModal(true);
        }
    }, [modal]);

    // validation
    const validation = {
        initialValues: {
            avatar: tutor?.avatar || '',
            name: tutor?.name || '',
            email: tutor?.email || '',
            phone: tutor?.phone || '',
            cep: '',
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            complement: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            email: Yup.string().required("Please Enter Email"),
            phone: Yup.string().required("Please Enter Phone"),
        }),
        onSubmit: (values: any) => {
        },
    };

    return (
        <>
            <div>
                <BtnPrimary onClick={openModal} label="Adicionar Tutor" />
            </div>
            <Modal id="showModal" show={modal} toggle={toggle} centered >
                <ModalHeader className="bg-soft-info p-3">
                    {"Adicionar Tutor"}
                </ModalHeader>

                <Formik
                    initialValues={validation.initialValues}
                    validationSchema={validation.validationSchema}
                    onSubmit={validation.onSubmit}
                    enableReinitialize
                >

                    <>
                        <ModalBody>

                            <Row className="g-3">
                                <Col lg={12}>
                                    <BtnAvatar src="" alt="" />

                                    <div>
                                        <FieldControl
                                            label="Nome"
                                            name="name"
                                            className="form-control"
                                            placeholder="Nome do tutor"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </Col>

                                <Col lg={8}>
                                    <div>
                                        <FieldControl
                                            label="Email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email"
                                            type="text"
                                        />
                                    </div>
                                </Col>

                                <Col lg={4}>
                                    <div>
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

                                    </div>
                                </Col>

                                <ModalBodyFieldsAddress />

                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <div className="hstack gap-2 justify-content-end">
                                <BtnCancel onClick={() => { setModal(false); }} />
                                <BtnPrimary
                                    onClick={() => { }}
                                    type="submit"
                                    id="add-btn"
                                    label="Adicionar"
                                />
                            </div>
                        </ModalFooter>
                    </>

                </Formik>
            </Modal>
        </>
    )
}

export default ModalAddTutor