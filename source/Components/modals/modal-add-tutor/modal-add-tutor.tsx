import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";

// Import Images
import dummyImg from "../../assets/images/users/user-dummy-img.jpg";

import {
    Col,
    Form,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";

//Import actions
import {
    getContacts as onGetContacts
} from "~/store/actions";
//redux
import { useDispatch } from "react-redux";

import 'react-toastify/dist/ReactToastify.css';

// Formik
import { useFormik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { useAppSelector } from "~/store/hooks";

const ModalAddTutor = () => {

    const dispatch = useDispatch();

    const { crmcontacts } = useAppSelector((state) => ({
        crmcontacts: state.Crm.crmcontacts,
        isContactCreated: state.Crm.isContactCreated,
        isContactSuccess: state.Crm.isContactSuccess,
        error: state.Crm.error,
    }));

    useEffect(() => {
        if (crmcontacts && !crmcontacts.length) {
            dispatch(onGetContacts());
        }
    }, [dispatch, crmcontacts]);

    useEffect(() => {
        setContact(crmcontacts);
    }, [crmcontacts]);

    useEffect(() => {
        if (!isEmpty(crmcontacts)) {
            setContact(crmcontacts);
            setIsEdit(false);
        }
    }, [crmcontacts]);


    const [isEdit, setIsEdit] = useState(false);
    const [contact, setContact] = useState([]);

    const [modal, setModal] = useState(false);

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            setContact(null);
        } else {
            setModal(true);
        }
    }, [modal]);

    // validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            // img: (contact && contact.img) || '',
            name: (contact && contact.name) || '',
            company: (contact && contact.company) || '',
            designation: (contact && contact.designation) || '',
            email: (contact && contact.email) || '',
            phone: (contact && contact.phone) || '',
            lead_score: (contact && contact.lead_score) || '',
            tags: (contact && contact.tags) || [],
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            company: Yup.string().required("Please Enter Company"),
            designation: Yup.string().required("Please Enter Designation"),
            email: Yup.string().required("Please Enter Email"),
            phone: Yup.string().required("Please Enter Phone"),
            lead_score: Yup.string().required("Please Enter lead_score"),
        }),
        onSubmit: (values) => {
        },
    });

    return (
        <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
            <ModalHeader className="bg-soft-info p-3" toggle={toggle}>
                {!!isEdit ? "Edit Contact" : "Add Contact"}
            </ModalHeader>

            <Form onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
            }}>
                <ModalBody>
                    <Input type="hidden" id="id-field" />
                    <Row className="g-3">
                        <Col lg={12}>
                            <div className="text-center">
                                <div className="position-relative d-inline-block">
                                    <div className="position-absolute  bottom-0 end-0">
                                        <Label htmlFor="customer-image-input" className="mb-0">
                                            <div className="avatar-xs cursor-pointer">
                                                <div className="avatar-title bg-light border rounded-circle text-muted">
                                                    <i className="ri-image-fill"></i>
                                                </div>
                                            </div>
                                        </Label>
                                        <Input className="form-control d-none" id="customer-image-input" type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.img || ""}
                                            invalid={
                                                validation.touched.img && validation.errors.img ? true : false
                                            }
                                        />
                                    </div>
                                    <div className="avatar-lg p-1">
                                        <div className="avatar-title bg-light rounded-circle">
                                            <Image src={dummyImg} alt="dummyImg" id="customer-img" className="avatar-md rounded-circle object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label
                                    htmlFor="name-field"
                                    className="form-label"
                                >
                                    Name
                                </Label>
                                <Input
                                    name="name"
                                    id="customername-field"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    type="text"
                                    validate={{
                                        required: { value: true },
                                    }}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.name || ""}
                                    invalid={
                                        validation.touched.name && validation.errors.name ? true : false
                                    }
                                />


                            </div>
                        </Col>
                        <Col lg={12}>
                            <div>
                                <Label
                                    htmlFor="company_name-field"
                                    className="form-label"
                                >
                                    Company Name
                                </Label>
                                <Input
                                    name="company"
                                    id="company_name-field"
                                    className="form-control"
                                    placeholder="Enter Company Name"
                                    type="text"
                                    validate={{
                                        required: { value: true },
                                    }}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.company || ""}
                                    invalid={
                                        validation.touched.company && validation.errors.company ? true : false
                                    }
                                />


                            </div>
                        </Col>

                        <Col lg={12}>
                            <div>
                                <Label
                                    htmlFor="designation-field"
                                    className="form-label"
                                >
                                    Designation
                                </Label>

                                <Input
                                    name="designation"
                                    id="designation-field"
                                    className="form-control"
                                    placeholder="Enter Designation"
                                    type="text"
                                    validate={{
                                        required: { value: true },
                                    }}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.designation || ""}
                                    invalid={
                                        validation.touched.designation && validation.errors.designation ? true : false
                                    }
                                />


                            </div>
                        </Col>

                        <Col lg={12}>
                            <div>
                                <Label
                                    htmlFor="email_id-field"
                                    className="form-label"
                                >
                                    Email ID
                                </Label>

                                <Input
                                    name="email"
                                    id="email_id-field"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    type="text"
                                    validate={{
                                        required: { value: true },
                                    }}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email || ""}
                                    invalid={
                                        validation.touched.email && validation.errors.email ? true : false
                                    }
                                />


                            </div>
                        </Col>
                        <Col lg={6}>
                            <div>
                                <Label
                                    htmlFor="phone-field"
                                    className="form-label"
                                >
                                    Phone
                                </Label>

                                <Input
                                    name="phone"
                                    id="phone-field"
                                    className="form-control"
                                    placeholder="Enter Phone No."
                                    type="text"
                                    validate={{
                                        required: { value: true },
                                    }}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.phone || ""}
                                    invalid={
                                        validation.touched.phone && validation.errors.phone ? true : false
                                    }
                                />

                            </div>
                        </Col>
                        <Col lg={6}>
                            <div>
                                <Label
                                    htmlFor="lead_score-field"
                                    className="form-label"
                                >
                                    Lead Score
                                </Label>

                                <Input
                                    name="lead_score"
                                    id="lead_score-field"
                                    className="form-control"
                                    placeholder="Enter Lead Score"
                                    type="text"
                                    validate={{
                                        required: { value: true },
                                    }}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.lead_score || ""}
                                    invalid={
                                        validation.touched.lead_score && validation.errors.lead_score ? true : false
                                    }
                                />

                            </div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <div className="hstack gap-2 justify-content-end">
                        <button type="button" className="btn btn-light" onClick={() => { setModal(false); }} > Close </button>
                        <button type="submit" className="btn btn-success" id="add-btn" > {!!isEdit ? "Update" : "Add Contact"} </button>
                    </div>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default ModalAddTutor