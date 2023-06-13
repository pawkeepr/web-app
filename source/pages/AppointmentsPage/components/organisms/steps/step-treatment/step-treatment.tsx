import { useState } from "react";
import ControlSwitch from "../../../molecules/switch/switch";

//Import images

import { StepProps } from "../types";

import { FieldArray,useFormikContext } from "formik";
import { BtnAvatar, BtnLabel, BtnSuccess } from "~/Components/atoms/btn";
import { InitialValues } from "~/pages/AppointmentsPage/Appointments";
import AvatarPet from "../../../atoms/pet-avatar/pet-avatar";
import FieldControl from "~/Components/molecules/field-control/field-control";
import { exams } from "~/common/data/exams";
import { vaccines } from "~/common/data/vaccines";
import { diseases } from "~/common/data/diseases";
import ComboBoxAutocomplete from "~/Components/molecules/combo-box-autocomplete/combo-box-autocomplete";


const StepTreatment = ({ toggleTab, activeTab }: StepProps) => {
    const { values, setFieldValue } = useFormikContext<InitialValues>();
    const [enableField, setEnableField] = useState<boolean>(true);
 


    const onClick = () => {
        setEnableField((prevValue) => !prevValue);
    };

    const handleComboboxSelect = (selected:string) => {
        setFieldValue('selectedValue', selected);    
        console.log(selected);
    };



    return (
        <>
            <div>
                <h4 className="text-center">Tratamento</h4>
            </div>

            

            <div className="">
                <div className="mt-2">
                    <ControlSwitch
                        label="Aplicar Medicação"
                        className="mt-2 w-16 h-7"
                    >
                        <div className="flex flex-col">
                            <ControlSwitch
                                label="Uso Contínuo?"
                                className="mt-2 w-16 h-7"
                                onClick={onClick}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                                <FieldControl
                                    label="Marca"
                                    className="form-control"
                                    name="marca"
                                    type="text"
                                />
                            </div>

                            <div className="flex flex-col">
                                <FieldControl
                                    label="Início"
                                    className="form-control"
                                    name="inicio"
                                    type="text"
                                />
                            </div>

                            {enableField && (
                                <div className="flex flex-col">
                                    <FieldControl
                                        label="Fim"
                                        className="form-control"
                                        name="fim"
                                        type="text"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col">
                                <FieldControl
                                    label="Quantidade"
                                    className="form-control"
                                    name="quantidade"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <FieldControl
                                    label="A cada"
                                    className="form-control"
                                    name="cada"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <FieldControl
                                    label="Intervalo"
                                    className="form-control"
                                    name="intervalo"
                                    type="text"
                                />
                            </div>
                        </div>
                    </ControlSwitch>
                </div>

                <div className="mt-2">
                    <ControlSwitch
                        label="Aplicar vacina?"
                        className="mt-2 w-16 h-7"
                    >
                        <div className="mt-2">
                            
                            <FieldArray name="selectedVacinas">
                                {({ push, remove }) => (
                                    <ComboBoxAutocomplete label="Lista de Vacinas" name="selectVaccines" items={vaccines} onChange={handleComboboxSelect} />
                                )}
                            </FieldArray>
                        </div>
                    </ControlSwitch>
                </div>
                <div className="mt-2">
                    <ControlSwitch
                        label="Aplicar exame?"
                        className="mt-2 w-16 h-7"
                    >
                        <div className="mt-2 flex flex-col">
                        <FieldArray name="selectedExames">
                                {({ push, remove }) => (
                                    <ComboBoxAutocomplete label="Lista de Exames" name="selectExams" items={exams} onChange={handleComboboxSelect} />
                                )}
                            </FieldArray>
                        </div>
                    </ControlSwitch>
                </div>
                <div className="mt-2">
                    <ControlSwitch
                        label="Possui doença?"
                        className="mt-2 w-16 h-7"
                    >
                        <div className="grid grid-cols-2 gap-2 ">
                            <div className="flex flex-col items-center justify-center">
                            <FieldArray name="selectedDoencas">
                                {({ push, remove }) => (
                                    <ComboBoxAutocomplete label="Lista de Doenças" name="selectDoencas" items={diseases} onChange={handleComboboxSelect} />
                                    )}          
                            </FieldArray>

                            
                            </div>
                            <div className="flex flex-col">
                                <FieldControl
                                    label="Tipo de Doença"
                                    className="rounded-md form-control"
                                    name="tipoDoenca"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <FieldControl
                                    label="Severidade"
                                    className="rounded-md form-control"
                                    name="severidade"
                                    type="text"
                                />
                            </div>
                        </div>
                            <div className="flex flex-col">
                            <FieldControl
                            label="Descrição"
                            className="rounded-md hidden"
                            name="descricao"
                            type="text"
                        >
                            <textarea
                                className="form-control"
                                name="descricao"
                            ></textarea>
                        </FieldControl>
                            </div>
                    </ControlSwitch>
                </div>
                <div className="mt-2">
                    <ControlSwitch
                        label="Aplicar nutrição alimentar?"
                        className="mt-2 w-16 h-7"
                    >
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                                <FieldControl
                                    label="Nome do Alimento"
                                    className="rounded-md form-control"
                                    name="alimento"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <FieldControl
                                    label="Qtd de Alimento"
                                    className="rounded-md form-control"
                                    name="qtdAlimento"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <FieldControl
                                    label="Tipo Alimento"
                                    className="rounded-md form-control"
                                    name="tipoAlimento"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <FieldControl
                                    label="Horário Alimentação"
                                    className="rounded-md form-control"
                                    name="horario"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <FieldControl
                                    label="A cada"
                                    className="rounded-md form-control"
                                    name="periodoTempo"
                                    type="text"
                                />
                            </div>
                        </div>
                    </ControlSwitch>
                </div>

                <div className="mt-4">
                    <span>Informações Obrigatórias</span>
                    <div className="flex flex-col mt-2">
                        <FieldControl
                            label="Peso"
                            className="rounded-md form-control"
                            name="peso"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col mt-2">
                        <FieldControl
                            label="Orientações e Anotações"
                            className="rounded-md hidden"
                            name="observações"
                            type="text"
                        >
                            <textarea
                                className="form-control"
                                name="observacoes"
                            ></textarea>
                        </FieldControl>
                    </div>
                </div>
            </div>

            <div className="flex align-items-center justify-end gap-3 mt-4">
                <BtnLabel
                    link
                    type="button"
                    className="right ms-auto previestab"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                >
                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                    Voltar
                </BtnLabel>
                <BtnSuccess
                    type="button"
                    className="btn-label right ms-auto nexttab"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    Próximo
                    <i className="ri-check-line label-icon align-middle fs-16 ms-2"></i>
                </BtnSuccess>
            </div>
        </>
    );
};

export default StepTreatment;
