import Alert from 'react-bootstrap/Alert';
import { BtnSuccess } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control/field-control";

import { FormEventHandler } from "react";

import { Form } from 'formik';

type StepPasswordProps = {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    isValid: boolean;
}

const StepPassword = ({ handleSubmit, isValid }: StepPasswordProps) => {

    return (
        <Form onSubmit={handleSubmit}>
            <Alert className="alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                Digite o código enviado para o email e sua nova senha.
            </Alert>

            <div className="mb-4">
                <FieldControl
                    name="code"
                    label="Código"
                    mask='999999'
                    required
                    placeholder="Digite seu código"
                    className="form-control"
                />
                <FieldControl
                    name="password"
                    label="Senha"
                    required
                    placeholder="Digite sua nova senha"
                    className="form-control"
                />

            </div>

            <div className="text-center mt-4 w-full ">
                <BtnSuccess
                    type="submit"
                    className="w-full"
                    disabled={!isValid}
                >
                    Redefinir Senha
                </BtnSuccess>
            </div>
        </Form>
    )
}

export default StepPassword