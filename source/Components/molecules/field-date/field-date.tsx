import { InputDate } from '~/Components/atoms/input-date'
import Label from '~/Components/atoms/label'
import useFieldSafe from '~/hooks/use-field-safe'
import { useFieldControlClasses, type InputControlProps } from '../field-control'
import type { FieldControlInput } from '../field-control/field-control'

type FieldControlProps<T, Ctx> = InputControlProps<T, Ctx> & FieldControlInput
type FieldDateProps<T, Ctx> = FieldControlProps<T, Ctx> & {
    startIcon?: never
    endIcon?: never
    onChange?: (date: Date) => void
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const FieldDate = <T, Ctx = any>({
    label,
    required = false,
    separator = ':',
    className,
    divClassName,
    mode = 'editable',
    isValid = false,
    visibleError = true,
    validateSync,
    onChange: onChangeDefault,
    ...props
}: FieldDateProps<T, Ctx>) => {
    const [inputProps, meta, field] = useFieldSafe<Date>(props.name as string)
    const id = props.name || props.id

    const onChange = (date: Date) => {
        onChangeDefault?.(date)
        field.setValue(date)
    }

    const classes = useFieldControlClasses({
        validateSync,
        value: inputProps.value,
        required,
        isValid,
        mode,
        className,
        ...props,
    })

    return (
        <div className="flex flex-col flex-1 w-full">
            <Label
                label={label}
                required={required}
                id={id as string}
                separator={separator as string}
            />

            <InputDate
                id={id as string}
                required={required}
                data-testid={`input-${id}`}
                {...inputProps}
                {...props}
                value={inputProps.value.toString()}
                onChange={
                    (date: Date) => {
                        onChange(date)
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }
                className={classes}
                name={id as string}
            />

            {meta.error && meta.touched && visibleError && (
                <div className="w-full text-xs font-semibold text-center text-secondary-500">
                    {meta.error}
                </div>
            )}
        </div>
    )
}

export default FieldDate
