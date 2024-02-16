import { Formik } from "formik";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { BtnPrimary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control";
import { updatePassword } from "~/services/helpers/auth";

const ChangePass = () => {
    const initialValues = {
        oldpassword: "",
        newpassword: "",
        confirmpassword: "",
    };

    const validationSchema = Yup.object().shape({
        oldpassword: Yup.string().required("Senha atual é obrigatória"),
        newpassword: Yup.string().required("Nova senha é obrigatória"),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref("newpassword"), null], "As senhas devem coincidir")
            .required("Confirme sua nova senha"),
    });

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        const { oldpassword, newpassword } = values;

        try {
            await updatePassword(oldpassword, newpassword);
            alert("Senha atualizada com sucesso!");
        } catch (error) {
            setFieldError("oldpassword", "Senha atual incorreta");
        }

        setSubmitting(false);
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className="flex justify-around w-full mobile:flex-col">
                    <div>
                        <FieldControl
                            name={"oldpassword"}
                            onChange={() => {}}
                            label="Senha Atual"
                            type="password"
                            className="form-control"
                            id="oldpasswordInput"
                            placeholder="Digite sua senha atual"
                        />
                    </div>

                    <div>
                        <div>
                            <FieldControl
                                name={"newpassword"}
                                label="Nova Senha"
                                type="password"
                                className="form-control"
                                id="newpasswordInput"
                                placeholder="Digite sua nova senha"
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <FieldControl
                                name={"confirmpassword"}
                                label="Confirmar Senha"
                                type="password"
                                className="form-control"
                                id="confirmpasswordInput"
                                placeholder="Confirme sua nova senha"
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <Link
                        href="#"
                        className="link-primary text-decoration-underline"
                    >
                        Esqueceu a senha?
                    </Link>
                </div>

                <div className="flex flex-col items-end">
                    <BtnPrimary
                        className=""
                        label="Salvar Senha"
                        type="submit"
                    />
                </div>
            </Form>
        </Formik>
    );
};

export default ChangePass;
