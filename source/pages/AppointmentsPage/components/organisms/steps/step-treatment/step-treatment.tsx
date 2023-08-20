import { useState } from "react";
import ControlSwitch from "../../../molecules/switch";

//Import images

import { StepProps } from "../types";

import { FieldArray, useFormikContext } from "formik";
import { BtnLabel, BtnPrimary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control/field-control";
import { diseases } from "~/common/data/diseases";
import { exams } from "~/common/data/exams";
import { vaccines } from "~/common/data/vaccines";
import { InitialValues } from "~/pages/AppointmentsPage/Appointments";

import { BsFillTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import ComboBoxAutocomplete from "~/Components/molecules/combo-box-autocomplete";

import Select from "react-select";
import { colorStyles } from "~/Components/molecules/field-control/field-control-select-mult";

const StepTreatment = ({ toggleTab, activeTab }: StepProps) => {
    const { values, setFieldValue, errors } = useFormikContext<InitialValues>();
    const [enableField, setEnableField] = useState<boolean>(true);
    const avaliation = ['Limpeza bucal', 'Retirada de tártaro', 'Extração', 'Canal', 'Aplicação de anti-inflamatório', 'Aplicação de polivitamínicos', 'Aplicação de Prótese', 'Aplicação de resina']

    const handleClick = () => {
        enableField === true ? setEnableField(false) : setEnableField(true);
    };

    // const handleComboboxSelect = (selected: string) => {
    //     setFieldValue('selectedValue', selected);
    //     console.log(selected);
    // };
    const options = avaliation.map((item) => ({
        value: item,
        label: item,
        color: 'rgb(255 200 107);',
    }));

    return (
        <>
            <div>
                <h4 className="text-center">Tratamento</h4>
            </div>

            <div className="">
                <div className="mt-2">
                    <ControlSwitch
                        label="Aplicar Medicação?"
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
                                                                label={`Nome do Medicamento ${index + 1
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
                                                                label={`Marca ${index + 1
                                                                    }`}
                                                                className=" "
                                                                name={`medicine[${index}].brand`}
                                                                type="text"
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <FieldControl
                                                                    label={`Inicio ${index +
                                                                        1
                                                                        }`}
                                                                    className=" "
                                                                    name={`medicine[${index}].date_init`}
                                                                    type="date"
                                                                />
                                                            </div>

                                                            {enableField ==
                                                                true ? (
                                                                <div className="">
                                                                    <FieldControl
                                                                        label={`Fim ${index +
                                                                            1
                                                                            }`}
                                                                        className=" "
                                                                        name={`medicine[${index}].date_end`}
                                                                        type="date"
                                                                    />
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                        <div className="flex items-center justify-center gap-2 w-full col-span-2">
                                                            <div>
                                                                <FieldControl
                                                                    label={`Quantidade ${index +
                                                                        1
                                                                        }`}
                                                                    className=" "
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
                                                                    className="  "
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
                                                                className="  w-full "
                                                                name={`medicine[${index}].interval`}
                                                                type="text"
                                                            />
                                                            <div className="flex w-full gap-2 justify-center items-center col-span-2 ">
                                                                <div className="flex flex-col w-full mb-[6px]">
                                                                    <span className=" font-bold text-xs">
                                                                        Período
                                                                    </span>
                                                                    <select
                                                                        className=" "
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
                                                        label={`Vacina ${index + 1
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
                                                                label={`Doença ${index + 1
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
                                                                    label={`Tipo de doença ${index +
                                                                        1
                                                                        }`}
                                                                    className="rounded-md  "
                                                                    name={`diseases.${index}.typeDisease`}
                                                                    type="text"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <FieldControl
                                                                    label={`Severidade ${index +
                                                                        1
                                                                        }`}
                                                                    className="rounded-md  "
                                                                    name={`diseases.${index}.severity`}
                                                                    type="text"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col col-span-2">
                                                                <FieldControl
                                                                    label={`Descrição ${index +
                                                                        1
                                                                        }`}
                                                                    className="rounded-md  "
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
                    <ControlSwitch
                        label="Tratamento dentário?"
                        className="mt-2 w-[3.72rem] h-6 lg:w-16 lg:h-7 "
                    >
                        <FieldControl
                            label='Motivo da consulta:'
                            placeholder="Descrição do motivo pelo qual o pet está sendo levado ao dentista.
                            Quaisquer sintomas ou problemas específicos que o tutor tenha notado."
                            className=" "
                            name="Description"
                            type="text"
                        />
                        <FieldControl
                            label='Exame bucal:'
                            placeholder="Avaliação completa da saúde bucal do pet, incluindo exame dos dentes, gengivas, língua, etc.
                            Detalhes sobre problemas dentários, como tártaro, cáries, inflamações, etc."
                            className=" "
                            name="Description"
                            type="text"
                        />
                        <p className="mt-2">Tratamentos realizados:</p>
                        <Select
                            className="w-full mb-3"
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'rgb(9, 178, 133);',
                                    primary: 'rgb(9, 178, 133);',
                                },
                            })}
                            styles={colorStyles}
                            placeholder="Selecione uma ou mais atividades"
                            isSearchable={true}
                            isMulti
                            name="activity"
                            options={options}
                        />
                        <div className="flex flex-col mt-2">
                            <FieldControl
                                label="Recomendações e orientações:"
                                className="rounded-md  "
                                component="textarea"
                                name="observations"
                                type="text" />
                        </div>
                    </ControlSwitch>
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
                <BtnPrimary
                    type="button"
                    className="btn-label "
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    <span className="ml-1"> Próximo </span>
                    <i className="ri-arrow-right-line  align-middle fs-16  p-1"></i>
                </BtnPrimary>
            </div>
        </>
    );
};

export default StepTreatment;
