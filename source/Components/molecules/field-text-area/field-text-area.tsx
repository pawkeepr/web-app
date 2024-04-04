import { useField } from 'formik'

import Input from '../../atoms/text-area'

import type { ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import Label from '~/Components/atoms/label'
import withControl from '~/Components/helpers/with-control'
import type { InputControlProps } from '../field-control'
import { fieldControlInput } from '../field-control/field-control'

const FieldTextArea = <T, Ctx>({
    endIcon,
    input = Input,
    required = false,
    startIcon = false,
    disabled = false,
    separator = ':',
    isValid = false,
    onChange,
    className,
    mode = 'editable',
    divClassName,
    div,
    label,
    ...props
}: InputControlProps<T, Ctx>) => {
    const [field, meta] = useField(props.name as string)
    const id = props.id || props.name
    const ComponentInput = input as JSX.ElementType

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> &
            ChangeEvent<HTMLSelectElement> &
            ChangeEvent<HTMLTextAreaElement>,
    ) => {
        onChange?.(e)
        field.onChange(e)
    }

    return (
        <div {...div} className={twMerge('w-full', div?.className, divClassName)}>
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
                <ComponentInput
                    id={id}
                    className={fieldControlInput({
                        className,
                        startIcon: !!startIcon,
                        endIcon: !!endIcon,
                        mode,
                        required: required && !isValid,
                        isValid: required && isValid,
                        ...props,
                    })}
                    {...field}
                    {...props}
                    disabled={disabled}
                    onChange={handleChange}
                    required={required}
                />

                {endIcon && (
                    <div className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-2">
                        {endIcon}
                    </div>
                )}
            </div>

            {meta.error && (
                <div className="w-full text-xs text-center text-secondary-500 font-semibold">
                    {meta.error}
                </div>
            )}
        </div>
    )
}

export default withControl(FieldTextArea) as typeof FieldTextArea
