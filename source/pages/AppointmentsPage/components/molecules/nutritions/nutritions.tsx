import { useFormikContext } from "formik";
import FieldControl from "~/Components/molecules/field-control/field-control";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";

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
            <h3 className="text-lg font-bold col-span-full text-gray-600">
                {label}
            </h3>
            <FieldControl
                divClassName="col-span-full"
                label="Horário que começa a alimentação"
                name={`nutritions[${index}].time_food`}
                type="text"
            />

            <FieldControl
                label="Quantidade Alimento"
                name={`nutritions[${index}].amount`}
                type="text"
            />
            <FieldControlSelect
                label="Medida"
                placeholder="Selecione..."
                name={`nutritions[${index}].measure`}
                options={[
                    {
                        value: "kilos",
                        label: "Kilo(s)",
                        color: 'rgb(255 200 107);',
                    },
                    {
                        value: "gramas",
                        label: "Grama(s)",
                        color: 'rgb(255 200 107);',
                    }
                ]}
            />
            <FieldControl
                label="Intervalo"
                name={`nutritions[${index}].interval`}
                type="text"
            />
            <FieldControlSelect
                label="Período"
                placeholder="Selecione..."
                name={`nutritions[${index}].period`}
                options={[
                    {
                        value: "hours",
                        label: "Hora(s)",
                        color: 'rgb(255 200 107);',
                    },
                    {
                        value: "days",
                        label: "Dia",
                        color: 'rgb(255 200 107);',
                    },
                    {
                        value: "months",
                        label: "Mes(es)",
                        color: 'rgb(255 200 107);',
                    },
                    {
                        value: "years",
                        label: "Ano",
                        color: 'rgb(255 200 107);',
                    }
                ]}
            />
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