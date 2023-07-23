import LogoSimple from '~/Components/atoms/logo-simple';
import LogoSimpleMobile from '~/Components/atoms/logo-simple-mobile';
import AuthLayout from '../_layouts/auth/auth_layout';

import { useEffect, useState } from 'react';

import { useAppSelector } from '~/store/hooks';


import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
//formik
import { Formik } from 'formik';

import validate, { ActivateAccount } from '~/validations/activate';

import { signOutUser } from '~/store/auth/login/actions';
import { editProfile } from '~/store/auth/profile/actions';

import { useAppDispatch } from '~/store/hooks';

import { Profile, RULES } from '~/store/auth/profile/types';
import StepSignUpAddress from './components/organism/steps/step-address';
import StepSignUpLoading from './components/organism/steps/step-loading';
import StepSignUpPerson from './components/organism/steps/step-person';
import StepSignUpTermsOfUse from './components/organism/steps/step-terms-of-use';

const initialValues = (email: string): ActivateAccount => ({
    firstName: '',
    lastName: '',
    crmv: '',
    contact: {
        email,
        phone: '',
        whatsapp: '',
    },
    type: RULES.ADMIN as any,
    cpf_cnpj: '',
    location: {
        country: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
    },
    list_service_type: [],
    list_specialty: [],
    specialty: ''
});


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

const ActivationAccount = () => {

    const email = useAppSelector(state => state.Login.username)
    const [tab, setTab] = useState('1')

    const dispatch = useAppDispatch()

    const onSubmit = async (values: Profile) => {
        dispatch(editProfile(values))
    }

    useEffect(() => {
        if (!email) {
            dispatch(signOutUser())
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
        <AuthLayout title="Activation Profile" >
            <section className="grid grid-cols-1 mobile:w-full mobile:h-full z-10 shadow-2xl">
                <main className="grid grid-cols-1 p-3 mobile:!p-1 md:p-5 bg-white w-full mobile:rounded-none rounded-xl">

                    <div className='flex flex-col items-center justify-center '>
                        <LogoSimple className='mobile:hidden block' />
                        <LogoSimpleMobile className='hidden mobile:block' />
                        <div className="text-center font-sans text-gray-600 gap-1">
                            <h5 className="text-primary-600 uppercase font-semibold font-sans p-2">Ola! Seja Bem Vindo!</h5>
                            <p>
                                Para seu primeiro acesso,
                                você deve
                                completar seu cadastro na plataforma.
                                <br />
                                <span className="mx-2 font-semibold">{email || 'email@teste.com'}</span>
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
                </main>
            </section>
        </AuthLayout >
    );
};

export default ActivationAccount;