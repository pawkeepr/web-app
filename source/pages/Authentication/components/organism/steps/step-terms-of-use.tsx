import { useFormikContext } from "formik"
import { ActivateAccount } from "~/validations/activate"
import BtnCancel from "../../../../../Components/atoms/btn/btn-cancel"
import BtnSuccess from "../../../../../Components/atoms/btn/btn-success"
import { StepProps } from "./types"

const listItem = 'flex gap-2 fw-bold text-gray-500 p-1 text-center w-full'
const strongText = 'text-gray-700 mr-2'
const pStyle = 'text-center w-full text-sm'

const StepTermsOfUse = ({ prevStep, nextStep }: StepProps) => {

    const { values, isValid, handleSubmit } = useFormikContext<ActivateAccount>()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleSubmit()
        nextStep()
    }


    return (
        <>
            <div>
                <h4 className="text-center uppercase text-primary-600 text-base font-bold mb-1">
                    Informações pessoais
                </h4>

                <ul className="grid grid-cols-2">
                    <li className={listItem}>
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
                            <span className="">
                                {values.crmv}
                            </span>
                        </p>
                    </li>
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Documento:</strong>
                            <span className="">
                                {values.cpf_cnpj}
                            </span>
                        </p>
                    </li>

                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Telefone:</strong>
                            <span className="">
                                {values.phone}
                            </span>
                        </p>
                    </li>
                </ul>

                <h4 className="text-center uppercase text-primary-600 text-base font-bold my-2">Endereço</h4>

                <ul className="grid grid-cols-2">
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>CEP:</strong>
                            <span className="">
                                {values.zipCode}
                            </span>
                        </p>
                    </li>
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>Estado:</strong>
                            <span className="text-capitalize ">
                                {values.state}
                            </span>
                        </p>
                    </li>
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>Cidade:</strong>
                            <span className="text-capitalize ">
                                {values.city}
                            </span>
                        </p>
                    </li>

                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>Rua:</strong>
                            <span className="text-capitalize ">
                                {values.street}
                            </span>
                        </p>
                    </li >
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>Número:</strong>
                            <span className="">
                                {values.number}
                            </span>
                        </p>
                    </li>
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>Complemento:</strong>
                            <span className="text-capitalize ">
                                {values.complement || "N/I"}
                            </span>
                        </p>
                    </li>
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>Bairro:</strong>
                            <span className="text-capitalize ">
                                {values.neighborhood}
                            </span>
                        </p>
                    </li>

                </ul>
            </div>

            <div className="d-flex justify-content-evenly align-items-center">
                <div>
                    <BtnCancel onClick={prevStep} label="Anterior" className="m-1" />
                </div>
                <div>
                    <BtnSuccess
                        label="Finalizar cadastro"
                        type="submit"
                        onClick={handleClick}
                        disabled={!isValid}
                        className="align-self-center"
                    />
                </div>
            </div>
        </>
    )
}

export default StepTermsOfUse