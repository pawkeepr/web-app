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
import { addNew } from '~/store/auth/profile/actions';
import { changeLayoutMode } from '~/store/layouts/actions';

import { useAppDispatch } from '~/store/hooks';

import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { BtnLink } from '~/Components/atoms/btn';
import { Profile, RULES } from '~/store/auth/profile/types';

import { layoutModeTypes } from '~/Components/constants/layout';
import StepActivationAddress from './components/organism/steps-activation/step-address';
import StepActivationFinally from './components/organism/steps-activation/step-finally';
import StepActivationPerson from './components/organism/steps-activation/step-person';
import StepActivationSpecialty from './components/organism/steps-activation/step-specialty';

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
    specialty: {
        label: '',
        value: '',
    }
});


const Tabs = [
    {
        id: '1',
        component: (props: any) => <StepActivationPerson {...props} />
    },
    {
        id: '2',
        component: (props: any) => <StepActivationSpecialty {...props} />
    },
    {
        id: '3',
        component: (props: any) => <StepActivationAddress {...props} />
    },
    {
        id: '4',
        component: (props: any) => <StepActivationFinally {...props} />
    },
]

const ActivationAccount = () => {

    const email = useAppSelector(state => state.Login.username)
    const state = useAppSelector(state => state)
    
    const [tab, setTab] = useState('1')

    const dispatch = useAppDispatch()

    const onSubmit = async (values: ActivateAccount) => {
        const { list_specialty, ...rest } = values

        const profile: Profile = {
            ...rest,
            specialty: values.specialty.value,
            list_specialty: list_specialty.map(item => ({
                name_specialty: item.label,
                type: item.value,
            }))
        }

        dispatch(addNew(profile))
    }

    useEffect(() => {
        dispatch(changeLayoutMode(layoutModeTypes.LIGHT_MODE))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

            <div className='flex flex-col items-center justify-center '>
                <div className="text-center font-sans text-gray-600 gap-1">
                    <h5 className="text-secondary-500 uppercase font-bold font-sans p-2">Olá, Seja Bem-Vindo(a)!</h5>
                    <p>
                        Para seu primeiro acesso,
                        você deve
                        completar seu cadastro na plataforma.
                        <br />
                        <span className="mx-2 font-semibold">{email || 'email@teste.com'}</span>
                    </p>
                    <p className="text-sm font-bold text-secondary-500">Obrigatório (*)</p>
                </div>
            </div>
            <Formik
                enableReinitialize
                validationSchema={validate}
                initialValues={initialValues(email) as any}
                onSubmit={onSubmit}
                initialErrors={{}}
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

            <BtnLink
                message="Sair"
                className="absolute top-2 right-2"
                href="/logout"
            >
                <ArrowLeftCircleIcon />
            </BtnLink>

        </AuthLayout >
    );
};

export default ActivationAccount;