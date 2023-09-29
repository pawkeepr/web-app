import { useFormikContext } from "formik";
import FieldControl from "~/Components/molecules/field-control/field-control";

import MenuMultipleSelection, { CardProps } from "~/Components/organism/menu-multiple-selection/menu-multiple-selection";

type Nutrition = {
    value: string
    label: string
    color: string
    time_food: string
    amount: string
    measure: string
    interval: string
    period: string
}


const CardNutrition = ({ label, index }: CardProps<Nutrition>) => {
    return (
        <div className="grid grid-cols-2 gap-2 card card-body shadow-2xl rounded-sm">
            <h3 className="text-lg font-bold col-span-2 text-gray-600">
                {label}
            </h3>
            <div className="flex flex-col col-span-2">
                <FieldControl
                    label={`Horário que começa a alimentação ${index +
                        1
                        }`}
                    name={`nutritions[${index}].time_food`}
                    type="text"
                />
            </div>

            <div className="flex  w-full items-center gap-2 col-span-2 ">
                <FieldControl
                    label={`Quantidade Alimento ${index +
                        1
                        }`}
                    name={`nutritions[${index}].amount`}
                    type="text"
                />
                <div className="flex flex-col mb-[6px] w-full">
                    <span className="text-xs mt-2">
                        Medida
                    </span>
                    <select
                        className="  border-gray-200 border-2"
                        name={`nutritions[${index}].measure`}
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
                    label={`Intervalo ${index +
                        1
                        }`}
                    name={`nutritions[${index}].interval`}
                    type="text"
                />
                <div className="flex flex-col w-full mb-[6px]">
                    <span className=" text-xs mt-2">
                        Período
                    </span>
                    <select
                        className="  border-2 border-gray-200"
                        name={`nutritions[${index}].period`}
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
    )
}

const MenuSelectionsNutritions = () => {
    const { values } = useFormikContext<{ nutritions: Nutrition[] }>();

    return (
        <MenuMultipleSelection
            card={CardNutrition}
            options={[
                {
                    value: "raçao",
                    label: "Raçao",
                    color: 'rgb(255 200 107);',
                },
                {
                    value: "carne",
                    label: "Carne",
                    color: 'rgb(255 200 107);',
                },
                {
                    value: "frango",
                    label: "Frango",
                    color: 'rgb(255 200 107);',
                }
            ]}
            name="nutritions"
            label="Nome do Alimento"
            items={values.nutritions}
        />
    )
}

export default MenuSelectionsNutritions