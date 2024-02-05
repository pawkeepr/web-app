import Link from "next/link";
import Form from "react-bootstrap/Form";
import { BtnPrimary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control";

const ChangePass = () => {
    return (
        <Form>
            <div className="flex justify-around w-full mobile:flex-col">
                <div>
                    <FieldControl
                        name={"oldpassword"}
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
                <BtnPrimary className="" label="Salvar Senha" />
            </div>
        </Form>
    );
};

export default ChangePass;
