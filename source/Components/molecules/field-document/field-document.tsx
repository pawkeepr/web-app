
import { cpf } from 'cpf-cnpj-validator';
import { useFormikContext } from 'formik';
import { useMemo } from 'react';

import { InputControlProps } from '~/Components/molecules/field-control';

import FieldMasked from '../field-masked';

type FieldDocumentProps<T> = InputControlProps<T> & {
    typeDocument?: 'all' | 'cpf' | 'cnpj'
}

const FieldDocument = <T,>({ typeDocument = 'all', ...props }: FieldDocumentProps<T>) => {
    const { values } = useFormikContext()

    const document = (values as any)[props.name] || ""

    const mask = useMemo(() => {
        // somente os números
        const numbers = document.replace(/\D/g, '')

        if (typeDocument === 'cpf') return '___.___.___-__'
        if (typeDocument === 'cnpj') return '__.___.___/____-__'

        // verifica se é CPF ou CNPJ
        if (numbers.length === 11 && cpf.isValid(numbers)) return '___.___.___-__'

        return numbers.length >= 11 ? '__.___.___/____-__' : '___.___.___-__'
    }, [document, typeDocument])


    return (
        <FieldMasked
            {...props}
            name={props.name}
            mask={mask}
            replacement={{ _: /\d/ }}
        />
    );
};

export default FieldDocument;
