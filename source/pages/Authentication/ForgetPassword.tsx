'use client'

import PropTypes from "prop-types";

import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

//redux
import { useDispatch } from "react-redux";

import Link from "next/link";

// Formik Validation
import { Form, Formik } from "formik";
import * as Yup from "yup";

// action
import { forgetPwd } from "~/store/auth/forget-pwd/actions";

import { BtnSuccess } from "~/Components/atoms/btn";
import HeaderTitle from "~/Components/atoms/header-title";
import LogoSimple from "~/Components/atoms/logo-simple";
import LogoSimpleMobile from "~/Components/atoms/logo-simple-mobile";
import FieldControl from "~/Components/molecules/field-control/field-control";
import LOADING from "~/constants/loading";
import { useAppSelector } from "~/store/hooks";

const validationSchema = Yup.object({
  email: Yup.string().required("Por favor, digite seu email!").email("Email inválido"),
})

type InitialValues = Yup.InferType<typeof validationSchema>

const initialValues: InitialValues = {
  email: '',
}


const ForgetPasswordPage = (props: { history: any; }) => {

  const dispatch = useDispatch();

  const isLoading = useAppSelector(state => state.ForgetPassword.isLoading);

  const handleSubmit = (values: InitialValues) => {
    dispatch(forgetPwd(values));
  }

  return (
    <div className="auth-page-wrapper auth-bg-cover py-5 flex justify-content-center align-items-center min-h-[94vh]">
      <div className="bg-overlay" />
      <HeaderTitle title="Forget Password" />
      <Container>


        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="mt-4 p-4">
              <div className='flex flex-col items-center justify-center'>
                <LogoSimple className='d-none d-sm-block' />
                <LogoSimpleMobile className='d-sm-none' />
                <div className="text-center mb-2">
                  <h5 className="text-primary">Ola!</h5>
                  <p className="text-muted">Você esqueceu sua senha?</p>
                  <p className="text-muted">Podemos te Ajudar!</p>
                </div>
              </div>


              <Alert className="alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                Digite seu email para receber um link de redefinição de senha.
              </Alert>
              <div className="p-2">
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="mb-4">
                      <FieldControl
                        name="email"
                        type="email"
                        label="Email"
                        required
                        placeholder="Digite seu email"
                        className="form-control"
                      />

                    </div>

                    <div className="text-center mt-4 w-full ">
                      <BtnSuccess
                        type="submit"
                        className="w-full"
                        disabled={isLoading === LOADING.PENDING}
                      >
                        Enviar Link de Redefinição de Senha
                      </BtnSuccess>
                    </div>
                  </Form>
                </Formik>
              </div>
            </Card>

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

          </Col>
        </Row>
      </Container>
    </div>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default ForgetPasswordPage;
