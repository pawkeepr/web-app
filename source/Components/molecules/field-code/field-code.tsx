import { useField } from "formik";

import InputCode from "~/Components/atoms/input-code";

import { FieldHookConfig } from "formik";

type InputFieldProps<T> = FieldHookConfig<string> & T & {
    [key: string]: any
    label?: string;
    name: string;
    required?: boolean;
    moveToNext?: (index: number) => void;
    component?: (...args: any[]) => JSX.Element;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FieldCode = <T,>({
    label,
    required = false,
    component = InputCode as any,
    className,
    moveToNext,
    ...props
}: InputFieldProps<T>) => {

    const [inputProps, meta] = useField(props);
    const id = props.name || props.id;

    const InputComponent = component as any;

    const onChange = (e: any) => {
        props.onChange?.(e);
        inputProps.onChange(e);
    };

    return (
        <InputComponent
            id={id}
            required={required}
            data-testid={`input-code-${id}`}
            moveToNext={moveToNext}
            {...inputProps}
            {...props}
            onChange={onChange}
        />
    );
};

export default FieldCode;
