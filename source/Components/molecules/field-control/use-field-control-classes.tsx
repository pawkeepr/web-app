import { useCallback, useMemo } from 'react'
import { fieldControlInput, type FieldControlInput } from './field-control'
import type { InputControlProps } from './types'

type UseFieldControlClassesProps = Pick<
    InputControlProps<unknown, unknown>,
    | 'validateSync'
    | 'value'
    | 'required'
    | 'isValid'
    | 'startIcon'
    | 'endIcon'
    | 'mode'
    | 'className'
> &
    FieldControlInput

export const useFieldControlClasses = ({
    validateSync,
    value,
    required,
    isValid,
    startIcon,
    endIcon,
    mode,
    className,
    ...props
}: UseFieldControlClassesProps) => {
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

        return required && isValid
    }, [required, isValid, value, validateSync])

    const classes = fieldControlInput({
        className,
        startIcon: !!startIcon,
        endIcon: !!endIcon,
        mode,
        required: required && !hasValidation,
        isValid: hasValidation,
        ...props,
    })

    return classes
}
