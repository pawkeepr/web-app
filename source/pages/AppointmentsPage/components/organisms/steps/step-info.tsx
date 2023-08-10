import { BtnLabel, BtnSuccess } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control/field-control"
import { StepProps } from "./types";
import ControlSwitch from "../../molecules/switch/switch";
import { FieldArray, useFormikContext } from "formik";
import ComboBoxAutocomplete from "~/Components/molecules/combo-box-autocomplete/combo-box-autocomplete";
import { BsFillTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import { InitialValues } from "~/pages/AppointmentsPage/Appointments";

const StepInfo = ({ toggleTab, activeTab }: StepProps) => {
    const { values, setFieldValue, errors } = useFormikContext<InitialValues>();


    return (
        <>
        <div>
            <h4 className="text-center">Info Bem-Estar</h4>
        </div><div className="mt-4">
                <span className="font-bold">Informações Obrigatórias</span>
                <div className="flex items-center mt-2 gap-2 w-full">
                    <FieldControl
                        label="Peso"
                        className="rounded-md form-control font-semibold "
                        name="weight"
                        type="number" />
                    <div className="flex flex-col mb-[6px] w-full">
                        <span className=" text-xs">Medida:</span>
                        <select
                            className="form-control mt-2 border-2"
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
                        type="text" />
                </div>
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
                                                                    <span className="text-xs mt-2">
                                                                        Medida
                                                                    </span>
                                                                    <select
                                                                        className="form-control border-gray-200 border-2"
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
                                                                    <span className=" text-xs mt-2">
                                                                        Período
                                                                    </span>
                                                                    <select
                                                                        className="form-control border-2 border-gray-200"
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
    )
 }

export default StepInfo