'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Card, Col, Container, FormFeedback, Input, Row } from 'reactstrap';

import AuthSlider from '~/Components/organism/auth-carousel';

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FooterAuth from '~/Components/organism/footer-auth';

const CoverSignUp = () => {

    const [passwordShow, setPasswordShow] = useState(false);

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(RegExp('(.*[a-z].*)'), 'At least lowercase letter')
                .matches(RegExp('(.*[A-Z].*)'), 'At least uppercase letter')
                .matches(RegExp('(.*[0-9].*)'), 'At least one number')
                .required("This field is required"),
        }),
        onSubmit: (values) => {
            // console.log(values);
        }
    });

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden m-0">
                                    <Row className="justify-content-center g-0">
                                        <AuthSlider bg='auth-bg-image-2' />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <div>
                                                    <h5 className="text-primary">Register Account</h5>
                                                    <p className="text-muted">Get your Free Velzon account now.</p>
                                                </div>

                                                <div className="mt-4">
                                                    <form className="needs-validation" noValidate action="index">

                                                        <div className="mb-3">
                                                            <label htmlFor="useremail" className="form-label">Email <span className="text-danger">*</span></label>
                                                            <input type="email" className="form-control" id="useremail" placeholder="Enter email address" required />
                                                            <div className="invalid-feedback">
                                                                Please enter email
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="username" className="form-label">Username <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" id="username" placeholder="Enter username" required />
                                                            <div className="invalid-feedback">
                                                                Please enter username
                                                            </div>
                                                        </div>


                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="password-input">Password</label>
                                                            <div className="position-relative auth-pass-inputgroup">
                                                                <Input
                                                                    type={passwordShow ? "text" : "password"}
                                                                    className="form-control pe-5 password-input"
                                                                    placeholder="Enter password"
                                                                    id="password-input"
                                                                    name="password"
                                                                    value={validation.values.password}
                                                                    onBlur={validation.handleBlur}
                                                                    onChange={validation.handleChange}
                                                                    invalid={validation.errors.password && validation.touched.password ? true : false}
                                                                />
                                                                {validation.errors.password && validation.touched.password ? (
                                                                    <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                                ) : null}
                                                                <Button color="link" onClick={() => setPasswordShow(!passwordShow)} className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button"
                                                                    id="password-addon"><i className="ri-eye-fill align-middle"></i></Button>
                                                            </div>
                                                        </div>

                                                        <div className="mb-4">
                                                            <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Velzon <Link href="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</Link></p>
                                                        </div>

                                                        <div id="password-contain" className="p-3 bg-light mb-2 rounded">
                                                            <h5 className="fs-13">Password must contain:</h5>
                                                            <p id="pass-length" className="invalid fs-12 mb-2">Minimum <b>8 characters</b></p>
                                                            <p id="pass-lower" className="invalid fs-12 mb-2">At <b>lowercase</b> letter (a-z)</p>
                                                            <p id="pass-upper" className="invalid fs-12 mb-2">At least <b>uppercase</b> letter (A-Z)</p>
                                                            <p id="pass-number" className="invalid fs-12 mb-0">A least <b>number</b> (0-9)</p>
                                                        </div>

                                                        <div className="mt-4">
                                                            <button className="btn btn-success w-100" type="submit">Sign Up</button>
                                                        </div>

                                                        <div className="mt-4 text-center">
                                                            <div className="signin-other-title">
                                                                <h5 className="fs-13 mb-4 title text-muted">Create account with</h5>
                                                            </div>

                                                            <div>
                                                                <button type="button" className="btn btn-primary btn-icon waves-effect waves-light me-1"><i className="ri-facebook-fill fs-16"></i></button>
                                                                <button type="button" className="btn btn-danger btn-icon waves-effect waves-light me-1"><i className="ri-google-fill fs-16"></i></button>
                                                                <button type="button" className="btn btn-dark btn-icon waves-effect waves-light me-1"><i className="ri-github-fill fs-16"></i></button>
                                                                <button type="button" className="btn btn-info btn-icon waves-effect waves-light"><i className="ri-twitter-fill fs-16"></i></button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Você já tem uma conta ? <Link href="/auth-signin-cover" className="fw-semibold text-primary text-decoration-underline"> Signin</Link> </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                        </Row>
                    </Container>
                </div>

                <FooterAuth />
            </div>
        </React.Fragment>
    );
};

export default CoverSignUp;