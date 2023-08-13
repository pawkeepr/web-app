import { useField } from "formik";

import ErrMessage from "~/Components/atoms/err-message";

import { useEffect, useRef, useState } from "react";
import type { InputControlProps } from "./types";

import cn from 'classnames';
import { twMerge } from 'tailwind-merge';

const FieldControl = ({
    label,
    children,
    required = false,
    component = 'input',
    startChildren,
    separator = ':',
    disabledError = false,
    className,
    initialFocus = false,
    divClassName,
    ...props
}: InputControlProps) => {


    const ref = useRef<HTMLInputElement>(null);
    const { current } = ref || props.ref;

    const [focus, setFocus] = useState(false);

    useEffect(() => {
        if (!initialFocus) return;

        if (!current?.focus) {
            console.warn(
                "FieldControl: initialFocus is true, but the component does not have the focus method"
            );
        }

        if (current?.focus) {
            current.focus();
        }
    }, [current, initialFocus]);

    const [inputProps, meta] = useField(props);
    const id = props.name || props.id;

    const InputComponent = component as any;

    const onChange = (e: any) => {
        props.onChange?.(e);
        inputProps.onChange(e);
    };

    const onBlur = (e: any) => {
        setFocus(false);
        props.onBlur?.(e);
        inputProps.onBlur(e);
    }

    const onFocus = (e: any) => {
        setFocus(true);
        props.onFocus?.(e);
    }

    return (
        <div className={twMerge('pb-4 relative', divClassName)}>
            {!!label && (
                <label
                    htmlFor={id}
                    className="mb-0 text-xs font-semibold text-gray-500 gap-1"
                    data-testid={`label-${id}`}
                >
                    {label.trim() ? (label + separator) : ''}
                    {required && <span className="text-danger">*</span>}
                </label>
            )
            }
            <div
                className={cn(`
                    transition-all duration-300 ease-in-out
                    relative flex flex-row border-2 
                    disabled:!cursor-not-allowed 
                    disabled:!opacity-25 rounded-sm
                `, {
                    '!border-primary-500 border-2': focus,
                })}>
                {startChildren}
                <InputComponent
                    id={id}
                    ref={ref}
                    required={required}
                    data-testid={`input-${id}`}
                    className={
                        twMerge(
                            "border-0",
                            className
                        )}
                    {...inputProps}
                    {...props}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
                {children}
            </div>
            <ErrMessage
                message={meta.error?.toString() as string}
                data-testid={`err-${id}`}
            />
        </div>
    );
};

export default FieldControl;
