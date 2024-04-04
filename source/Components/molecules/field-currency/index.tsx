import CurrencyInput, { type CurrencyInputProps } from 'react-currency-input-field'
import Label from '../../atoms/label'

import { input } from '~/Components/atoms/input'
import useFieldSafe from '~/hooks/use-field-safe'
import {
    type FieldControlInput,
    fieldControlInput,
} from '../field-control/field-control'

type FieldCurrencyProps = {
    label?: string
    divClassName?: string
}

const FieldCurrency = ({
    label,
    divClassName,
    required,
    isValid,
    className,
    mode,
    ...props
}: CurrencyInputProps & FieldCurrencyProps & FieldControlInput) => {
    const [inputProps, _meta, field] = useFieldSafe(props.name as string)

    const onChange = (value: string) => {
        field.setValue(value)
    }

    return (
        <div className={divClassName}>
            <Label label={label} id={props.name} required={required} />

            <CurrencyInput
                prefix="R$ "
                decimalScale={2}
                placeholder={'R$ 0,00'}
                value={inputProps.value}
                onValueChange={(value, _name, _values) => onChange(value as string)}
                className={fieldControlInput({
                    className: `${input({ className })} resize-none h-[38px]`,
                    mode,
                    required: required && !isValid,
                    isValid: required && isValid,
                    ...props,
                })}
                {...props}
            />
        </div>
    )
}

export default FieldCurrency
