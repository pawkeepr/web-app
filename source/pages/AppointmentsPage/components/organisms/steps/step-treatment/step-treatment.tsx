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
import { PlusIcon } from "@heroicons/react/24/outline";
import { FaRegTrashAlt } from "react-icons/fa";

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
                        className="mt-2 w-[3.72rem] h-6 lg:w-16 lg:h-7 "
                    >
                        <div className="flex flex-col">
                            <ControlSwitch
                                label="Uso Contínuo?"
                                className="mt-2 w-[3.72rem] h-6"
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
                                    <select
                                        className="form-control"
                                        id="selectTipoMedicacao"
                                    >
                                        <option value="comprimido">
                                            Comprimido
                                        </option>
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
                                    <select
                                        className="form-control"
                                        id="selectPeriodoMedicacao"
                                    >
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
                        className="mt-2 lg:w-16 lg:h-7 w-[3.72rem] h-6"
                    >
                        <div className="mt-2">
                            <FieldArray name="vaccines">
                                {(arrayHelpers) => (
                                    <>
                                        {values?.vaccines?.map(
                                            (vaccine, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-2 justify-center items-center"
                                                >
                                                    <ComboBoxAutocomplete
                                                        label={`Vacina ${
                                                            index + 1
                                                        }`}
                                                        name={`vaccine${index}`}
                                                        items={vaccines}
                                                        //   onChange={handleComboboxSelect}
                                                    />
                                                    {index == 0 && (
                                                        <PlusIcon
                                                            onClick={() =>
                                                                arrayHelpers.push(
                                                                    ""
                                                                )
                                                            }
                                                            className="w-8 h-5 hover:scale-110 mt-2 text-primary-500   transition   cursor-pointer"
                                                        />
                                                    )}

                                                    {index > 0 && (
                                                        <FaRegTrashAlt
                                                            title="Remover Vacina"
                                                            className="w-8 h-5 mt-2 hover:scale-110 text-primary-500 cursor-pointer"
                                                            onClick={() =>
                                                                arrayHelpers.remove(
                                                                    index
                                                                )
                                                            }
                                                            type="button"
                                                        />
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </>
                                )}
                            </FieldArray>
                        </div>
                    </ControlSwitch>
                </div>
                <div className="mt-2">
                    <ControlSwitch
                        label="Aplicar exame?"
                        className="mt-2 w-[3.72rem] h-6 lg:w-16 lg:h-7"
                    >
                        <div className="mt-2 flex flex-col">
                            <FieldArray name="exams">
                                {(arrayHelpers) => (
                                    <>
                                        {values?.exams?.map((exam, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2 justify-center items-center"
                                            >
                                                <ComboBoxAutocomplete
                                                    label={`Exame ${index + 1}`}
                                                    name={`exam${index}`}
                                                    items={exams}
                                                    //   onChange={handleComboboxSelect}
                                                />
                                                {index == 0 && (
                                                    <PlusIcon
                                                        onClick={() =>
                                                            arrayHelpers.push(
                                                                ""
                                                            )
                                                        }
                                                        className="w-8 h-5 hover:scale-110 mt-2 text-primary-500   transition   cursor-pointer"
                                                    />
                                                )}

                                                {index > 0 && (
                                                    <FaRegTrashAlt
                                                        title="Remover Vacina"
                                                        className="w-8 h-5 mt-2 hover:scale-110 text-primary-500 cursor-pointer"
                                                        onClick={() =>
                                                            arrayHelpers.remove(
                                                                index
                                                            )
                                                        }
                                                        type="button"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </>
                                )}
                            </FieldArray>
                        </div>
                    </ControlSwitch>
                </div>
                <div className="mt-2">
                    <ControlSwitch
                        label="Possui doença?"
                        className="mt-2 w-[3.72rem] h-6 lg:w-16 lg:h-7"
                    >
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="flex flex-col col-span-2">
                                <FieldArray name="diseases">
                                    {(arrayHelpers) => (
                                        <>
                                            {values?.diseases?.map(
                                                (disease, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-2 justify-center items-center "
                                                    >
                                                        <ComboBoxAutocomplete
                                                            label={`Doença ${
                                                                index + 1
                                                            }`}
                                                            name={`disease${index}`}
                                                            items={diseases}
                                                            //   onChange={handleComboboxSelect}
                                                        />
                                                        {index == 0 && (
                                                            <PlusIcon
                                                                onClick={() =>
                                                                    arrayHelpers.push(
                                                                        ""
                                                                    )
                                                                }
                                                                className="w-8 h-5 hover:scale-110 mt-2 text-primary-500   transition   cursor-pointer"
                                                            />
                                                        )}

                                                        {index > 0 && (
                                                            <FaRegTrashAlt
                                                                title="Remover Vacina"
                                                                className="w-8 h-5 mt-2 hover:scale-110 text-primary-500 cursor-pointer"
                                                                onClick={() =>
                                                                    arrayHelpers.remove(
                                                                        index
                                                                    )
                                                                }
                                                                type="button"
                                                            />
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </>
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
                        className="mt-2 w-[3.72rem] h-6 lg:w-16 lg:h-7"
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
                                    <select
                                        className="form-control"
                                        id="alimentacaoSelect"
                                        name="alimentacaoSelect"
                                    >
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
                            type="number"
                        />
                        <div className="flex flex-col mb-[6px] w-full">
                            <span className=" text-xs">Medida</span>
                            <select
                                className="form-control"
                                id="informacoesSelect"
                            >
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

            <div className="flex align-items-center justify-center gap-3 mt-4">
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
                    className="btn-label "
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    <span className="ml-1"> Próximo </span>
                    <i className="ri-arrow-right-line  align-middle fs-16  p-1"></i>
                </BtnSuccess>
            </div>
        </>
    );
};

export default StepTreatment;
