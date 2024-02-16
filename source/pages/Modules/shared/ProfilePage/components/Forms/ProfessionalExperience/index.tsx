import { Form, Formik } from "formik";

import { useCallback } from "react";
import { BtnPrimary, BtnSecondary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import FieldTextArea from "~/Components/molecules/field-text-area/field-text-area";

type InitialValuesProps = {
    cargo?: string;
    empresa?: string;
    mesInicio?: string;
    anoInicio?: string;
    mesFim?: string;
    anoFim?: string;
    descricao?: string;
};

export const InitialValues = (props: InitialValuesProps) => {
    return {
        cargo: props.cargo || "",
        empresa: props.empresa || "",
        mesInicio: props.mesInicio || "",
        anoInicio: props.anoInicio || "",
        mesFim: props.mesFim || "",
        anoFim: props.anoFim || "",
        descricao: props.descricao || "",
    };
};

const ProfessionalExperience = () => {
    const currentYear = new Date().getFullYear();
    const listOfYears = Array.from(
        { length: 100 },
        (_, index) => currentYear - index
    );

    const handleSubmit = useCallback(() => {}, []);

    return (
        <Formik initialValues={InitialValues} onSubmit={handleSubmit}>
            <Form>
                <div id="1">
                    <div>
                        <div className="mb-3">
                            <div className="flex mobile:flex-col gap-3">
                                <FieldControl
                                    type="text"
                                    name={"jobTitle"}
                                    label="Cargo"
                                    className="form-control"
                                    id="jobTitle"
                                    placeholder=""
                                    defaultValue=""
                                />

                                <FieldControl
                                    label="Nome da Empresa"
                                    name={"companyName"}
                                    type="text"
                                    className="form-control"
                                    id="companyName"
                                    placeholder=""
                                />
                            </div>
                            <div className="flex justify-between gap-3 mobile:flex-col">
                                <div className="flex flex-col  mb-3">
                                    <h3 className="mt-4">Início</h3>
                                    <div className="flex gap-3 mobile:flex-col">
                                        <FieldControlSelect
                                            label="Mês"
                                            name="experienceYear"
                                            options={[
                                                { label: "Janeiro", value: 1 },
                                                {
                                                    label: "Fevereiro",
                                                    value: 2,
                                                },
                                                { label: "Março", value: 3 },
                                                { label: "Abril", value: 4 },
                                                { label: "Maio", value: 5 },
                                                { label: "Junho", value: 6 },
                                                { label: "Julho", value: 7 },
                                                { label: "Agosto", value: 8 },
                                                { label: "Setembro", value: 9 },
                                                { label: "Outubro", value: 10 },
                                                {
                                                    label: "Novembro",
                                                    value: 11,
                                                },
                                                {
                                                    label: "Dezembro",
                                                    value: 12,
                                                },
                                            ]}
                                        />
                                        {/* <div className="col-auto align-self-center mobile:hidden">
                                            de
                                        </div> */}
                                        <FieldControlSelect
                                            label="Ano"
                                            name="experienceYear"
                                            options={[
                                                { label: "Janeiro", value: 1 },
                                                {
                                                    label: "Fevereiro",
                                                    value: 2,
                                                },
                                                { label: "Março", value: 3 },
                                                { label: "Abril", value: 4 },
                                                { label: "Maio", value: 5 },
                                                { label: "Junho", value: 6 },
                                                { label: "Julho", value: 7 },
                                                { label: "Agosto", value: 8 },
                                                { label: "Setembro", value: 9 },
                                                { label: "Outubro", value: 10 },
                                                {
                                                    label: "Novembro",
                                                    value: 11,
                                                },
                                                {
                                                    label: "Dezembro",
                                                    value: 12,
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex mobile:flex-col">
                                    <div className="flex flex-col mb-3">
                                        <h3 className="mt-4">Fim</h3>
                                        <div className="flex gap-3 mobile:flex-col">
                                            <FieldControlSelect
                                                label="Mês"
                                                name="experienceYear"
                                                options={[
                                                    {
                                                        label: "Janeiro",
                                                        value: 1,
                                                    },
                                                    {
                                                        label: "Fevereiro",
                                                        value: 2,
                                                    },
                                                    {
                                                        label: "Março",
                                                        value: 3,
                                                    },
                                                    {
                                                        label: "Abril",
                                                        value: 4,
                                                    },
                                                    { label: "Maio", value: 5 },
                                                    {
                                                        label: "Junho",
                                                        value: 6,
                                                    },
                                                    {
                                                        label: "Julho",
                                                        value: 7,
                                                    },
                                                    {
                                                        label: "Agosto",
                                                        value: 8,
                                                    },
                                                    {
                                                        label: "Setembro",
                                                        value: 9,
                                                    },
                                                    {
                                                        label: "Outubro",
                                                        value: 10,
                                                    },
                                                    {
                                                        label: "Novembro",
                                                        value: 11,
                                                    },
                                                    {
                                                        label: "Dezembro",
                                                        value: 12,
                                                    },
                                                ]}
                                            />

                                            {/* <div className="col-auto align-self-center mobile:hidden">
                                                de
                                            </div> */}
                                            <FieldControlSelect
                                                label="Ano"
                                                name="experienceYear"
                                                options={listOfYears.map(
                                                    (year) => ({
                                                        label: year.toString(),
                                                        value: year,
                                                    })
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <FieldTextArea
                                    name="description "
                                    label="Descrição"
                                    placeholder="Crie uma breve descrição sobre o cargo"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="newForm" style={{ display: "none" }} />
                <div className="flex justify-end items-end">
                    <BtnSecondary className="mr-2" label="Cancelar" />
                    <BtnPrimary className="" label="Salvar" />
                </div>
            </Form>
        </Formik>
    );
};

export default ProfessionalExperience;
