import { cpf } from 'cpf-cnpj-validator'
import { useFormikContext } from 'formik'
import { useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import type { InputControlProps } from '~/Components/molecules/field-control'
import FieldMasked from '../field-masked'

type FieldDocumentProps<T, Ctx = any> = InputControlProps<T, Ctx> & {
    typeDocument?: 'all' | 'cpf' | 'cnpj'
    classNames?: {
        input?: string
    }
}

const FieldDocument = <T, Ctx>({
    typeDocument = 'all',
    className,
    classNames,
    ...props
}: FieldDocumentProps<T, Ctx>) => {
    const { values } = useFormikContext()
    const [isValid, setIsValid] = useState(false)

    const document = (values as any)[props.name] || ''

    const mask = useMemo(() => {
        // somente os números
        const numbers = document.replace(/\D/g, '')
        setIsValid(cpf.isValid(numbers))

        if (typeDocument === 'cpf') return '___.___.___-__'
        if (typeDocument === 'cnpj') return '__.___.___/____-__'

        // verifica se é CPF ou CNPJ
        if (numbers.length === 11 && cpf.isValid(numbers)) return '___.___.___-__'

        return numbers.length >= 11 ? '__.___.___/____-__' : '___.___.___-__'
    }, [document, typeDocument])

    return (
        <div className={twMerge("relative w-full", className)}>
            <FieldMasked
                {...props}
                name={props.name}
                className={classNames?.input}
                mask={mask}
                replacement={{ _: /\d/ }}
            />
            {!isValid && document.length > 0 && (
                <p className="absolute bottom-0 flex w-full justify-center font-semibold text-secondary-500 items-center text-xs">
                    CPF/CNPJ inválido!
                </p>
            )}
        </div>
    )
}

export default FieldDocument
