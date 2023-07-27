import { cnpj, cpf } from "cpf-cnpj-validator";
import { useFormikContext } from "formik";

import Form from "react-bootstrap/Form";

import { useMemo } from "react";
import MaskedInput from "react-input-mask";

import BtnCancel from "~/Components/atoms/btn/btn-cancel";
import BtnSuccess from "~/Components/atoms/btn/btn-success";
import FieldControl from "~/Components/molecules/field-control";
import FieldControlSelectMult from "~/Components/molecules/field-control/field-control-select-mult";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import validatePerson from "~/validations/person";

import useNextStep from "~/hooks/use-next-step";
import { ActivateAccount } from "~/validations/activate";
import { StepProps } from "./types";
import { sub_speciality } from "~/common/data/subSpecialitys";
import NumberWhatsapp from "~/Components/molecules/field-control/field-whatsapp";

const StepSignUpPerson = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const { values, setFieldValue } = useFormikContext<ActivateAccount>();
    const { cpf_cnpj } = values;

    const isValidCnpj = useMemo(() => cnpj.isValid(cpf_cnpj), [cpf_cnpj]);

    const requiredValid = useMemo((): boolean => {
        const isValid = validatePerson.isValidSync(values);

        return isValid;
    }, [values]);

    useNextStep(nextStep, requiredValid);

    const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFieldValue("lastName", value);
    };

    const mask = useMemo(() => {
        // somente os números
        const numbers = cpf_cnpj.replace(/\D/g, "");

        // verifica se é CPF ou CNPJ
        if (numbers.length === 11 && cpf.isValid(numbers))
            return "999.999.999-99";

        return numbers.length >= 11 ? "99.999.999/9999-99" : "999.999.999-99";
    }, [cpf_cnpj]);

    return (
        <div className="container grid grid-cols-2 mobile:grid-cols-1 gap-1">
            <div className="col-span-2 mobile:col-span-2">
                <FieldControl
                    initialFocus
                    label="Nome Completo"
                    name="firstName"
                    aria-label="firstName"
                    className="form-control"
                    placeholder="Nome"
                    required
                    disabledError
                >
                    <Form.Control
                        type="text"
                        name="lastName"
                        aria-label="lastName"
                        placeholder="Sobrenome"
                        onChange={onChangeLastName}
                        required
                        className="ms-1 w-50"
                    />
                </FieldControl>
            </div>
            <FieldControl
                label="CPF/CNPJ"
                name="cpf_cnpj"
                aria-label="cpf_cnpj"
                className="form-control"
                placeholder="CPF/CNPJ"
                component={MaskedInput as any}
                mask={mask}
                required
            />

            <FieldControl
                type="text"
                label="CRMV"
                divClassName="mobile:col-span-2"
                name="crmv"
                placeholder="Digite o seu CRMV"
                className="form-control"
                component={MaskedInput as any}
                mask={"aa999999"}
                maskChar={null}
                required
            />
             <FieldControlSelect
                type="text"
                divClassName="mobile:col-span-2"
                label="Especialidade"
                name="speciality"
                items={sub_speciality}
            />
            <FieldControlSelectMult
                type="text"
                divClassName="mobile:col-span-2"
                label="Sub Especialidade"
                name="sub_speciality"
                items={sub_speciality}
            />
            <NumberWhatsapp />
            <div className="mt-1 flex justify-center items-center col-span-full">
                
                <BtnSuccess
                    label="Próximo"
                    className="m-1"
                    onClick={nextStep}
                    disabled={!requiredValid}
                />
            </div>
        </div>
    );
};

export default StepSignUpPerson;
