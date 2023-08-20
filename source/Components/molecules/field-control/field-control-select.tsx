import { useFormikContext } from "formik";

import { useCallback, useEffect } from "react";
import { Props } from 'react-select';
import Label from "~/Components/atoms/label";
import Select from "~/Components/atoms/select";
import type { InputControlProps } from "./types";


type FieldSelectControl = Props & InputControlProps & {
    name: string
    onChangeValue?: (item: any) => void;
    options?: Array<{
        value: string;
        label: string;
    }>
}

const FieldControlSelect = ({
    label,
    children,
    required = false,
    isMulti = false,
    startChildren,
    className,
    name,
    divClassName,
    options = [],
    onChangeValue = () => { },
    ...props
}: FieldSelectControl) => {
    const { values, setFieldValue, } = useFormikContext<any>();

    useEffect(() => {

        const item = options.find((option) => option?.value === values[name])

        setFieldValue(
            name,
            item,
        )
    }, [])

    const onChange = useCallback(
        option => {
            onChangeValue?.(option);
            setFieldValue(name, option, true);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setFieldValue]
    );

    return (
        <div className={divClassName}>
            <Label label={label} required={required} id={props.name} separator={':'} />
            {startChildren}
            <Select
                {...props}
                id={props.name}
                className="w-full"
                isMulti={isMulti}
                options={options}
                name={props.name}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FieldControlSelect;
