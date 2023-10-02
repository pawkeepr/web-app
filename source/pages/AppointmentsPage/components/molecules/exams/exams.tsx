import { useFormikContext } from "formik";

import MenuMultipleSelection, { CardProps } from "~/Components/organism/menu-multiple-selection";

type Exams = {
    value: string
    label: string
    color: string
}


const CardExams = ({ label, index, name }: CardProps<Exams>) => {
    return (
        <div className="grid grid-cols-2 gap-2 card card-body shadow-2xl rounded-sm">
            <h3 className="text-lg font-bold col-span-2 text-gray-600">
                {label}
            </h3>

        </div>
    )
}

const MenuSelection = () => {
    const { values } = useFormikContext<{ exams: Exams[] }>();

    return (
        <MenuMultipleSelection
            card={CardExams}
            options={[{
                value: "1",
                label: "Exames",
                color: 'rgb(255 200 107);',
            }]}
            name="Exams"
            label="Exames"
            items={values.exams}
        />
    )
}

export default MenuSelection