import { cnpj, cpf } from "cpf-cnpj-validator";
import { useFormikContext } from "formik";

import Form from "react-bootstrap/Form";

import { useMemo } from "react";
import MaskedInput from "react-input-mask";

import BtnCancel from "~/Components/atoms/btn/btn-cancel";
import BtnSuccess from "~/Components/atoms/btn/btn-success";
import FieldControl from "~/Components/molecules/field-control";
import validatePerson from "~/validations/person";

import useNextStep from "~/hooks/use-next-step";
import { ActivateAccount } from "~/validations/activate";
import { StepProps } from "./types";
import ComboBoxAutocomplete from "~/Components/molecules/combo-box-autocomplete/combo-box-autocomplete";
import { sub_speciality } from "~/common/data/subSpecialitys";
import image_whatsapp from "../../../../../../styles/assets/images/WhatsApp.svg.png";
import NumberWhatsapp from "~/Components/molecules/field-control/__snapshots__/field-whatsapp";

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
        <div className="container d-flex flex-column">
            <FieldControl
                initialFocus
                divClassName="my-1"
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

            <FieldControl
                label="CPF/CNPJ"
                divClassName="my-1"
                name="cpf_cnpj"
                aria-label="cpf_cnpj"
                className="form-control"
                placeholder="CPF/CNPJ"
                component={MaskedInput as any}
                mask={mask}
                required
            />
            {/* {isValidCnpj &&
                    (<FieldControl
                        label='Companhia'
                        divClassName='my-1'
                        name="company"
                        aria-label="company"
                        className="form-control"
                        placeholder="Nome da Empresa"
                        required
                        disabledError
                    />)} */}
            <FieldControl
                type="text"
                divClassName="my-1"
                label="CRMV"
                name="crmv"
                placeholder="Digite o seu CRMV"
                className="form-control"
                component={MaskedInput as any}
                mask={"aa999999"}
                maskChar={null}
                required
            />
            <FieldControl
                type="text"
                divClassName="my-1"
                label="Especialidade"
                name="speciality"
                placeholder="Digite sua especialidade"
                className="form-control"
                required
            />
            <ComboBoxAutocomplete
                label="Sub Especialidade"
                name="sub_speciality"
                items={sub_speciality}
            />
            <NumberWhatsapp />
            {/* <FieldControl
                className="form-control"
                divClassName="my-1"
                type="text"
                label="Telefone/Celular"
                name="phone"
                placeholder="Digite o seu Número de Telefone"
                component={MaskedInput as any}
                mask={"(99) 99999-9999"}
                maskChar={null}
                required
            /> */}

            <div className="mt-4 d-flex justify-content-center">
                <BtnCancel
                    onClick={prevStep}
                    label="Anterior"
                    className="m-1"
                />
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
