import AuthLayout from '../../../_layouts/auth/auth_layout'

import { useEffect, useState } from 'react'

import { Tab } from '@headlessui/react'
//formik
import { Formik } from 'formik'
import { useAppSelector } from '~/store/hooks'

import validate, { type ActivateAccount } from '~/validations/activate'

import { signOutUser } from '~/store/slices/auth/login/actions'
import { addNew } from '~/store/slices/auth/profile/actions'
import { changeLayoutMode } from '~/store/slices/layouts/actions'

import { useAppDispatch } from '~/store/hooks'

import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'
import { BtnLink } from '~/Components/atoms/btn'

import { layoutModeTypes } from '~/constants/layout'
import type { ActivateAccountVeterinary } from '~/types/activate-account-veterinary'
import { TypeProfile, type ScheduleDays } from '~/types/profile'
import StepActivationAddress from './components/steps-activation/step-address'
import StepActivationFinally from './components/steps-activation/step-finally'
import StepActivationPerson from './components/steps-activation/step-person'
import StepActivationSchedule from './components/steps-activation/step-schedule'
import StepActivationSpecialty from './components/steps-activation/step-specialty'
import type { StepProps } from './components/steps-activation/types'

export const makeInitialValues = (email: string): ActivateAccount => ({
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
    types_service: [],
    types_animals: [],
    specialty: '',
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
        component: (props: StepProps) => <StepActivationSpecialty {...props} />,
    },
    {
        id: '3',
        component: (props: StepProps) => <StepActivationSchedule {...props} />,
    },
    {
        id: '4',
        component: (props: StepProps) => <StepActivationAddress {...props} />,
    },
    {
        id: '5',
        component: (props: StepProps) => <StepActivationFinally {...props} />,
    },
]

const ActivationAccount = () => {
    const email = useAppSelector((state) => state.Login.username)

    const [selectedIndex, setSelectedIndex] = useState(0)

    const dispatch = useAppDispatch()

    const onSubmit = async (values: ActivateAccount) => {
        const { list_specialty } = values

        const profile: ActivateAccountVeterinary = {
            user_information: {
                type_profile: TypeProfile.VETERINARY,
                cpf_cnpj: values?.cpf_cnpj,
                address: { ...(values?.location as Location) },
                first_name: values?.firstName,
                last_name: values?.lastName,
                contact: {
                    email: values?.contact.email as string,
                    phone: values?.contact.phone as string,
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

            veterinary_information: {
                cpf_cnpj: values?.cpf_cnpj,
                opening_days_times: values?.opening_days_times?.filter(
                    (item) => item !== null,
                ) as ScheduleDays[],
                crmv: values?.crmv,
                list_service_type: values?.list_service_type as string[],
                specialty: values?.specialty,
                list_specialty: list_specialty as string[],
            },
        }

        await new Promise((resolve) => {
            resolve(dispatch(addNew(profile)))
        })
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
            <BtnLink
                message="Sair"
                className="absolute top-0 right-0 !w-fit"
                href="/logout"
            >
                <ArrowLeftCircleIcon />
            </BtnLink>
            <div className="relative flex flex-col items-center justify-center ">
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
                <Tab.Panels>
                    <Formik
                        enableReinitialize
                        validationSchema={validate}
                        initialValues={makeInitialValues(email)}
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
                </Tab.Panels>
            </Tab.Group>
        </AuthLayout>
    )
}

export default ActivationAccount
