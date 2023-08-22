
import { useField } from "formik";
import Checkbox from "~/Components/atoms/checkbox";
import Label from "~/Components/atoms/label";
import { InputControlProps } from '../field-control/types';

type FieldCheckboxProps<T> = {
    label: string | JSX.Element;
    name: string;
} & InputControlProps<T>;

const FieldCheckbox = <T,>({
    label,
    name,
    ...rest
}: FieldCheckboxProps<T>) => {

    const [field, meta] = useField(name);

    return (
        <div className="flex items-center justify-center ">
            <Checkbox
                {...rest}
                {...field}
                checked={field.value}
            />
            <Label htmlFor={field.name} label={label} />
        </div>
    );
};


export default FieldCheckbox;