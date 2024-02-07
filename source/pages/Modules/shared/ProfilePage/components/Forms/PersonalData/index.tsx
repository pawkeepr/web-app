import Form from "react-bootstrap/Form";
import { BtnPrimary, BtnSecondary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control";

const PersonalData = () => {
    return (
        <Form>
            <div className="flex mobile:flex-col">
                <div className="flex mobile:flex-col gap-3 mb-3">
                    <FieldControl
                        label="Nome"
                        type="text"
                        name={"firstname"}
                        className="form-control"
                        id="firstnameInput"
                        placeholder="Digite seu nome"
                    />
                    <FieldControl
                        label="Sobrenome"
                        type="text"
                        name={"lastname"}
                        className="form-control"
                        id="lastnameInput"
                        placeholder="Digite seu sobrenome"
                    />
                </div>
                <div className="flex mobile:flex-col gap-3 mb-3">
                    <FieldControl
                        label="Telefone"
                        type="text"
                        name={"phonenumber"}
                        className="form-control"
                        id="phonenumberInput"
                        placeholder="Digite seu telefone"
                    />
                    <FieldControl
                        label="Email"
                        name={"email"}
                        type="email"
                        className="form-control"
                        id="emailInput"
                        placeholder="Digite seu email"
                    />
                </div>
                <div className="flex mobile:flex-col gap-3 mb-3">
                    <FieldControl
                        label="Cidade"
                        type="text"
                        name={"city"}
                        className="form-control"
                        id="cityInput"
                        placeholder="Digite sua Cidade"
                    />
                    <FieldControl
                        label="País"
                        type="text"
                        name={"country"}
                        className="form-control"
                        id="countryInput"
                        placeholder="Digite seu País"
                    />
                </div>
                <div className="flex mobile:flex-col gap-3 mb-3">
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
                    <FieldControl
                        label="Endereço"
                        name={"address"}
                        as="textarea"
                        className="form-control"
                        id="exampleFormControlText\area"
                    />
                </div>
                <div className="hstack gap-2 justify-content-end">
                    <div className="flex justify-end items-end">
                        <BtnSecondary className="mr-2" label="Cancelar" />
                        <BtnPrimary className="" label="Salvar" />
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default PersonalData;
