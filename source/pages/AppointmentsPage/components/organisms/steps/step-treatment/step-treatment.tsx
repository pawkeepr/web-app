import { useState } from "react";
import ControlSwitch from "../../../molecules/switch/switch";

//Import images

import { StepProps } from "../types";

import { FieldArray, useFormikContext, ErrorMessage, Field } from "formik";
import { BtnAvatar, BtnLabel, BtnSuccess } from "~/Components/atoms/btn";
import { InitialValues } from "~/pages/AppointmentsPage/Appointments";
import AvatarPet from "../../../atoms/pet-avatar/pet-avatar";
import FieldControl from "~/Components/molecules/field-control/field-control";
import { tests } from "~/common/data/tests";
import { exams } from "~/common/data/exams";
import { vaccines } from "~/common/data/vaccines";
import { diseases } from "~/common/data/diseases";


import ComboBoxAutocomplete from "~/Components/molecules/combo-box-autocomplete";
import { BsPlusCircleFill } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";

const StepTreatment = ({ toggleTab, activeTab }: StepProps) => {
    const { values, setFieldValue, errors } = useFormikContext<InitialValues>();
    const [enableField, setEnableField] = useState<boolean>(true);

    const handleClick = () => {
        enableField === true ? setEnableField(false) : setEnableField(true);
    };

    return (
        <>
            <div>
                <h4 className="text-center">Tratamento</h4>
            </div>
            <div className="mt-2">
                    <ControlSwitch
                        label="Testes rápidos"
                        className="mt-2 w-[3.72rem] h-6 lg:w-16 lg:h-7"
                    >
                        <div className="mt-2">
                        <ComboBoxAutocomplete
                            label={`Tipos de testes `}
                                name={`typeTest`}
                                items={tests}
                            />
                          </div>
                        <div>
                            <FieldControl
                                label = {`Resultado do teste `}
                                    className= "form-control"
                                    name= {`testsResult`}
                                    type="text"
                                />
                            
                            <FieldControl
                                label = {`Comentários adicionais sobre o teste`}
                                className= "form-control"
                                name= {`testsComments`}
                                type="text"
                            />
                        </div>
                </ControlSwitch>
            </div>
            <div className="">
                <div className="mt-2">
                    <ControlSwitch
                        label="Aplicar Medicação"
                        className="mt-2 w-[3.72rem] h-6 lg:w-16 lg:h-7 "
                    >
                        <div className="flex flex-col lg:flex-row mt-2 ">
                            <ControlSwitch
                                label="Uso Contínuo?"
                                className="w-[3.72rem] h-6 lg:w-16 lg:h-7"
                                onClick={handleClick}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col col-span-2">
                                <FieldArray name="medicines">
                                    {(arrayHelpers) => (
                                        <>
                                            {values.medicines?.map(
                                                (medicine, index) => (
                                                    <>
                                                        <div
                                                            key={index}
                                                            className="flex gap-2   items-center col-span-2  "
                                                        >
                                                            <ComboBoxAutocomplete
                                                                label={`Nome do Medicamento ${
                                                                    index + 1
                                                                }`}
                                                                name={`medicine[${index}].name_medicine`}
                                                            />

                                                            <button
                                                                type="button"
                                                                // disabled={
                                                                //     !values
                                                                //         ?.medicines[
                                                                //         index
                                                                //     ]
                                                                //         .name_medicine ||
                                                                //     !values
                                                                //         .medicines[
                                                                //         index
                                                                //     ].brand ||
                                                                //     !values
                                                                //         .medicines[
                                                                //         index
                                                                //     ]
                                                                //         .date_init ||

                                                                // }
                                                                onClick={() =>
                                                                    arrayHelpers.push(
                                                                        {
                                                                            name_medicine:
                                                                                "",
                                                                            brand: "",
                                                                            date_init:
                                                                                "",
                                                                            date_end:
                                                                                "",
                                                                            amount: "",
                                                                            type_medicine:
                                                                                "",
                                                                            interval:
                                                                                "",
                                                                            period: "",
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <BsPlusCircleFill
                                                                    title="Adicionar Vacina"
                                                                    className="w-8 h-5 hover:scale-110 mt-2 text-secondary-500    transition   cursor-pointer"
                                                                />
                                                            </button>

                                                            {index > 0 && (
                                                                <BsFillTrash3Fill
                                                                    title="Remover Vacina"
                                                                    className="w-8 h-5 mt-2 hover:scale-110 text-red-500 cursor-pointer"
                                                                    onClick={() =>
                                                                        arrayHelpers.remove(
                                                                            index
                                                                        )
                                                                    }
                                                                    type="button"
                                                                />
                                                            )}
                                                        </div>

                                                        <div className="flex flex-col col-span-2">
                                                            <FieldControl
                                                                label={`Marca ${
                                                                    index + 1
                                                                }`}
                                                                className="form-control"
                                                                name={`medicine[${index}].brand`}
                                                                type="text"
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <FieldControl
                                                                    label={`Inicio ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="form-control"
                                                                    name={`medicine[${index}].date_init`}
                                                                   type="date"
                                                                />
                                                            </div>

                                                            {enableField ==
                                                            true ? (
                                                                <div className="">
                                                                    <FieldControl
                                                                        label={`Fim ${
                                                                            index +
                                                                            1
                                                                        }`}
                                                                        className="form-control"
                                                                        name={`medicine[${index}].date_end`}
                                                                       type="date"
                                                                    />
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                        <div className="flex items-center justify-center gap-2 w-full col-span-2">
                                                            <div>
                                                                <FieldControl
                                                                    label={`Quantidade ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="form-control"
                                                                    name={`medicine[${index}].amount`}
                                                                    type="text"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col mb-[6px] w-full">
                                                                <span className=" text-xs font-bold">
                                                                    Tipo
                                                                    {index + 1}
                                                                </span>
                                                                <select
                                                                    className="form-control "
                                                                    name={`medicine[${index}]type_medicine`}
                                                                >
                                                                    <option value="pill">
                                                                        Comprimido(s)
                                                                    </option>
                                                                    <option value="drops">
                                                                        Gota(s)
                                                                    </option>
                                                                    <option value="ml">
                                                                        ML
                                                                    </option>
                                                                    <option value="mg">
                                                                        MG
                                                                    </option>
                                                                    <option value="grams">
                                                                        Grama(s)
                                                                    </option>
                                                                    <option value="dose">
                                                                        Dose(s)
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-center gap-2 w-full col-span-2">
                                                            <FieldControl
                                                                label={`Intervalo ${+1}`}
                                                                className="form-control w-full "
                                                                name={`medicine[${index}].interval`}
                                                                type="text"
                                                            />
                                                            <div className="flex w-full gap-2 justify-center items-center col-span-2 ">
                                                                <div className="flex flex-col w-full mb-[6px]">
                                                                    <span className=" font-bold text-xs">
                                                                        Período
                                                                    </span>
                                                                    <select
                                                                        className="form-control"
                                                                        name={`medicine[${index}].period`}
                                                                    >
                                                                        <option value="hours">
                                                                            Hora(s)
                                                                        </option>
                                                                        <option value="days">
                                                                            Dia
                                                                        </option>
                                                                        <option value="months">
                                                                            Mes(es)
                                                                        </option>
                                                                        <option value="years">
                                                                            Ano
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            )}
                                        </>
                                    )}
                                </FieldArray>
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
                                                        label={`Vacino ${
                                                            index + 1
                                                        }`}
                                                        name={`vaccine${index}`}
                                                        items={vaccines}
                                                        //   onChange={handleComboboxSelect}
                                                    />
                                                    {index == 0 && (
                                                        <button
                                                            type="button"
                                                            // disabled={
                                                            //    values?.vaccines[index]
                                                            //       .length == 0
                                                            // }
                                                            onClick={() =>
                                                                arrayHelpers.push(
                                                                    ""
                                                                )
                                                            }
                                                        >
                                                            <BsPlusCircleFill
                                                                title="Adicionar Vacina"
                                                                className="w-8 h-5 hover:scale-110 mt-2 text-secondary-500    transition   cursor-pointer"
                                                            />
                                                        </button>
                                                    )}

                                                    {index > 0 && (
                                                        <BsFillTrash3Fill
                                                            title="Remover Vacina"
                                                            className="w-8 h-5  mt-2 hover:scale-110 text-red-500  cursor-pointer"
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

                                                <button
                                                    type="button"
                                                    // disabled={
                                                    //     !values?.exams[index]
                                                    // }
                                                    onClick={() =>
                                                        arrayHelpers.push("")
                                                    }
                                                >
                                                    <BsPlusCircleFill
                                                        title="Adicionar Vacina"
                                                        className="w-8 h-5 hover:scale-110 mt-2 text-secondary-500    transition   cursor-pointer"
                                                    />
                                                </button>

                                                {index > 0 && (
                                                    <BsFillTrash3Fill
                                                        title="Remover Vacina"
                                                        className="w-8 h-5 mt-2 hover:scale-110 text-red-500 cursor-pointer"
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
                                            {values.diseases?.map(
                                                (disease, index) => (
                                                    <>
                                                        <div
                                                            key={index}
                                                            className="flex gap-2 justify-center items-center "
                                                        >
                                                            <ComboBoxAutocomplete
                                                                label={`Doença ${
                                                                    index + 1
                                                                }`}
                                                                name={`diseases[${index}].name`}
                                                                items={diseases}
                                                            />

                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    !values
                                                                        ?.diseases[
                                                                        index
                                                                    ].name ||
                                                                    !values
                                                                        .diseases[
                                                                        index
                                                                    ].severity
                                                                }
                                                                onClick={() =>
                                                                    arrayHelpers.push(
                                                                        {
                                                                            name: "",
                                                                            typeDisease:
                                                                                "",
                                                                            severity:
                                                                                "",
                                                                            description:
                                                                                "",
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <BsPlusCircleFill
                                                                    title="Adicionar Vacina"
                                                                    className="w-8 h-5 hover:scale-110 mt-2 text-secondary-500    transition   cursor-pointer"
                                                                />
                                                            </button>

                                                            {index > 0 && (
                                                                <BsFillTrash3Fill
                                                                    title="Remover Vacina"
                                                                    className="w-8 h-5 mt-2 hover:scale-110 text-red-500 cursor-pointer"
                                                                    onClick={() =>
                                                                        arrayHelpers.remove(
                                                                            index
                                                                        )
                                                                    }
                                                                    type="button"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="flex flex-col">
                                                                <FieldControl
                                                                    label={`Tipo de doença ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="rounded-md form-control"
                                                                    name={`diseases.${index}.typeDisease`}
                                                                    type="text"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <FieldControl
                                                                    label={`Severidade ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="rounded-md form-control"
                                                                    name={`diseases.${index}.severity`}
                                                                    type="text"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col col-span-2">
                                                                <FieldControl
                                                                    label={`Descrição ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="rounded-md form-control"
                                                                    component="textarea"
                                                                    name={`diseases.${index}.description`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            )}
                                        </>
                                    )}
                                </FieldArray>
                            </div>
                        </div>
                    </ControlSwitch>
                </div>
                <div className="mt-2">
                    <ControlSwitch
                        label="Aplicar nutrição alimentar?"
                        className="mt-2 w-[3.72rem] h-6 lg:w-16 lg:h-7"
                    >
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col col-span-2 w-full">
                                <FieldArray name="nutritions">
                                    {(arrayHelpers) => (
                                        <>
                                            {values.nutritions?.map(
                                                (nutrition, index) => (
                                                    <>
                                                        <div
                                                            key={index}
                                                            className="flex gap-2   items-center col-span-2  "
                                                        >
                                                            <ComboBoxAutocomplete
                                                                label={`Nome do Alimento ${
                                                                    index + 1
                                                                }`}
                                                                name={`nutrition[${index}].food_name`}
                                                            />

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    arrayHelpers.push(
                                                                        {
                                                                            food_name:
                                                                                "",
                                                                            food_start_time:
                                                                                "",
                                                                            amount: "",
                                                                            measure:
                                                                                "",
                                                                            interval:
                                                                                "",
                                                                            period: "",
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <BsPlusCircleFill
                                                                    title="Adicionar nutrição alimentar"
                                                                    className="w-8 h-5 hover:scale-110 mt-2 text-secondary-500    transition   cursor-pointer"
                                                                />
                                                            </button>

                                                            {index > 0 && (
                                                                <BsFillTrash3Fill
                                                                    title="Remover Vacina"
                                                                    className="w-8 h-5 mt-2 hover:scale-110 text-red-500 cursor-pointer"
                                                                    onClick={() =>
                                                                        arrayHelpers.remove(
                                                                            index
                                                                        )
                                                                    }
                                                                    type="button"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="flex flex-col col-span-2">
                                                                <FieldControl
                                                                    label={`Horário que começa a alimentação ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="rounded-md form-control"
                                                                    name={`nutrition[${index}].time_food`}
                                                                    type="text"
                                                                />
                                                            </div>

                                                            <div className="flex  w-full items-center gap-2 col-span-2 ">
                                                                <FieldControl
                                                                    label={`Quantidade Alimento ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="rounded-md form-control"
                                                                    name={`nutrition[${index}].amount`}
                                                                    type="text"
                                                                />
                                                                <div className="flex flex-col mb-[6px] w-full">
                                                                    <span className=" text-xs font-bold">
                                                                        Medida
                                                                    </span>
                                                                    <select
                                                                        className="form-control"
                                                                        name={`nutrition[${index}].measure`}
                                                                    >
                                                                        <option value="kilos">
                                                                            Kilo(s)
                                                                        </option>
                                                                        <option value="gramas">
                                                                            Grama(s)
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-center gap-2 col-span-2">
                                                                <FieldControl
                                                                    label={`Intervalo ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="rounded-md form-control"
                                                                    name={`nutrition[${index}].interval`}
                                                                    type="text"
                                                                />
                                                                <div className="flex flex-col w-full mb-[6px]">
                                                                    <span className=" text-xs font-bold">
                                                                        Período
                                                                    </span>
                                                                    <select
                                                                        className="form-control"
                                                                        name={`nutrition[${index}].period`}
                                                                    >
                                                                        <option value="hours">
                                                                            Hora(s)
                                                                        </option>
                                                                        <option value="days">
                                                                            Dia
                                                                        </option>
                                                                        <option value="months">
                                                                            Mes(es)
                                                                        </option>
                                                                        <option value="years">
                                                                            Ano
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            )}
                                        </>
                                    )}
                                </FieldArray>
                            </div>
                        </div>
                    </ControlSwitch>
                </div>
                <div className="mt-4">
                    <span className="font-bold">Informações Obrigatórias</span>
                    <div className="flex items-center mt-2 gap-2 w-full">
                        <FieldControl
                            label="Peso"
                            className="rounded-md form-control font-semibold "
                            name="weight"
                            type="number"
                        />
                        <div className="flex flex-col mb-[6px] w-full">
                            <span className=" text-xs font-bold ">Medida</span>
                            <select
                                className="form-control"
                                name="measureWeight"
                            >
                                <option value="kg">Kilogramas</option>
                                <option value="g">Gramas</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col mt-2">
                        <FieldControl
                            label="Orientações e Anotações"
                            className="rounded-md form-control"
                            component="textarea"
                            name="observations"
                            type="text"
                        />
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
