import { useFormikContext } from "formik"
import Link from "next/link"
import Form from "react-bootstrap/Form"
import { AccountSignUp } from "~/store/auth/register/types"
import BtnCancel from "../../../../../Components/atoms/btn/btn-cancel"
import BtnSuccess from "../../../../../Components/atoms/btn/btn-success"
import Container from "../../template/container"
import { StepProps } from "./types"

const StepTermsOfUse = ({ prevStep, nextStep }: StepProps) => {

    const { values, handleChange, isValid, handleSubmit } = useFormikContext<AccountSignUp>()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleSubmit()
        nextStep()
    }


    return (
        <Container>
            <div className="mt-4">
                <h4>Informações pessoais</h4>
                <ul className="list-unstyled">
                    <li>
                        <strong>Nome:</strong> {values.person.firstName} {values.person.lastName}
                    </li>
                    <li>
                        <strong>CRMV:</strong> {values.person.crmv}
                    </li>
                    <li>
                        <strong>Documento:</strong> {values.person.document}
                    </li>
                    <li>
                        <strong>Empresa:</strong> {values.person.company || "Não informado"}
                    </li>
                    <li>
                        <strong>Telefone:</strong> {values.person.phoneNumber}
                    </li>
                </ul>

                <h4>Endereço</h4>
                <ul className="list-unstyled">
                    <li>
                        <strong>País:</strong> {values.address.country}
                    </li>
                    <li>
                        <strong>Rua:</strong> {values.address.street}
                    </li>
                    <li>
                        <strong>Número:</strong> {values.address.number}
                    </li>
                    <li>
                        <strong>Complemento:</strong> {values.address.complement || "Não informado"}
                    </li>
                    <li>
                        <strong>Bairro:</strong> {values.address.neighborhood}
                    </li>
                    <li>
                        <strong>Cidade:</strong> {values.address.city}
                    </li>
                    <li>
                        <strong>Estado:</strong> {values.address.state}
                    </li>
                    <li>
                        <strong>CEP:</strong> {values.address.zipCode}
                    </li>
                </ul>
            </div>
            <div className="mb-4">
                <Form.Check
                    type="checkbox"
                    className="w-100"
                    name="termsOfUse"
                    id="termsOfUse"
                    onChange={handleChange}
                    checked={values.termsOfUse}
                    label={
                        <p className="mb-0 fs-12 text-muted fst-italic">
                            {"Você se registrando aceita os termos de uso da plataforma: "}
                            <Link href="#" className="text-primary text-decoration-underline fst-normal fw-medium">Termos de Uso</Link>
                        </p>
                    } />
            </div>
            <div className="mt-4 d-flex justify-content-center">
                <BtnCancel onClick={prevStep} label="Anterior" className="m-1" />
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <BtnSuccess
                    label="Cadastrar"
                    type="submit"
                    onClick={handleClick}
                    disabled={!isValid}
                    className=" align-self-center"
                />
            </div>
        </Container>
    )
}

export default StepTermsOfUse