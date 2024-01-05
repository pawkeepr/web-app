
import { useFormikContext } from 'formik';
import { useMemo } from 'react';

import { InputControlProps } from '~/Components/molecules/field-control';

import FieldMasked from '../field-masked';

type FieldDocumentProps<T, Ctx = any> = Omit<InputControlProps<T, Ctx>, 'ref'>

const FieldCep = <T, Ctx = unknown>({ ...props }: FieldDocumentProps<T, Ctx>) => {
    const { values } = useFormikContext()

    const mask = useMemo(() => {
        return '_____-___'
    }, [])

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
