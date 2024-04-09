import type { InputControlProps } from './types'

import type { ChangeEvent } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import Input from '~/Components/atoms/input/input'
import Label from '~/Components/atoms/label'
import useFieldSafe from '~/hooks/use-field-safe'

const fieldControlDiv = tv({
    base: 'w-full  p-1',
})

export const ModeInput = {
    editable: 'editable',
    readonly: 'readonly',
} as const
export type ModeInput = (typeof ModeInput)[keyof typeof ModeInput]

export const fieldControlInput = tv({
    base: 'bg-white focus:!border-none focus:!ring-2 focus:!ring-primary-500 outline-none ',
    variants: {
        isValid: {
            true: '!border-primary-500',
        },
        required: {
            true: '!border-secondary-500',
        },
        disabled: {
            true: 'bg-slate-100',
        },
        startIcon: {
            true: '!pl-8',
        },
        endIcon: {
            true: '!pr-8',
        },
        mode: {
            editable: '',
            readonly:
                'bg-transparent !border-none !pointer-events-none !focus:outline-none !text-gray-900 font-sans',
        },
        text_align: {
            center: 'text-center',
            left: 'text-left',
            right: 'text-right',
        },
    },
})

// criar a tipagem para tv

export type FieldControlInput = Omit<
    VariantProps<typeof fieldControlInput>,
    'startIcon' | 'endIcon'
>

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const FieldControl = <T, Ctx = any>({
    label,
    required = false,
    component = Input,
    startIcon,
    endIcon,
    separator = ':',
    className,
    divClassName,
    mode = 'editable',
    isValid = false,
    visibleError = true,
    onChange: onChangeDefault,
    ...props
}: InputControlProps<T, Ctx> & FieldControlInput) => {
    const [inputProps, meta] = useFieldSafe(props.name as string)
    const id = props.name || props.id

    const InputComponent = component as JSX.ElementType

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeDefault?.(e)
        inputProps.onChange(e)
    }

    return (
        <div className={fieldControlDiv({ className: divClassName })}>
            <Label
                label={label}
                required={required}
                id={id as string}
                separator={separator as string}
            />
            <div className="relative ">
                {startIcon && (
                    <div className="absolute inset-y-0 flex items-center pl-1 text-sm text-gray-400 pointer-events-none left-1">
                        {startIcon}
                    </div>
                )}
                <InputComponent
                    id={id}
                    required={required}
                    data-testid={`input-${id}`}
                    className={fieldControlInput({
                        className,
                        startIcon: !!startIcon,
                        endIcon: !!endIcon,
                        mode,
                        required: required && !isValid,
                        isValid: required && isValid,
                        ...props,
                    })}
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
            {!meta.error && <div className="pb-3" />}

            {meta.error && visibleError && (
                <div className="w-full text-xs text-center text-secondary-500 font-semibold">
                    {meta.error}
                </div>
            )}
        </div>
    )
}

export default FieldControl
