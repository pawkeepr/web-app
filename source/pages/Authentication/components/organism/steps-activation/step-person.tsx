import { useFormikContext } from "formik";


import { useMemo } from "react";

import { BtnPrimary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control";
import validatePerson from "~/validations/person";

import { FaWhatsapp } from "react-icons/fa";
import FieldCrmv from "~/Components/molecules/field-crmv";
import FieldDocument from "~/Components/molecules/field-document";
import FieldPhone from "~/Components/molecules/field-phone";
import useNextStep from "~/hooks/use-next-step";
import { ActivateAccount } from "~/validations/activate";
import { StepProps } from "../steps-sign-up/types";

const StepSignUpPerson = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const { values, setFieldValue } = useFormikContext<ActivateAccount>();

    const requiredValid = useMemo((): boolean => {
        const isValid = validatePerson.isValidSync(values);

        return isValid;
    }, [values]);

    useNextStep(nextStep, requiredValid);

    const copyPhoneToWhatsApp = () => {
        setFieldValue("contact.whatsapp", values.contact.phone);
    };

    return (
        <div className="container grid grid-cols-2 gap-1 mobile:grid-cols-1">
            <div className="col-span-2 mobile:col-span-2 grid grid-cols-2 gap-1">
                <FieldControl
                    initialFocus
                    label="Nome Completo"
                    name="firstName"
                    aria-label="firstName"
                    placeholder="Nome"
                    required
                    disabledError
                />

                <FieldControl
                    label=" "
                    separator={""}
                    name="lastName"
                    aria-label="lastName"
                    placeholder="Sobrenome"
                    disabledError
                />
            </div>
            <FieldDocument
                label="CPF/CNPJ"
                name="cpf_cnpj"
                aria-label="cpf_cnpj"
                placeholder="CPF/CNPJ"
                required
            />

            <FieldCrmv
                label="CRMV"
                name="crmv"
                placeholder="Digite o seu CRMV"
                required
            />

            <div className="relative">
                <FieldPhone
                    label="Telefone/Celular"
                    name="contact.phone"
                    placeholder="Digite o seu Número de Telefone"
                    required
                />
                <div
                    onClick={copyPhoneToWhatsApp}
                    className="flex justify-center items-center"
                >
                    <p className="text-xs font-semibold mr-2 mb-2 md:m-2">
                        Clique neste ícone para duplicar o telefone no campo ao lado:
                    </p>
                    <FaWhatsapp className="text-green-600 text-xl cursor-pointer" />
                </div>
            </div>
            <div>
                <FieldPhone
                    label="WhatsApp"
                    name="contact.whatsapp"
                    placeholder="Digite o seu Número do WhatsApp"
                    required
                />
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