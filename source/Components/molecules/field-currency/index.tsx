import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field'
import Label from '../../atoms/label'

import { input } from '../../atoms/input'

const FieldCurrency = ({
    label,
    ...props
}: CurrencyInputProps & { label?: string }) => {
    return (
        <div>
            <Label label={label} id={props.name} required={props.required} />


            <CurrencyInput
                prefix="R$ "
                decimalScale={2}
                placeholder={'R$ 0,00'}
                className={input({ className: props.className + ' resize-none h-[38px]' })}
                {...props}
            />
        </div>
    )
}

export default FieldCurrency
