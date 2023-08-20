import { cpf } from "cpf-cnpj-validator";
import { useFormikContext } from "formik";


import { useMemo, useState } from "react";
import MaskedInput from "react-input-mask";

import { BtnPrimary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import FieldControlSelectMult from "~/Components/molecules/field-control/field-control-select-mult";
import { sub_specialty } from "~/common/data/sub-specialtys";
import validatePerson from "~/validations/person";

import { FaWhatsapp } from "react-icons/fa";
import FieldDocument from "~/Components/molecules/field-document";
import useNextStep from "~/hooks/use-next-step";
import { ActivateAccount } from "~/validations/activate";
import { StepProps } from "./types";

const StepSignUpPerson = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const { values } = useFormikContext<ActivateAccount>();
    const [clickAppInput, setClickAppInput] = useState(false);
    const [phoneValue, setPhoneValue] = useState<string | any>(undefined);
    const { cpf_cnpj } = values;

    const requiredValid = useMemo((): boolean => {
        const isValid = validatePerson.isValidSync(values);

        return isValid;
    }, [values]);

    useNextStep(nextStep, requiredValid);

    const mask = useMemo(() => {
        // somente os números
        const numbers = cpf_cnpj.replace(/\D/g, "");

        // verifica se é CPF ou CNPJ
        if (numbers.length === 11 && cpf.isValid(numbers))
            return "999.999.999-99";

        return numbers.length >= 11 ? "99.999.999/9999-99" : "999.999.999-99";
    }, [cpf_cnpj]);

    const copyPhoneToWhatsapp = () => {
        if (phoneValue !== undefined) {
            setClickAppInput(true)
        }
    };

    const handlePhoneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneValue(event.target.value);

    };

    return (
        <div className="container grid grid-cols-2 gap-1 mobile:grid-cols-1">
            <div className="col-span-2 mobile:col-span-2 grid grid-cols-2">
                <FieldControl
                    initialFocus
                    label="Nome Completo"
                    name="firstName"
                    aria-label="firstName"
                    className=" "
                    placeholder="Nome"
                    required
                    disabledError
                />

                <FieldControl
                    label=" "
                    separator={""}
                    name="lastName"
                    aria-label="lastName"
                    className=" "
                    placeholder="Sobrenome"
                    disabledError
                />
            </div>
            <FieldDocument
                label="CPF/CNPJ"
                name="cpf_cnpj"
                aria-label="cpf_cnpj"
                className=" "
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
                className=" "
                component={MaskedInput as any}
                mask={"aa999999"}
                maskChar={null}
                required
            />
            <FieldControlSelect
                type="text"
                divClassName="mobile:col-span-2"
                label="Especialidade"
                name="specialty"
                items={sub_specialty}
            />
            <FieldControlSelectMult
                type="text"
                divClassName="mobile:col-span-2"
                label="Sub Especialidade"
                name="sub_specialty"
                items={sub_specialty}
            />
            <div className="relative">
                <FieldControl
                    className=" focus-visible:bg-transparent hover:bg-transparent focus:bg-transparent bg-transparent flex  "
                    type="text"
                    label="Telefone/Celular"
                    name="phone"
                    placeholder="Digite o seu Número de Telefone"
                    component={MaskedInput as any}
                    mask={"(99) 99999-9999"}
                    maskChar={null}
                    required
                    onChange={handlePhoneInputChange}
                />
                <div
                    onClick={copyPhoneToWhatsapp}
                    className="flex justify-center items-center"
                >
                    <p className="text-xs font-semibold mr-2 mb-2 md:m-2">
                        Clique neste ícone para duplicar o telefone no campo ao lado:
                    </p>
                    <FaWhatsapp onClick={copyPhoneToWhatsapp} className="text-green-600 text-xl cursor-pointer" />
                </div>
            </div>
            <div>
                {
                    // input de whatsapp com o mesmo numero do telefone caso o usuário clique no ícone do whatsapp
                    clickAppInput ? (
                        <FieldControl
                            className=" "
                            type="text"
                            label="WhatsApp"
                            name="whatsapp"
                            placeholder="Digite o seu Número do WhatsApp"
                            component={MaskedInput as any}
                            mask={"(99) 99999-9999"}
                            maskChar={null}
                            value={phoneValue}
                            required
                        />)
                        : (
                            <FieldControl
                                className=" "
                                type="text"
                                label="WhatsApp"
                                name="whatsapp"
                                placeholder="Digite o seu Número do WhatsApp"
                                component={MaskedInput as any}
                                mask={"(99) 99999-9999"}
                                maskChar={null}
                                value={""}
                                required
                            />)
                }
            </div>
            <div className="flex items-center justify-center mt-1 col-span-full">

                <BtnPrimary
                    onClick={nextStep}
                    disabled={!requiredValid}
                    label="Próximo"
                />
            </div>
        </div>
    );
};

export default StepSignUpPerson;
