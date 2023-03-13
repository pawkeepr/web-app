'use client'

import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
//formik
import { Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import HeaderTitle from '~/Components/atoms/header-title';
import AuthSlider from '~/Components/organism/auth-carousel';
import FooterAuth from '~/Components/organism/footer-auth';


import validateAddress from '~/validations/address';
import validateDocument from '~/validations/document';
import validateEmail from '~/validations/email';
import validatePassword from '~/validations/password';
import validatePerson from '~/validations/person';

import StepAddress from './components/organism/steps/step-address';
import StepSignUp01 from './components/organism/steps/step-basic-auth';
import StepSignUp02 from './components/organism/steps/step-person';
import StepSignUpTermsOfUse from './components/organism/steps/step-terms-of-use';


export type InitialStateSignUp = {
    email: string;
    password: string;
    passwordConfirm: string;
    termsOfUse: boolean;
    person: {
        firstName: string,
        lastName: string,
        crmv: string,
        document: string,
        company: string | null,
        phoneNumber: string,
    },
    address: {
        country: string;
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
    };
};


const validationSchema = Yup.object({
    email: validateEmail,
    password: validatePassword,
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
        .required('Este campo é obrigatório'),
    termsOfUse: Yup.boolean().oneOf(
        [true],
        'Você deve aceitar os termos de uso'
    ),
    person: validatePerson,
    document: validateDocument,
    address: validateAddress,
});

const CoverSignUp = () => {
    const [tab, setTab] = useState('1')

    const onSubmit = async (values: InitialStateSignUp, helper: FormikHelpers<InitialStateSignUp>) => {
        console.log(values)
    }

    const initialValues: InitialStateSignUp = {
        email: '',
        password: '',
        passwordConfirm: '',
        termsOfUse: false,
        person: {
            crmv: '',
            document: '',
            firstName: '',
            lastName: '',
            company: null,
            phoneNumber: '',
        },
        address: {
            country: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: '',
        },
    };


    const Tabs = [
        {
            id: '1',
            component: (props: any) => <StepSignUp01 {...props} />
        },
        {
            id: '2',
            component: (props: any) => <StepSignUp02 {...props} />
        },
        {
            id: '3',
            component: (props: any) => <StepAddress {...props} />
        },
        {
            id: '4',
            component: (props: any) => <StepSignUpTermsOfUse {...props} />
        },
    ]

    const onChangeNextStep = () => {
        setTab(state => {
            const stateNumber = Number(state)

            if (stateNumber === Tabs.length) {
                return state
            }

            return (stateNumber + 1).toString()
        })
    }

    const onChangePrevStep = () => {
        setTab(state => {
            const stateNumber = Number(state)

            if (stateNumber === 1) {
                return state
            }

            return (stateNumber - 1).toString()
        })
    }


    return (
        <React.Fragment>
            <HeaderTitle title="Criar Conta" />

            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >

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
                                                <Form className="needs-validation" action="index">
                                                    <TabContainer activeKey={tab}  >
                                                        {
                                                            Tabs.map((tab, index) => (
                                                                <TabContent key={index}>
                                                                    <TabPane
                                                                        eventKey={tab.id}
                                                                        data-testid={`step-${tab.id.padStart(2, '0')}`}
                                                                    >
                                                                        {tab.component({
                                                                            prevStep: onChangePrevStep,
                                                                            nextStep: onChangeNextStep,
                                                                        })}
                                                                    </TabPane>
                                                                </TabContent>
                                                            ))
                                                        }
                                                        <div className="p-2 text-center">
                                                            <p className="list-group-item fs-12 mb-4">Você já tem uma conta ?
                                                                <br />
                                                                <Link href="/sign-in" className="fw-semibold text-primary text-decoration-underline">
                                                                    Entrar!
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </TabContainer>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>

                            </Row>
                        </Container>
                    </div>

                    <FooterAuth />
                </div>


            </Formik>
        </React.Fragment >
    );
};

export default CoverSignUp;