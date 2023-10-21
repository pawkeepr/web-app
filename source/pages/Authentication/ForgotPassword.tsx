'use client'

import PropTypes from "prop-types";


//redux
import { useDispatch } from "react-redux";


// Formik Validation
import { Formik } from "formik";
import * as Yup from "yup";

// action
import { updatePwd } from "~/store/slices/auth/forget-pwd/actions";


// 187913

import { Tab } from "@headlessui/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { BtnLink } from "~/Components/atoms/btn";
import LOADING from "~/constants/loading";
import { useAppSelector } from "~/store/hooks";
import validatePassword from '~/validations/password';
import AuthLayout from "../_layouts/auth/auth_layout";
import StepEmail from "./components/organism/steps-forget-password/step-email";
import StepPassword from "./components/organism/steps-forget-password/step-password";
const validationSchema = Yup.object({
    email: Yup.string().required("Por favor, digite seu email!").email("Email inválido"),
    password: validatePassword,
    code: Yup.string().required("Por favor, digite o código de verificação!"),
})

export type InitialValues = Yup.InferType<typeof validationSchema>

const initialValues: InitialValues = {
    email: '',
    password: '',
    code: '',
}

const ForgetPasswordPage = (props: { history: any; }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const router = useRouter()
    const dispatch = useDispatch();
    const isLoading = useAppSelector(state => state.ForgetPassword.isLoadingUpdate);

    useEffect(() => {
        if (isLoading === LOADING.SUCCESS) {
            setTimeout(() => {
                router.push('/sign-in')
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])


    const onChangeSelectedTab = (index: number) => {
        setSelectedTab(index);
    }

    const onChangeTab = (index: number) => () => {
        setSelectedTab(index);
    }

    const handleSubmit = (values: InitialValues) => {
        dispatch(updatePwd(values));
    }

    return (
        <AuthLayout title="Forgot Password" >
            <div className='flex flex-col items-center justify-center'>
                <div className="text-center">
                    <p className="text-muted">Você esqueceu sua senha?</p>
                    <p className="text-muted">Podemos te Ajudar!</p>
                </div>
            </div>

            <div className="px-2">
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ handleSubmit, isValid, values }) => (
                            <>
                                <Tab.Group selectedIndex={selectedTab} onChange={onChangeSelectedTab}>
                                    <Tab.List className="hidden">
                                        {[0, 1].map((category) => (
                                            <Tab
                                                key={category}

                                            />

                                        ))}
                                    </Tab.List>

                                    <Tab.Panels className="mt-2">
                                        <Tab.Panel key={0}>
                                            <StepEmail email={values.email} onChangeNextTab={onChangeTab(1)} />
                                        </Tab.Panel>
                                        <Tab.Panel key={1}>
                                            <StepPassword handleSubmit={handleSubmit} isValid={isValid} />
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>

                            </>
                        )
                    }

                </Formik>
            </div>
            <div className="mt-4 text-center flex items-center flex-col">
                <p className="mb-1 text-sm text-center">
                    Espere, Eu lembro minha senha...
                </p>
                <BtnLink href="/sign-in" message="Clique Aqui!" />
            </div>

        </AuthLayout>
    );
};

ForgetPasswordPage.propTypes = {
    history: PropTypes.object,
};

export default ForgetPasswordPage;
