import type { InputControlProps } from '~/Components/molecules/field-control'

import type { InputMaskProps } from '@react-input/mask'
import FieldMasked from '../field-masked'

const FieldCRMV = <T, Ctx = unknown>({
    ...props
}: InputControlProps<InputMaskProps, Ctx>) => {
    return (
        <FieldMasked
            {...props}
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            name={props.name as any}
            showMask={false}
            mask={'--______'}
            replacement={{
                _: /\d/,
                '-': /[A-Za-z]/, // letras maiusculas
            }}
        />
    )
}

export default FieldCRMV
