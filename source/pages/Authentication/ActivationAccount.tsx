import AuthLayout from '../_layouts/auth/auth_layout';

import { useEffect, useState } from 'react';

import { useAppSelector } from '~/store/hooks';


import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
//formik
import { Formik } from 'formik';

import validate, { ActivateAccount, Location } from '~/validations/activate';

import { signOutUser } from '~/store/slices/auth/login/actions';
import { addNew } from '~/store/slices/auth/profile/actions';
import { changeLayoutMode } from '~/store/slices/layouts/actions';

import { useAppDispatch } from '~/store/hooks';

import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { BtnLink } from '~/Components/atoms/btn';

import { layoutModeTypes } from '~/Components/constants/layout';
import StepActivationAddress from './components/organism/steps-activation/step-address';
import StepActivationFinally from './components/organism/steps-activation/step-finally';
import StepActivationPerson from './components/organism/steps-activation/step-person';
import StepActivationSpecialty from './components/organism/steps-activation/step-specialty';
import { IProfile } from '~/types/profile';

const initialValues = (email: string): ActivateAccount => ({
    email,
    contact: {
        email,
        phone: '',
        whatsapp: '',
    },
    cpf_cnpj: '',
    crmv: '',
    firstName: '',
    lastName: '',
    list_service_type: [],
    list_specialty: [],
    specialty: {
        value: '',
        label: '',
    },
    location: {
        country: 'BR',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
    },
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

    const [tab, setTab] = useState('1')

    const dispatch = useAppDispatch()

    const onSubmit = async (values: ActivateAccount) => {
        const { 
            list_specialty, 
            specialty,
            list_service_type, 
            ...rest 
        } = values

        const profile: IProfile = {
            ...rest,
            user_information: {
                address: { ...values.location  as Location, },
                first_name: values.firstName,
                last_name: values.lastName,
                contact: { 
                    email: values.contact.email,
                    phone: values.contact.phone,
                    whatsapp: values.contact.whatsapp,
                    facebook: '',
                    instagram: '',
                    linkedIn: '',
                    twitter: '',
                    youtube: '',
                },
                name: `${values.firstName} ${values.lastName}`,
                url_img: '',
            },
            specialty_information: {
                list_service_type,
                specialty: specialty.value,
                list_specialty: list_specialty.map(item => ({
                    name_specialty: item.label,
                    type: item.value,
                }))
            }
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