
import { InputMask, InputMaskProps } from '@react-input/mask';
import FieldControl, { InputControlProps } from '~/Components/molecules/field-control';

import { input } from '~/Components/atoms/input';

const FieldMasked = ({
    placeholder,
    name,
    replacement = { _: /\d/ },
    ...props
}: InputControlProps<InputMaskProps>) => {
    return (
        <FieldControl
            {...props}
            placeholder={placeholder || "Digite aqui..."}
            name={name}
            replacement={replacement}
            component={InputMask as any}
            className={input({ className: props.className, required: props.required })}
        />
    )
}

export default FieldMasked