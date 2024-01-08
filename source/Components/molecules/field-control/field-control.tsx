import { useField } from 'formik';

import type { InputControlProps } from './types';

import cn from 'classnames';
import { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import Input from '~/Components/atoms/input/input';
import Label from '~/Components/atoms/label';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const FieldControl = <T, Ctx = any>({
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
    onChange: onChangeDefault,
    ...props
}: InputControlProps<T, Ctx>) => {
    const [inputProps, meta] = useField(props.name as string);
    const id = props.name || props.id;

    const InputComponent = component as JSX.ElementType;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeDefault?.(e);
        inputProps.onChange(e);
    };

    return (
        <div className={twMerge('w-full', divClassName)}>
            <Label
                label={label}
                required={required}
                id={id as string}
                separator={separator as string}
            />
            <div className="relative">
                {startIcon && (
                    <div className="absolute inset-y-0 flex items-center pl-1 text-sm text-gray-400 pointer-events-none left-1">
                        {startIcon}
                    </div>
                )}
                <InputComponent
                    id={id}
                    required={required}
                    data-testid={`input-${id}`}
                    className={twMerge(
                        cn({
                            'border-secondary-500': required,
                            'bg-slate-100': props.disabled,
                            '!pl-8': startIcon,
                            '!pr-8': endIcon,
                        }),
                        className,
                    )}
                    {...inputProps}
                    {...props}
                    onChange={onChange}
                />
                {endIcon && (
                    <div className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-2">
                        {endIcon}
                    </div>
                )}
            </div>
            {!meta.error && <div className="pb-2" />}

            {meta.error && (
                <div className="w-full text-xs text-center text-secondary-500 font-semibold">
                    {meta.error}
                </div>
            )}
        </div>
    );
};

export default FieldControl;
