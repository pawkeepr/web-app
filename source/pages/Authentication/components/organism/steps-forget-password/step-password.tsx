import Alert from '~/Components/atoms/alert';
import { BtnPrimary } from '~/Components/atoms/btn';
import FieldControl from '~/Components/molecules/field-control/field-control';

import { FormEventHandler } from 'react';

import { Form } from 'formik';

type StepPasswordProps = {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    isValid: boolean;
};

const StepPassword = ({ handleSubmit, isValid }: StepPasswordProps) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Alert color="warning">
                Digite o código enviado para o email e sua nova senha.
            </Alert>

            <div className="mb-4">
                <FieldControl
                    name="code"
                    label="Código"
                    mask="999999"
                    required
                    placeholder="Digite seu código"
                    className=" "
                />
                <FieldControl
                    name="password"
                    label="Senha"
                    required
                    placeholder="Digite sua nova senha"
                    className=" "
                />
            </div>

            <div className="text-center mt-4 w-full ">
                <BtnPrimary
                    type="submit"
                    className="w-full"
                    disabled={!isValid}
                >
                    Redefinir Senha
                </BtnPrimary>
            </div>
        </Form>
    );
};

export default StepPassword;
