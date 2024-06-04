import AuthLayout from '../../_layouts/auth/auth_layout'

import { useEffect, useState } from 'react'

import { useAppSelector } from '~/store/hooks'

//formik
import { Formik } from 'formik'

import validate, { type ActivateAccount } from './activate'

import { signOutUser } from '~/store/slices/auth/login/actions'
import { addNew } from '~/store/slices/auth/profile/actions'
import { changeLayoutMode } from '~/store/slices/layouts/actions'

import { useAppDispatch } from '~/store/hooks'

import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'
import { BtnLink } from '~/Components/atoms/btn'

import { Tab } from '@headlessui/react'
import { layoutModeTypes } from '~/constants/layout'
import type { ActivateAccountTutor } from '~/types/activate-account-tutor'
import { TypeProfile, type Location } from '~/types/profile'
import StepActivationAddress from './components/steps-activation/step-address'
import StepActivationFinally from './components/steps-activation/step-finally'
import StepActivationPerson from './components/steps-activation/step-person'
import type { StepProps } from './components/steps-activation/types'

const initialValues = (email: string): ActivateAccount => ({
    email,
    contact: {
        email,
        whatsapp: '',
    },
    cpf_cnpj: '',
    firstName: '',
    lastName: '',
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
})

const Tabs = [
    {
        id: '1',
        component: (props: StepProps) => <StepActivationPerson {...props} />,
    },
    {
        id: '2',
        component: (props: StepProps) => <StepActivationAddress {...props} />,
    },
    {
        id: '3',
        component: (props: StepProps) => <StepActivationFinally {...props} />,
    },
]

const ActivationAccount = () => {
    const email = useAppSelector((state) => state.Login.username)

    const [selectedIndex, setSelectedIndex] = useState(0)
    const dispatch = useAppDispatch()

    const onSubmit = (values: ActivateAccount) => {
        const profile: ActivateAccountTutor = {
            user_information: {
                type_profile: TypeProfile.VETERINARY,
                cpf_cnpj: values?.cpf_cnpj,
                address: { ...(values?.location as Location) },
                first_name: values?.firstName,
                last_name: values?.lastName,
                contact: {
                    email: values?.contact.email as string,
                    phone: values?.contact.whatsapp as string,
                    whatsapp: values?.contact.whatsapp as string,
                    facebook: '',
                    instagram: '',
                    linkedIn: '',
                    twitter: '',
                    youtube: '',
                },
                name: `${values?.firstName} ${values?.lastName}`,
                url_img: '',
            },
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
        setSelectedIndex((state) => {
            const stateNumber = Number(state)

            if (stateNumber === Tabs.length) {
                return state
            }

            return stateNumber + 1
        })
    }

    const onChangePrevStep = () => {
        setSelectedIndex((state) => {
            const stateNumber = Number(state)

            if (stateNumber === 1) {
                return state
            }

            return stateNumber - 1
        })
    }

    return (
        <AuthLayout title="Activation Profile">
            <div className="flex flex-col items-center justify-center ">
                <div className="gap-1 font-sans text-center text-gray-600">
                    <h5 className="p-2 font-sans font-bold uppercase text-secondary-500">
                        Olá, Seja Bem-Vindo(a)!
                    </h5>
                    <p>
                        Para seu primeiro acesso, você deve completar seu cadastro
                        na plataforma.
                        <br />
                        <span className="mx-2 font-semibold">
                            {email || 'email@teste.com'}
                        </span>
                    </p>
                    <p className="text-sm font-bold text-secondary-500">
                        Obrigatório (*)
                    </p>
                </div>
            </div>
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List className="hidden">
                    {Tabs.map((tab) => (
                        <Tab key={tab.id}>{tab.id}</Tab>
                    ))}
                </Tab.List>
                <Formik
                    enableReinitialize
                    validationSchema={validate}
                    initialValues={initialValues(email)}
                    onSubmit={onSubmit}
                    initialErrors={{}}
                >
                    <>
                        {Tabs.map((tab) => (
                            <Tab.Panel
                                key={tab.id}
                                data-testid={`step-${tab.id.padStart(2, '0')}`}
                            >
                                {tab.component({
                                    prevStep: onChangePrevStep,
                                    nextStep: onChangeNextStep,
                                })}
                            </Tab.Panel>
                        ))}
                    </>
                </Formik>
            </Tab.Group>

            <BtnLink
                message="Sair"
                className="absolute top-2 right-2"
                href="/logout"
            >
                <ArrowLeftCircleIcon />
            </BtnLink>
        </AuthLayout>
    )
}

export default ActivationAccount
