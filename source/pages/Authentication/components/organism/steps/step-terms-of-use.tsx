import { useFormikContext } from "formik";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import { ActivateAccount } from "~/validations/activate";
import { StepProps } from "./types";

const listItem = "flex gap-1 font-semibold text-gray-500 p-1 text-center w-full";
const strongText = "text-gray-700 mr-2";
const pStyle = "text-center w-full text-sm flex flex-col";

const StepTermsOfUse = ({ prevStep, nextStep }: StepProps) => {
    const { values, isValid, handleSubmit } =
        useFormikContext<ActivateAccount>();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleSubmit();
        nextStep();
    };

    return (
        <div>
            <div className="shadow-lg mb-2">
                <h4 className="font-semibold text-lg capitalize mb-2 text-center text-primary-600">
                    Informações Pessoais
                </h4>

                <ul className="grid grid-cols-2">
                    <li className={`${listItem} col-span-full`}>
                        <p className={pStyle}>
                            <strong className={strongText}>Nome:</strong>
                            <span className="text-capitalize ">
                                {values.firstName} {values.lastName}
                            </span>
                        </p>
                    </li>
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>CRMV:</strong>
                            <span className="">{values.crmv}</span>
                        </p>
                    </li>
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Documento:</strong>
                            <span className="">{values.cpf_cnpj}</span>
                        </p>
                    </li>

                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Telefone:</strong>
                            <span className="">{values?.contact?.phone}</span>
                        </p>
                    </li>

                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>WhatsApp:</strong>
                            <span className="">{values?.contact?.phone}</span>
                        </p>
                    </li>
                </ul>

                <h4 className="font-semibold text-lg capitalize mb-2 text-center text-primary-600">
                    Endereço
                </h4>

                <ul className="grid grid-cols-3">
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>CEP:</strong>
                            <span className="">{values?.location?.zipCode}</span>
                        </p>
                    </li>
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Estado:</strong>
                            <span className="text-capitalize ">
                                {values?.location?.state}
                            </span>
                        </p>
                    </li>
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Cidade:</strong>
                            <span className="text-capitalize ">
                                {values?.location?.city}
                            </span>
                        </p>
                    </li>

                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Rua:</strong>
                            <span className="text-capitalize ">
                                {values?.location?.street}
                            </span>
                        </p>
                    </li>
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Número:</strong>
                            <span className="">{values?.location?.number}</span>
                        </p>
                    </li>
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Bairro:</strong>
                            <span className="text-capitalize ">
                                {values?.location?.neighborhood}
                            </span>
                        </p>
                    </li>
                    <li className={`${listItem} col-span-full`}>
                        <p className={pStyle}>
                            <strong className={strongText}>Complemento:</strong>
                            <span className="text-capitalize ">
                                {values?.location?.complement || "Não informado"}
                            </span>
                        </p>
                    </li>
                </ul>
            </div>

            <div className="d-flex justify-content-evenly align-items-center">
                <div>
                    <BtnCancel
                        onClick={prevStep}
                        label="Anterior"
                        className="m-1"
                    />
                </div>
                <div>
                    <BtnPrimary
                        label="Cadastrar"
                        type="submit"
                        onClick={handleClick}
                        disabled={!isValid}
                        className="align-self-center"
                    />
                </div>
            </div>
        </div>
    );
};

export default StepTermsOfUse;
