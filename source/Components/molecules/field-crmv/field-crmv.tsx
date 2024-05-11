import type { InputControlProps } from '~/Components/molecules/field-control'

import FieldMasked from '../field-masked'

type FieldDocumentProps<T, Ctx> = Omit<InputControlProps<T, Ctx>, 'ref'>

const FieldCRMV = <T, Ctx = unknown>({ ...props }: FieldDocumentProps<T, Ctx>) => {
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
