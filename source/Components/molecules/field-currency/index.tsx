import CurrencyInput, { type CurrencyInputProps } from 'react-currency-input-field'
import Label from '../../atoms/label'

import useFieldSafe from '~/hooks/use-field-safe'
import { input } from '../../atoms/input'

const FieldCurrency = ({
    label,
    ...props
}: CurrencyInputProps & { label?: string }) => {
    const [inputProps, _meta, field] = useFieldSafe(props.name as string)

    const onChange = (value: string) => {
        field.setValue(value)
    }

    return (
        <div>
            <Label label={label} id={props.name} required={props.required} />

            <CurrencyInput
                prefix="R$ "
                decimalScale={2}
                placeholder={'R$ 0,00'}
                value={inputProps.value}
                onValueChange={(value, _name, _values) => onChange(value as string)}
                className={input({
                    className: `${props.className} resize-none h-[38px]`,
                })}
                {...props}
            />
        </div>
    )
}

export default FieldCurrency
