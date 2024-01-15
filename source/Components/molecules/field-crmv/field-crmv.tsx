import type { InputControlProps } from '~/Components/molecules/field-control'

import FieldMasked from '../field-masked'

type FieldDocumentProps<T, Ctx> = Omit<InputControlProps<T, Ctx>, 'ref'>

const FieldCRMV = <T, Ctx = undefined>({
    ...props
}: FieldDocumentProps<T, Ctx>) => {
    return (
        <FieldMasked
            {...props}
            name={props.name}
            showMask={true}
            mask={'--______'}
            replacement={{
                _: /\d/,
                '-': /[A-Za-z]/, // letras maiusculas
            }}
        />
    )
}

export default FieldCRMV
