import { useField } from "formik";


import type { InputControlProps } from "./types";

import cn from 'classnames';
import { twMerge } from 'tailwind-merge';
import Input from "~/Components/atoms/input/input";
import Label from "~/Components/atoms/label";

const FieldControl = <T,>({
    label,
    children,
    required = false,
    component = Input,
    startIcon,
    startChildren,
    endIcon,
    separator = ':',
    disabledError = false,
    className,
    initialFocus = false,
    divClassName,
    ...props
}: InputControlProps<T>) => {

    const [inputProps, meta] = useField(props);
    const id = props.name || props.id;

    const InputComponent = component as any;

    const onChange = (e: any) => {
        props.onChange?.(e);
        inputProps.onChange(e);
    };

    return (
        <div className="w-full">
            <Label label={label} required={required} id={id} separator={separator} />
            <div className='relative'>
                {startIcon && (
                    <div className="absolute inset-y-0 flex items-center pl-1 text-sm text-gray-400 pointer-events-none left-1">
                        {startIcon}
                    </div>
                )}
                <InputComponent
                    id={id}
                    required={required}
                    data-testid={`input-${id}`}
                    className={
                        twMerge(
                            cn(
                                {
                                    'bg-slate-100': props.disabled,
                                    '!pl-8': startIcon,
                                    '!pr-8': endIcon,
                                },

                            ), className)
                    }
                    {...inputProps}
                    {...props}
                    onChange={onChange}
                />
                {endIcon && (
                    <div className={`absolute top-1/2 transform -translate-y-1/2 right-0 mr-2`}>
                        {endIcon}
                    </div>
                )}
            </div>
            {!meta.error && (
                <div className="pb-3" />
            )}

            {meta.error && (
                <div className="w-full text-xs text-center text-red-700">
                    {meta.error}
                </div>
            )}
        </div>
    );
};

export default FieldControl;
