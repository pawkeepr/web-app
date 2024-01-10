import { InputControlProps } from '~/Components/molecules/field-control'

import FieldMasked from '../field-masked'

type FieldDocumentProps<T> = Omit<InputControlProps<T>, 'ref'>

const FieldCRMV = <T,>({ ...props }: FieldDocumentProps<T>) => {
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
