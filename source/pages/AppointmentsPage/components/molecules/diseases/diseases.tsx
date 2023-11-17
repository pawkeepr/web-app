import { useFormikContext } from "formik";
import FieldControl from "~/Components/molecules/field-control/field-control";
import FieldTextArea from "~/Components/molecules/field-text-area";

import MenuMultipleSelection, { CardProps } from "~/Components/organism/menu-multiple-selection";
import { DISEASES } from "~/constants/treatment-items";

type Diseases = {
    value: string
    label: string
    color: string
    severity: string
    nameDisease: string
    typeDisease: string
    description: string
}


const CardDiseases = ({ label, index, name }: CardProps<Diseases>) => {
    return (
        <div className="grid grid-cols-2 gap-2 card card-body shadow-2xl rounded-sm">
            <h3 className="text-lg font-bold col-span-2 text-gray-600">
                {label}
            </h3>

            <div className="grid grid-cols-2 gap-2 col-span-full">
                <FieldControl
                    divClassName="col-span-1"
                    label="Tipo de doença"
                    name={`${name}.${index}.typeDisease`}
                />
                <FieldControl
                    divClassName="col-span-1"
                    label="Severidade"
                    name={`${name}.${index}.severity`}
                />
                <FieldTextArea
                    label="Descrição"
                    name={`${name}.${index}.description`}
                />
            </div>
        </div>
    )
}

const MenuSelection = () => {
    const { values } = useFormikContext<{ diseases: Diseases[] }>();

    return (
        <MenuMultipleSelection
            card={CardDiseases}
            options={DISEASES}
            name="diseases"
            label="Doenças Detectadas"
            items={values.diseases}
        />
    )
}

export default MenuSelection