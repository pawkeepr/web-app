import { useFormikContext } from "formik"
import Link from "next/link"
import Form from "react-bootstrap/Form"
import { AccountSignUp } from "~/store/auth/register/types"
import BtnCancel from "../../../../../Components/atoms/btn/btn-cancel"
import BtnSuccess from "../../../../../Components/atoms/btn/btn-success"
import Container from "../../template/container"
import { StepProps } from "./types"

const listItem = 'flex gap-2 fw-bold text-gray-500 p-1 text-center w-full'
const strongText = 'text-gray-700 mr-2'
const pStyle = 'text-center w-full text-sm'

const StepTermsOfUse = ({ prevStep, nextStep }: StepProps) => {

    const { values, handleChange, isValid, handleSubmit } = useFormikContext<AccountSignUp>()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleSubmit()
        nextStep()
    }


    return (
        <Container>
            <div className="my-4">
                <h4 className="h4 my-4 text-center text-capitalize text-primary">Informações pessoais</h4>

                <ul className="grid grid-cols-2">
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Nome:</strong>
                            <span className="text-capitalize ">
                                {values.person.firstName} {values.person.lastName}
                            </span>
                        </p>
                    </li>
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>CRMV:</strong>
                            <span className="">
                                {values.person.crmv}
                            </span>
                        </p>
                    </li>
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Documento:</strong>
                            <span className="">
                                {values.person.document}
                            </span>
                        </p>
                    </li>
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Empresa:</strong>
                            <span className="text-capitalize ">
                                {values.person.company || "Não informado"}
                            </span>
                        </p>
                    </li>
                    <li className={listItem}>
                        <p className={pStyle}>
                            <strong className={strongText}>Telefone:</strong>
                            <span className="">
                                {values.person.phoneNumber}
                            </span>
                        </p>
                    </li>
                </ul>

                <h4 className="h4 text-center my-4 text-capitalize text-primary">Endereço</h4>

                <ul className="grid grid-cols-2">
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>País:</strong>
                            <span className="text-capitalize ">
                                {values.address.country}
                            </span>
                        </p>
                    </li>
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>Rua:</strong>
                            <span className="text-capitalize ">
                                {values.address.street}
                            </span>
                        </p>
                    </li >
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>Número:</strong>
                            <span className="">
                                {values.address.number}
                            </span>
                        </p>
                    </li>
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>Complemento:</strong>
                            <span className="text-capitalize ">
                                {values.address.complement || "Não informado"}
                            </span>
                        </p>
                    </li>
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>Bairro:</strong>
                            <span className="text-capitalize ">
                                {values.address.neighborhood}
                            </span>
                        </p>
                    </li>
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>Cidade:</strong>
                            <span className="text-capitalize ">
                                {values.address.city}
                            </span>
                        </p>
                    </li>
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>Estado:</strong>
                            <span className="text-capitalize ">
                                {values.address.state}
                            </span>
                        </p>
                    </li>
                    <li className={listItem} >
                        <p className={pStyle}>
                            <strong className={strongText}>CEP:</strong>
                            <span className="">
                                {values.address.zipCode}
                            </span>
                        </p>
                    </li>
                </ul>
            </div>

            <div>
                <Form.Check
                    type="checkbox"
                    className="w-100"
                    name="termsOfUse"
                    id="termsOfUse"
                    onChange={handleChange}
                    checked={values.termsOfUse}
                    label={
                        <p className="mb-4 fs-12 fst-italic">
                            {"Você se registrando aceita os termos de uso da plataforma: "}
                            <Link href="#" className="text-primary text-decoration-underline fst-normal fw-medium">Termos de Uso</Link>
                        </p>
                    }
                />
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
        </Container>
    )
}

export default StepTermsOfUse