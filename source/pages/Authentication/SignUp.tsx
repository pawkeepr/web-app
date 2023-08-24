"use client";

import { useEffect, useState } from "react";

import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
//formik
import { Formik } from "formik";
import * as Yup from "yup";

import validateEmail from "~/validations/email";
import validatePassword from "~/validations/password";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { BtnLink } from "~/Components/atoms/btn";
import bgAuth from "~/assets/images/bg-auth.webp";
import LOADING from "~/constants/loading";
import { registerUser, resetRegisterFlag } from "~/store/auth/register/actions";
import { AccountSignUp } from "~/store/auth/register/types";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import AuthLayout from "../_layouts/auth/auth_layout";
import StepActivation from "./components/organism/steps-sign-up/step-activation";
import StepSignUpBasicAuth from "./components/organism/steps-sign-up/step-basic-auth";

const validationSchema = Yup.object({
    email: validateEmail,
    password: validatePassword,
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "As senhas não coincidem")
        .required("Este campo é obrigatório"),
    termsOfUse: Yup.boolean().oneOf(
        [true],
        "Você deve aceitar os termos de uso"
    ),
    policyPrivacy: Yup.boolean().oneOf(
        [true],
        "Você deve aceitar a política de privacidade"
    ),
    //person: validatePerson,
    //address: validateAddress,
});

const CoverSignUp = () => {
    const [tab, setTab] = useState("1");

    const dispatch = useAppDispatch();
    const router = useRouter();
    const isLoading = useAppSelector(
        (state) => state.ActivateAccount.isLoading
    );
    const onSubmit = async (values: AccountSignUp) => {
        dispatch(registerUser(values));
    };

    useEffect(() => {
        return () => {
            dispatch(resetRegisterFlag());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isLoading === LOADING.SUCCESS) {
            dispatch(resetRegisterFlag());
            setTimeout(() => {
                router.push("/sign-in");
            }, 1500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const initialValues: AccountSignUp = {
        email: "",
        password: "",
        passwordConfirm: "",
        termsOfUse: false,
        policyPrivacy: false,
    };

    const Tabs = [
        {
            id: "1",
            component: (props: any) => <StepSignUpBasicAuth {...props} />,
        },
        {
            id: "2",
            component: (props: any) => <StepActivation {...props} />,
        },
        // {
        //     id: '3',
        //     component: (props: any) => <StepSignUpAddress {...props} />
        // },
        // {
        //     id: '2',
        //     component: (props: any) => <StepSignUpTermsOfUse {...props} />
        // },
        // {
        //     id: '3',
        //     component: (props: any) => <StepSignUpLoading {...props} />
        // }
    ];

    const onChangeNextStep = () => {
        setTab((state) => {
            const stateNumber = Number(state);

            if (stateNumber === Tabs.length) {
                return state;
            }

            return (stateNumber + 1).toString();
        });
    };

    const onChangePrevStep = () => {
        setTab((state) => {
            const stateNumber = Number(state);

            if (stateNumber === 1) {
                return state;
            }

            return (stateNumber - 1).toString();
        });
    };

    return (
        <AuthLayout title="Criar conta" image={bgAuth}
            alt="Imagem cartunizada de pessoas e um globo terrestre se comunicando">

            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <TabContainer activeKey={tab}>
                    {Tabs.map((tab, index) => (
                        <TabContent key={index}>
                            <TabPane
                                eventKey={tab.id}
                                data-testid={`step-${tab.id.padStart(
                                    2,
                                    "0"
                                )}`}
                            >
                                {tab.component({
                                    prevStep: onChangePrevStep,
                                    nextStep: onChangeNextStep,
                                })}
                            </TabPane>
                        </TabContent>
                    ))}
                </TabContainer>
            </Formik>
            <div className="mobile:hidden w-full flex flex-col justify-center items-center !h-fit">
                <p className="text-xs">
                    Você já tem uma conta ?
                </p>
                <BtnLink
                    className="p-0 h-fit"
                    href="/sign-in"
                    message="Entrar"
                />


            </div>
            <BtnLink
                message="Voltar"
                className="hidden mobile:flex max-w-fit absolute top-2 left-2  items-center justify-start"
                href="/sign-in"
            >
                <ArrowLeftCircleIcon />
            </BtnLink>

        </AuthLayout>
    );
};

export default CoverSignUp;
