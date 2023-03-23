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
            <div className="my-4">
                <h4 className="h4 my-3 text-center text-capitalize text-primary">Informações pessoais</h4>

                <ul className="list-group">
                    <li className="list-group-item d-flex gap-2 fw-bold text-gray-600">
                        <strong>Nome:</strong> 
                        <span className="text-capitalize ">
                            {values.person.firstName} {values.person.lastName}
                        </span>
                    </li>
                    <li className="list-group-item fw-bold d-flex gap-2 text-gray-600">
                        <strong>CRMV:</strong> 
                        <span className="">
                            {values.person.crmv}
                        </span>
                    </li>
                    <li className="list-group-item fw-bold d-flex gap-2 text-gray-600">
                        <strong>Documento:</strong> 
                        <span className="">
                            {values.person.document}
                        </span>
                    </li>
                    <li className="list-group-item d-flex gap-2 fw-bold text-gray-600">
                        <strong>Empresa:</strong> 
                        <span className="text-capitalize ">
                            {values.person.company || "Não informado"}
                        </span>
                    </li>
                    <li className="list-group-item fw-bold d-flex gap-2 text-gray-600">
                        <strong>Telefone:</strong> 
                        <span className="">
                            {values.person.phoneNumber}
                        </span> 
                       
                    </li>
                </ul>

                <h4 className="h4 text-center my-2 text-capitalize text-primary">Endereço</h4>

                <ul className="list-group">
                    <li className="list-group-item d-flex gap-2 fw-bold text-gray-600" >
                        <strong>País:</strong> 
                        <span className="text-capitalize ">
                            {values.address.country}
                        </span> 
                    </li>
                    <li className="list-group-item d-flex gap-2 fw-bold text-gray-600" >
                        <strong>Rua:</strong> 
                        <span className="text-capitalize ">
                            {values.address.street}
                        </span>
                    </li >
                    <li className="list-group-item fw-bold d-flex gap-2 text-gray-600" >
                        <strong>Número:</strong> 
                        <span className="">
                            {values.address.number}
                        </span>
                    </li>
                    <li className="list-group-item d-flex gap-2 fw-bold text-gray-600" >
                        <strong>Complemento:</strong> 
                        <span className="text-capitalize ">
                            {values.address.complement || "Não informado"}
                        </span>
                    </li>
                    <li className="list-group-item d-flex gap-2 fw-bold text-gray-600" >
                        <strong>Bairro:</strong> 
                        <span className="text-capitalize ">
                            {values.address.neighborhood}
                        </span>
                    </li>
                    <li className="list-group-item d-flex gap-2 fw-bold text-gray-600" >
                        <strong>Cidade:</strong> 
                        <span className="text-capitalize ">
                            {values.address.city}
                        </span>
                    </li>
                    <li className="list-group-item d-flex gap-2 fw-bold text-gray-600" >
                        <strong>Estado:</strong> 
                        <span className="text-capitalize ">
                            {values.address.state}
                        </span>
                    </li>
                    <li className="list-group-item d-flex gap-2 fw-bold text-gray-600" >
                        <strong>CEP:</strong> 
                        <span className="">
                            {values.address.zipCode}
                        </span>
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