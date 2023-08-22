
import { useField } from "formik";
import Input from "~/Components/atoms/input";

type FieldCheckboxProps = {
    label: string | JSX.Element;
    name: string;
}

const FieldCheckbox = ({ label, name }: FieldCheckboxProps) => {

    const [field, meta] = useField(name);

    return (
        <div className="flex items-center justify-center ">
            <Input
                className="
                !w-4 h-4 px-0 py-0 mx-1 rounded-none 
                focus:!ring-0 border !border-primary-500
                 active:bg-secondary-500 text-primary-500
            "
                type="checkbox"
                {...field}
                checked={field.value}
                name={name}
            />
            <label htmlFor={name} className="pt-2 ml-2 text-xs italic text-gray-700">
                {label}
            </label>
        </div>
    );
};

export default FieldCheckbox;