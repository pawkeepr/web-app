import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FieldControl from "~/Components/molecules/field-control";

const PersonalData = () => {
    return (
        <Form>
            <div>
                <div>
                    <div className="mb-3">
                        <FieldControl
                            label="Nome"
                            type="text"
                            name={"firstname"}
                            className="form-control"
                            id="firstnameInput"
                            placeholder="Digite seu nome"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-3">
                        <FieldControl
                            label="Sobrenome"
                            type="text"
                            name={"lastname"}
                            className="form-control"
                            id="lastnameInput"
                            placeholder="Digite seu sobrenome"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-3">
                        <FieldControl
                            label="Telefone"
                            type="text"
                            name={"phonenumber"}
                            className="form-control"
                            id="phonenumberInput"
                            placeholder="Digite seu telefone"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-3">
                        <FieldControl
                            label="Email"
                            name={"email"}
                            type="email"
                            className="form-control"
                            id="emailInput"
                            placeholder="Digite seu email"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-3">
                        <FieldControl
                            label="Cidade"
                            type="text"
                            name={"city"}
                            className="form-control"
                            id="cityInput"
                            placeholder="Digite sua Cidade"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-3">
                        <FieldControl
                            label="País"
                            type="text"
                            name={"country"}
                            className="form-control"
                            id="countryInput"
                            placeholder="Digite seu País"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-3">
                        <FieldControl
                            label="CEP"
                            type="text"
                            name={"zipcode"}
                            className="form-control"
                            minLength={5}
                            maxLength={6}
                            id="zipcodeInput"
                            placeholder="Digite seu CEP"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-3 pb-2">
                        <FieldControl
                            label="Endereço"
                            name={"address"}
                            as="textarea"
                            className="form-control"
                            id="exampleFormControlText\area"
                        />
                    </div>
                </div>
                <div>
                    <div className="hstack gap-2 justify-content-end">
                        <Button type="button" className="btn-primary">
                            Atualizar
                        </Button>
                        <Button type="button" className="btn-success">
                            Cancelar
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default PersonalData;
