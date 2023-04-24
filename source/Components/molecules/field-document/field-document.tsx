
import { cpf } from 'cpf-cnpj-validator';
import { useFormikContext } from 'formik';
import { useMemo } from 'react';
import MaskedInput from 'react-input-mask';
import type { InputControlProps } from '~/Components/molecules/field-control';
import FieldControl from '~/Components/molecules/field-control/field-control';

const FieldDocument = (props: InputControlProps) => {
    const { values } = useFormikContext()

    const document = (values as any)[props.name]

    const mask = useMemo(() => {
        // somente os números
        const numbers = document.replace(/\D/g, '')

        // verifica se é CPF ou CNPJ
        if (numbers.length === 11 && cpf.isValid(numbers)) return '999.999.999-99'

        return numbers.length >= 11 ? '99.999.999/9999-99' : '999.999.999-99'
    }, [document])


    return (
        <FieldControl
            {...props}
            component={MaskedInput as any}
            mask={mask}
        />
    );
};

export default FieldDocument;
