
import { useFormikContext } from 'formik';
import { useMemo } from 'react';

import { InputControlProps } from '~/Components/molecules/field-control';

import FieldMasked from '../field-masked';

type FieldDocumentProps<T> = Omit<InputControlProps<T>, 'ref'>

const FieldCep = <T,>({ ...props }: FieldDocumentProps<T>) => {
    const { values } = useFormikContext()

    const cep = (values as any)[props.name] || ""

    const mask = useMemo(() => {
        // somente os números
        const numbers = cep.replace(/\D/g, '')

        return '_____-___'
    }, [cep])

    return (
        <FieldMasked
            {...props}
            name={props.name}
            mask={mask}
            replacement={{ _: /\d/ }}
        />
    );
};

export default FieldCep;
