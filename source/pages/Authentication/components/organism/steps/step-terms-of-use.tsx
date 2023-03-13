import { useFormikContext } from "formik"
import Link from "next/link"
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form"
import { InitialStateSignUp } from "~/pages/Authentication/SignUp"
import { StepProps } from "./types"

const StepTermsOfUse = ({ prevStep }: StepProps) => {

    const { values, handleChange, handleSubmit } = useFormikContext<InitialStateSignUp>()


    return (
        <Container className="p-lg-5 p-4">

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
                <button className="btn btn-success w-40 m-1" type="button" onClick={prevStep}>Anterior</button>
                <button className="btn btn-success w-40 m-1" type="submit" onClick={handleSubmit}>Próximo</button>
            </div>
        </Container>
    )
}

export default StepTermsOfUse