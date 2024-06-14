import { useCallback, useMemo } from 'react'
import { tv } from 'tailwind-variants'
import type { CheckboxIsMultiModalProps } from './checkbox-is-multi-modal-group'

export const checkboxButton = tv({
    base: 'h-8 w-full',
    variants: {
        isValid: {
            true: '!border-primary-500',
        },
        required: {
            true: '!border-secondary-500',
        },
        mode: {
            editable: 'border-2',
            readonly:
                'border-0 text-gray-500 font-semibold text-xs opacity-100  items-center justify-start px-4',
        },
    },
})

type UseFieldControlClassesProps<Ctx> = Pick<
    CheckboxIsMultiModalProps<Ctx>,
    'validateSync' | 'required'
> & {
    value: unknown
    mode?: 'readonly' | 'editable'
    className?: string
}

export const useFieldControlClasses = <Ctx,>({
    validateSync,
    value,
    required,
    mode,
    className,
    ...props
}: UseFieldControlClassesProps<Ctx>) => {
    const handleValidation = useCallback(
        (value: unknown) => {
            if (validateSync) {
                return validateSync(value)
            }
        },
        [validateSync],
    )

    const hasValidation = useMemo(() => {
        if (validateSync) {
            return required && handleValidation(value)
        }

        return required && false
    }, [required, value, validateSync])

    const classes = checkboxButton({
        className,
        required: required && !hasValidation,
        isValid: hasValidation,
        mode,
        ...props,
    })

    return classes
}
