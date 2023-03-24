import { useCallback, useEffect, useState } from "react";

// Import Images
import dummyImg from "~/assets/images/users/user-dummy-img.jpg";

import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Row from 'react-bootstrap/Row';
//Import actions
import {
    getTutors as onGetTutors
} from "~/store/actions";
//redux

import 'react-toastify/dist/ReactToastify.css';

// Formik
import { Formik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import BtnCancel from "~/Components/atoms/btn/btn-cancel";
import BtnSuccess from "~/Components/atoms/btn/btn-success";
import FieldControl from "~/Components/molecules/field-control/field-control";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { Tutor } from "~/store/tutor/types";

const ModalAddTutor = () => {

    const dispatch = useAppDispatch();
    const [tutor, setTutor] = useState<Tutor>(null);
    const [modal, setModal] = useState(false);

    const { tutors } = useAppSelector((state) => ({
        tutors: state.Tutor.tutors
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
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            email: Yup.string().required("Please Enter Email"),
            phone: Yup.string().required("Please Enter Phone"),
        }),
        onSubmit: (values) => {
        },
    };

    return (
        <>
            <div>
                <BtnSuccess onClick={openModal} label="Adicionar Tutor" />
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
                                    <div className="text-center">
                                        <div className="relative inline-block">
                                            <div className="absolute bottom-0 end-0">
                                                <label htmlFor="customer-image-input" className="block mb-0 cursor-pointer">
                                                    <div className="avatar-xs">
                                                        <div className="avatar-title bg-light border rounded-circle text-muted">
                                                            <i className="ri-image-fill"></i>
                                                        </div>
                                                    </div>
                                                </label>
                                                <input id="customer-image-input" className="hidden" type="file" accept="image/png, image/gif, image/jpeg" />
                                            </div>
                                            <div className="avatar-lg p-1">
                                                <div className="avatar-title bg-light rounded-circle">
                                                    <Image src={dummyImg} alt="dummyImg" id="customer-img" className="avatar-md rounded-circle object-cover" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div>

                                        <FieldControl
                                            label="Nome"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter Name"
                                            type="text"
                                        />


                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div>
                                        <FieldControl
                                            label="Email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                            type="text"
                                        />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <FieldControl
                                            label="Telefone/Celular"
                                            name="phone"
                                            className="form-control"
                                            placeholder="Enter number Phone"
                                            type="text"
                                        />

                                    </div>
                                </Col>

                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <div className="hstack gap-2 justify-content-end">
                                <BtnCancel onClick={() => { setModal(false); }} />
                                <BtnSuccess
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