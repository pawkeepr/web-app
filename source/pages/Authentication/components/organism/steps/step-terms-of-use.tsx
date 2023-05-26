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