import { useFormikContext } from "formik";


import { useMemo } from "react";
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
                    name="contact.phone"
                    placeholder="Digite o seu Número de Telefone"
                    component={MaskedInput as any}
                    mask={"(99) 99999-9999"}
                    maskChar={null}
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
                <FieldControl
                    type="text"
                    label="WhatsApp"
                    name="contact.whatsapp"
                    placeholder="Digite o seu Número do WhatsApp"
                    component={MaskedInput as any}
                    mask={"(99) 99999-9999"}
                    maskChar={null}
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
