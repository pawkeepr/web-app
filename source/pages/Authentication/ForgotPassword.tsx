'use client'

import PropTypes from "prop-types";

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

//redux
import { useDispatch } from "react-redux";

import Link from "next/link";

// Formik Validation
import { Formik } from "formik";
import * as Yup from "yup";

// action
import { updatePwd } from "~/store/auth/forget-pwd/actions";

import LogoSimple from "~/Components/atoms/logo-simple";
import LogoSimpleMobile from "~/Components/atoms/logo-simple-mobile";

// 187913

import { Tab } from "@headlessui/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
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
      <Container>
        <Row className="justify-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="mt-4 p-4">
              <div className='flex flex-col items-center justify-center'>
                <LogoSimple className='d-none d-sm-block' />
                <LogoSimpleMobile className='d-sm-none' />
                <div className="text-center mb-2">
                  <h5 className="text-primary">Olá, Seja Bem-Vindo(a)!</h5>
                  <p className="text-muted">Você esqueceu sua senha?</p>
                  <p className="text-muted">Podemos te Ajudar!</p>
                </div>
              </div>

              <div className="p-2">
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
              <div className="mt-4 text-center">
                <p className="mb-0">Espere, Eu lembro minha senha...
                  <br />
                  <Link
                    href="/sign-in"
                    className="font-semibold text-secondary-500 opacity-80 hover:text-secondary-500 hover:opacity-100 !no-underline"
                  >
                    Clique Aqui!
                  </Link>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </AuthLayout>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default ForgetPasswordPage;
