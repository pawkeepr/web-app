import { useFormikContext } from "formik";
import FieldControl from "~/Components/molecules/field-control/field-control";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";

import MenuMultipleSelection, { CardProps } from "~/Components/organism/menu-multiple-selection";
import { MEDICINES } from "~/constants/treatment-items";

type Medicines = {
    value: string
    label: string
    color: string
    name_medicine: string
    brand: string
    date_init: string
    date_end: string
    amount: string
    interval: string
    period: string
}


const CardMedicines = ({ label, index, name }: CardProps<Medicines>) => {
    return (
        <div className="grid grid-cols-2 gap-2 card card-body shadow-2xl rounded-sm">
            <h3 className="text-lg font-bold col-span-2 text-gray-600">
                {label}
            </h3>

            <FieldControl
                divClassName="col-span-full"
                label="Marca"
                className="form-control"
                name={`${name}[${index}].brand`}
                type="text"
            />

            <FieldControl
                label="Inicio"
                className="form-control"
                name={`${name}[${index}].date_init`}
                type="date"
            />

            <FieldControl
                label="Fim"
                className="form-control"
                name={`${name}[${index}].date_end`}
                type="date"
            />

            <div className="gap-2 col-span-full grid-cols-2 grid">
                <FieldControl
                    label="Quantidade"
                    name={`${name}[${index}].amount`}
                />
                <FieldControlSelect
                    label="Tipo"
                    name={`${name}[${index}].type_medicine`}
                    options={[
                        {
                            value: "pill",
                            label: "Comprimido(s)",
                        },
                        {
                            value: "drops",
                            label: "Gota(s)",
                        },
                        {
                            value: "ml",
                            label: "ML",
                        },
                        {
                            value: "mg",
                            label: "MG",
                        },
                        {
                            value: "grams",
                            label: "Grama(s)",
                        },
                        {
                            value: "dose",
                            label: "Dose(s)",
                        },
                    ]}
                />
            </div>
            <div className="grid grid-cols-2 col-span-full gap-2">
                <FieldControl
                    label="Intervalo"
                    name={`${name}[${index}].interval`}
                />
                <FieldControlSelect
                    label="Periodo"
                    name={`${name}[${index}].period`}
                    options={[
                        {
                            value: "day",
                            label: "Dia(s)",
                        },
                        {
                            value: "week",
                            label: "Semana(s)",
                        },
                        {
                            value: "month",
                            label: "Mês(es)",
                        },
                        {
                            value: "year",
                            label: "Ano(s)",
                        },
                    ]}
                />
            </div>
        </div>
    )
}

const MenuSelection = () => {
    const { values } = useFormikContext<{ medicines: Medicines[] }>();

    return (
        <MenuMultipleSelection
            card={CardMedicines}
            options={MEDICINES}
            name="medicines"
            label="Medicação"
            items={values.medicines}
        />
    )
}

export default MenuSelection