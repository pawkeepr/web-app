import { Formik } from "formik";
import { useCallback } from "react";
import Form from "react-bootstrap/Form";
import { BtnPrimary, BtnSecondary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control";
import useProfile from "~/store/hooks/profile/use-profile";

const PersonalData = () => {
    type initialValuesProps = {
        firstname?: string;
        lastname?: string;
        phonenumber?: string;
        email?: string;
        city?: string;
        country?: string;
        zipcode?: string;
        address?: string;
    };

    const { data } = useProfile();

    console.log(data);

    const InitialValues: initialValuesProps = {
        firstname: data?.user_information?.first_name || undefined,
        lastname: data?.user_information?.last_name || undefined,
        phonenumber: data?.user_information?.contact?.phone || undefined,
        email: data?.user_information?.contact?.email || undefined,
        city: data?.user_information?.address?.city || undefined,
        country: data?.user_information?.address?.country || undefined,
        zipcode: data?.user_information?.address?.zipCode || undefined,
        address: data?.user_information?.address?.complement || undefined,
    };

    const handleSubmit = useCallback(() => {}, []);

    return (
        <Formik initialValues={InitialValues} onSubmit={handleSubmit}>
            <Form>
                <div className="flex flex-col">
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
        </Formik>
    );
};

export default PersonalData;
