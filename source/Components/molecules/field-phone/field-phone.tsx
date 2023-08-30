
import { useFormikContext } from 'formik';
import { useMemo } from 'react';

import { InputControlProps } from '~/Components/molecules/field-control';

import FieldMasked from '../field-masked';

type FieldDocumentProps<T> = Omit<InputControlProps<T>, 'ref'>

const FieldPhone = <T,>({ ...props }: FieldDocumentProps<T>) => {
    const { values } = useFormikContext()

    const phone = (values as any)[props.name] || ""

    const mask = useMemo(() => {
        // somente os números
        const numbers = phone.replace(/\D/g, '')

        return '+55 (__) _ ____-____'
    }, [phone])

    return (
        <FieldMasked
            {...props}
            name={props.name}
            mask={mask}
            replacement={{ _: /\d/ }}
        />
    );
};

export default FieldPhone;
