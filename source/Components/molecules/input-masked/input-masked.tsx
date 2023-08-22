
import { InputMask, InputMaskProps } from '@react-input/mask';
import FieldControl, { InputControlProps } from '~/Components/molecules/field-control';

import { input } from '~/Components/atoms/input';

const InputMasked = ({
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
            input={InputMask as any}
            className={input({ className: props.className })}
        />
    )
}

export default InputMasked