import { useState } from "react";
import ControlSwitch from "../../../molecules/switch/switch";

//Import images

import { StepProps } from "../types";

import { FieldArray, useFormikContext } from "formik";
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



    // const handleComboboxSelect = (selected: string) => {
    //     setFieldValue('selectedValue', selected);    
    //     console.log(selected);
    // };




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
                            <div className="flex flex-col col-span-2">
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
                                    type="date"
                                />
                            </div>

                            {enableField && (
                                <div className="flex flex-col">
                                    <FieldControl
                                        label="Fim"
                                        className="form-control"
                                        name="fim"
                                        type="date"
                                    />
                                </div>
                            )}

                            <div className="flex items-center justify-center gap-2 w-full col-span-2">
                                <FieldControl
                                    label="Quantidade"
                                    className="form-control"
                                    name="quantidade"
                                    type="text"
                                />
                                <div className="flex flex-col mb-[6px] w-full">
                                    <span className=" text-xs">Tipo</span>
                                    <select className="form-control" id="selectTipoMedicacao">
                                        <option value="comprimido">Comprimido</option>
                                        <option value="gotas">Gotas</option>
                                        <option value="ml">ML</option>
                                        <option value="mg">Mg</option>
                                        <option value="gramas">Gramas</option>
                                        <option value="dose">Dose</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex w-full gap-2 justify-center items-center col-span-2 ">
                                <FieldControl
                                    label="Intervalo"
                                    className="form-control w-full"
                                    name="intervalo"
                                    type="text"
                                />
                                <div className="flex flex-col w-full mb-[6px]">
                                    <span className=" text-xs">Período</span>
                                    <select className="form-control" id="selectPeriodoMedicacao">
                                        <option value="hora">Hora(s)</option>
                                        <option value="dia">Dia</option>
                                        <option value="mes">Mes(es)</option>
                                        <option value="ano">Ano</option>
                                    </select>
                                </div>
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
                            <FieldArray name="selectedExames">
                                {({ push, remove }) => (
                                    <ComboBoxAutocomplete label="Lista de Vacinas" name="selectVaccines" items={vaccines}
                                    // onChange={handleComboboxSelect} 
                                    />
                                )}
                            </FieldArray>
                            {/* <FieldArray name="vaccines">
                {(arrayHelpers) => (
                  <>
                  
                    { values?.vaccines?.map((vaccine, index) => (
                      <div key={index} className="flex flex-col">
                        <ComboBoxAutocomplete
                          label={`Vacina ${index + 1}`}
                          name={`vaccines[${index}]`}
                          items={vaccines}
                        //   onChange={handleComboboxSelect}
                        />
                        <button
                        className="bg-primary w-32 h-10 rounded-lg mx-auto "
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remover Vacina
                        </button>
                      </div>
                    ))}
                    <button
                    className="bg-primary w-32 h-10 rounded-lg mt-2"
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                    >
                      Adicionar Vacina
                    </button>
                  </>
                )}
              </FieldArray> */}
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
                                    <ComboBoxAutocomplete label="Lista de Exames" name="selectExams" items={exams}
                                    // onChange={handleComboboxSelect} 
                                    />
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
                                        <ComboBoxAutocomplete label="Lista de Doenças" name="selectDoencas" items={diseases}
                                        //onChange={handleComboboxSelect}
                                        />
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
                            <div className="flex flex-col col-span-2">
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
                            <div className="flex flex-col col-span-2">
                                <FieldControl
                                    label="Nome do Alimento"
                                    className="rounded-md form-control"
                                    name="alimento"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col col-span-2">
                                <FieldControl
                                    label="Horário que começa Alimentação"
                                    className="rounded-md form-control"
                                    name="horario"
                                    type="text"
                                />
                            </div>
                            <div className="flex  w-full items-center gap-2 col-span-2 ">
                                <FieldControl
                                    label="Quantidade"
                                    className="rounded-md form-control"
                                    name="qtdAlimento"
                                    type="text"
                                />
                                <div className="flex flex-col mb-[6px] w-full">
                                    <span className=" text-xs">Medida</span>
                                    <select className="form-control">
                                        <option value="kg">Kilogramas</option>
                                        <option value="g">Gramas</option>
                                    </select>
                                </div>
                            </div>

                         
                            <div className="flex items-center justify-center gap-2 col-span-2">
                                <FieldControl
                                    label="Intervalo"
                                    className="rounded-md form-control"
                                    name="intervaloTempo"
                                    type="text"
                                />
                                <div className="flex flex-col w-full mb-[6px]">
                                    <span className=" text-xs">Período</span>
                                    <select className="form-control" id="alimentacaoSelect" name="alimentacaoSelect">
                                        <option value="hora">Hora(s)</option>
                                        <option value="dia">Dia</option>
                                        <option value="mes">Mes(es)</option>
                                        <option value="ano">Ano</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </ControlSwitch>
                </div>

                <div className="mt-4">
                    <span>Informações Obrigatórias</span>
                    <div className="flex items-center mt-2 gap-2 w-full">
                        <FieldControl
                            label="Peso"
                            className="rounded-md form-control"
                            name="peso"
                            type="text"

                        />
                        <div className="flex flex-col mb-[6px] w-full">
                            <span className=" text-xs">Medida</span>
                            <select className="form-control" id="informacoesSelect">
                                <option value="kg">Kilogramas</option>
                                <option value="g">Gramas</option>
                            </select>
                        </div>

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
                    className="right  previestab"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                >
                    <i className="ri-arrow-left-line  align-middle fs-16 me-2"></i>{" "}
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
                      <span className='ml-1'> Próximo </span>
                    <i className="ri-check-line align-middle fs-16 ms-2"></i>
                </BtnSuccess>
            </div>
        </>
    );
};

export default StepTreatment;
