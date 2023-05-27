import Container from 'react-bootstrap/Container';
import LogoSimple from '~/Components/atoms/logo-simple';
import LogoSimpleMobile from '~/Components/atoms/logo-simple-mobile';
import AuthLayout from '../_layouts/auth/auth_layout';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useAppSelector } from '~/store/hooks';
import StepActivation from './components/organism/steps/step-activation';


import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
//formik
import { Formik } from 'formik';

import validate, { ActivateAccount } from '~/validations/activate';

import { editProfile } from '~/store/auth/profile/actions';
import { useAppDispatch } from '~/store/hooks';

import { Profile, RULES } from '~/store/auth/profile/types';
import StepSignUpAddress from './components/organism/steps/step-address';
import StepSignUpLoading from './components/organism/steps/step-loading';
import StepSignUpPerson from './components/organism/steps/step-person';
import StepSignUpTermsOfUse from './components/organism/steps/step-terms-of-use';

const initialValues = (email: string): ActivateAccount => ({
    email,
    firstName: '',
    lastName: '',
    crmv: '',
    type: RULES.ADMIN as any,
    phone: '',
    cpf_cnpj: '',
    country: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
});


const Tabs = [
    {
        id: '1',
        component: (props: any) => <StepActivation  {...props} />
    },
    {
        id: '2',
        component: (props: any) => <StepSignUpPerson {...props} />
    },
    {
        id: '3',
        component: (props: any) => <StepSignUpAddress {...props} />
    },
    {
        id: '4',
        component: (props: any) => <StepSignUpTermsOfUse {...props} />
    },
    {
        id: '5',
        component: (props: any) => <StepSignUpLoading {...props} />
    }
]

const ActivationAccount = () => {

    const email = useAppSelector(state => state.Login.username)
    const router = useRouter()
    const [tab, setTab] = useState('1')

    const dispatch = useAppDispatch()

    const onSubmit = async (values: Profile) => {
        dispatch(editProfile(values))
    }

    useEffect(() => {
        if (!email) {
            router.push('/sign-in')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email])



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
        <AuthLayout title="Forgot Password" >
            <Container>

                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <Card className="mt-4 p-4">
                            <div className='flex flex-col items-center justify-center'>
                                <LogoSimple className='d-none d-sm-block' />
                                <LogoSimpleMobile className='d-sm-none' />
                                <div className="text-center text-muted mb-2 gap-2">
                                    <h5 className="text-primary p-2">Ola! Seja Bem Vindo!</h5>
                                    <p >
                                        Para seu primeiro acesso,
                                        você deve ativar sua conta e
                                        completar seu cadastro na plataform.
                                        Preencha o código de verificação
                                        enviado para o seu email:
                                        <br />
                                        <span className="mx-2 fw-bold">{email}</span>
                                    </p>
                                </div>

                            </div>
                            <Formik
                                enableReinitialize
                                validationSchema={validate}
                                initialValues={initialValues(email) as any}
                                onSubmit={onSubmit}
                            >
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
                            </Formik>

                        </Card>

                    </Col>
                </Row>
            </Container>
        </AuthLayout >
    );
};

export default ActivationAccount;