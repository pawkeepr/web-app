'use client'

import React, { useState } from 'react';
import { TabContent, TabPane } from 'reactstrap';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

//formik
import { Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import HeaderTitle from '~/Components/atoms/header-title';
import AuthSlider from '~/Components/organism/auth-carousel';
import FooterAuth from '~/Components/organism/footer-auth';
import StepSignUp01 from './steps/step-01';
import StepSignUp02 from './steps/step-02';
import { InitialStateSignUp } from './types';


const validationSchema = Yup.object({
    password: Yup.string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .matches(RegExp('(.*[a-z].*)'), 'É necessário pelo menos uma letra minúscula')
        .matches(RegExp('(.*[A-Z].*)'), 'É necessário pelo menos uma letra maiúscula')
        .matches(RegExp('(.*[0-9].*)'), 'É necessário pelo menos um número')
        .required("Este campo é obrigatório"),
})

const CoverSignUp = () => {
    const [tab, setTab] = useState('1')


    const onSubmit = async (values, helper) => {

    }

    const initialValues: InitialStateSignUp = {
        password: "",
        email: "",
        username: "",
        document: "",
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
                                                <form className="needs-validation" noValidate action="index">
                                                    <TabContent activeTab={tab} className="text-muted">
                                                        {
                                                            Tabs.map((tab, index) => (
                                                                <TabPane key={index} tabId={tab.id}>
                                                                    {tab.component({
                                                                        prevStep: onChangePrevStep,
                                                                        nextStep: onChangeNextStep,
                                                                    })}
                                                                </TabPane>
                                                            ))
                                                        }
                                                        <div className="p-2 text-center">
                                                            <p className="mb-0">Você já tem uma conta ? <Link href="/sign-in" className="fw-semibold text-primary text-decoration-underline"> Entrar!</Link> </p>
                                                        </div>
                                                    </TabContent>
                                                </form>
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