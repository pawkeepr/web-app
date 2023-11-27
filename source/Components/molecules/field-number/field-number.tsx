
import { InputNumberFormat, InputNumberFormatProps } from '@react-input/number-format';
import FieldControl, { InputControlProps } from '~/Components/molecules/field-control';

import { input } from '~/Components/atoms/input';

const FieldNumber = ({
    placeholder,
    name,
    ...props
}: InputControlProps<InputNumberFormatProps>) => {
    return (
        <FieldControl
            {...props}
            maximumFractionDigits={2}
            placeholder={placeholder || "Digite aqui..."}
            name={name}
            component={InputNumberFormat as any}
            className={input({ className: props.className })}
        />
    )
}

export default FieldNumber