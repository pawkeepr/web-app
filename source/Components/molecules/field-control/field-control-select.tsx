import { useFormikContext } from "formik";

import { useCallback, useEffect } from "react";
import { Props } from 'react-select';
import Label from "~/Components/atoms/label";
import Select from "~/Components/atoms/select";
import type { InputControlProps } from "./types";

type Option = {
    value: string | number;
    label: string;
    [key: string]: any;
}

type FieldSelectControl = InputControlProps<Props> & {
    name: string
    deps?: any[]
    onChangeValue?: (item: any) => void;
    options?: Option[]
}

const FieldControlSelect = ({
    label,
    required = false,
    className,
    name,
    divClassName,
    options = [],
    onChangeValue = () => { },
    ...props
}: FieldSelectControl) => {
    const { values, setFieldValue, } = useFormikContext<any>();

    useEffect(() => {

        const item = options.find((option: Option) => option?.value === values?.[name]?.value)

        if (!item && values?.[name]?.value) {
            setFieldValue(
                name,
                null,
            )

            return
        }

        if (!item) return

        setFieldValue(
            name,
            item,
        )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options])

    const onChange = useCallback(
        (option: any) => {
            onChangeValue?.(option);
            setFieldValue(name, option, true);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setFieldValue]
    );

    return (
        <div className={divClassName}>
            <Label label={label} required={required} id={name} separator={':'} />
            <Select
                {...props}
                id={name}
                required={required}
                className={ required ? 'border-secondary-500' : '' }
                options={options}
                name={name}
                onChange={onChange}
                value={values?.[name]}
            />
        </div>
    );
};

export default FieldControlSelect;
