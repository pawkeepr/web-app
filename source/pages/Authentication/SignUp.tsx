'use client'

import React, { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
//formik
import { Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import HeaderTitle from '~/Components/atoms/header-title';
import AuthSlider from '~/Components/organism/auth-carousel';
import FooterAuth from '~/Components/organism/footer-auth';


import validateEmail from '~/validations/email';
import validatePassword from '~/validations/password';

import { registerUser, resetRegisterFlag } from '~/store/actions';
import { AccountSignUp } from '~/store/auth/register/types';
import { useAppDispatch } from '~/store/hooks';

import StepSignUpBasicAuth from './components/organism/steps/step-basic-auth';
import StepSignUpTermsOfUse from './components/organism/steps/step-terms-of-use';


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
    //person: validatePerson,
    //address: validateAddress,
});

const CoverSignUp = () => {
    const [tab, setTab] = useState('1')

    const dispatch = useAppDispatch()

    const onSubmit = async (values: AccountSignUp, helper: FormikHelpers<AccountSignUp>) => {
        dispatch(registerUser(values))
    }

    useEffect(() => {
        dispatch(resetRegisterFlag())
    }, [dispatch])

    const initialValues: AccountSignUp = {
        email: '',
        password: '',
        passwordConfirm: '',
        termsOfUse: false
    };


    const Tabs = [
        {
            id: '1',
            component: (props: any) => <StepSignUpBasicAuth {...props} />
        },
        // {
        //     id: '2',
        //     component: (props: any) => <StepSignUpPerson {...props} />
        // },
        // {
        //     id: '3',
        //     component: (props: any) => <StepSignUpAddress {...props} />
        // },
        {
            id: '2',
            component: (props: any) => <StepSignUpTermsOfUse {...props} />
        },
        // {
        //     id: '3',
        //     component: (props: any) => <StepSignUpLoading {...props} />
        // }
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
                <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center">
                    <div className="bg-overlay"></div>
                    <div className="auth-page-content overflow-hidden pt-lg-5">
                        <Container>

                            <Card className="overflow-hidden m-0">
                                <Row className="justify-content-center g-0">
                                    <AuthSlider bg='auth-bg-image-2' />
                                    <Col lg={6} className="items-center flex-col justify-center">

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
                                        </TabContainer>
                                        <div className="text-center pt-24">
                                            <p className="list-group-item fs-12 mb-4">Você já tem uma conta ?
                                                <br />
                                                <Link href="/sign-in" className="fw-semibold text-primary text-decoration-underline">
                                                    Entrar!
                                                </Link>
                                            </p>
                                        </div>

                                    </Col>
                                </Row>
                            </Card>

                        </Container>
                    </div>

                    <FooterAuth />
                </div>
            </Formik>
        </React.Fragment >
    );
};

export default CoverSignUp;