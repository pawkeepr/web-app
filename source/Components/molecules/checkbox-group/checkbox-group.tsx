import { useField } from 'formik';
import { useState } from 'react';
import Checkbox from '~/Components/atoms/checkbox';

import Label from '~/Components/atoms/label';

type Item = {
    label: string;
    value: any;
};

interface CheckboxGroupProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    items: Item[];
    name: string;
    label: string;
    required?: boolean;
    disabledError?: boolean;
    divClassName?: string;
}

export default function CheckboxGroup<T>({
    items = [],
    name,
    label,
    required,
    className,
    id,
    disabledError,
    divClassName,
    ...rest
}: CheckboxGroupProps<T>) {
    const [field, meta, helpers] = useField(name);

    const { setValue } = helpers;

    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    function setCheckboxValue(name: string) {
        if (!checkedValues.includes(name)) {
            return setCheckedValues((values) => {
                const result = [...values, name];
                setValue(result);
                return result;
            });
        }

        setCheckedValues((values) => {
            const result = values.filter((element) => element !== name);
            setValue(result);
            return result;
        });
    }

    return (
        <div className={divClassName}>
            <Label label={label} required={required} id={id} separator=":" />
            <div className="flex items-center justify-center">
                {items.map((item, index) => (
                    <div
                        className="flex flex-row items-center justify-center"
                        key={index}
                    >
                        <Checkbox
                            id={item.value}
                            type="checkbox"
                            checked={checkedValues.includes(item.value)}
                            {...field}
                            onChange={() => setCheckboxValue(item.value)}
                        />
                        <Label htmlFor={item.value} label={item.label} />
                    </div>
                ))}
            </div>
        </div>
    );
}
