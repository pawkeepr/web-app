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
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import HeaderTitle from '~/Components/atoms/header-title';
import AuthSlider from '~/Components/organism/auth-carousel';
import FooterAuth from '~/Components/organism/footer-auth';


import validateAddress from '~/validations/address';
import validatePerson from '~/validations/person';

import { editProfile } from '~/store/auth/profile/actions';
import { useAppDispatch } from '~/store/hooks';

import { Profile, RULES } from '~/store/auth/profile/types';
import StepSignUpAddress from './components/organism/steps/step-address';
import StepSignUpLoading from './components/organism/steps/step-loading';
import StepSignUpPerson from './components/organism/steps/step-person';
import StepSignUpTermsOfUse from './components/organism/steps/step-terms-of-use';

const validationSchema = Yup.object({
    person: validatePerson,
    address: validateAddress,
});

const FinishRegistration = () => {
    const [tab, setTab] = useState('1')

    const dispatch = useAppDispatch()

    const onSubmit = async (values: Profile, helper: FormikHelpers<Profile>) => {
        dispatch(editProfile(values))
    }

    const initialValues: Profile = {
        crmv: null,
        type: RULES.ADMIN,
        cpf_cnpj: null,
        firstName: null,
        lastName: null,
        company: null,
        phoneNumber: null,
        about: null,
        country: 'Brazil',
        street: null,
        number: null,
        complement: null,
        neighborhood: null,
        city: null,
        state: null,
        zipCode: null,
        avatar: null,
        email: null,
        phone: null,
        created_at: null,
        updated_at: null,
        id: null,
    };


    const Tabs = [
        {
            id: '1',
            component: (props: any) => <StepSignUpPerson {...props} />
        },
        {
            id: '2',
            component: (props: any) => <StepSignUpAddress {...props} />
        },
        {
            id: '3',
            component: (props: any) => <StepSignUpTermsOfUse {...props} />
        },
        {
            id: '4',
            component: (props: any) => <StepSignUpLoading {...props} />
        }
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

export default FinishRegistration;