import { cnpj, cpf } from 'cpf-cnpj-validator'
import { useMemo } from 'react'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import FieldDocument from '~/Components/molecules/field-document'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { CtxSimplifiedPedFields, StepProps } from '../../types'


const StepDocument = ({
    nextStep,
    onChangeDocument,
}: StepProps) => {

    const { values } = useFormikContextSafe<CtxSimplifiedPedFields>()

    const validateDocument = useMemo(() => {
        const document = values.cpf_tutor
        return cpf.isValid(document) || cnpj.isValid(document)
    }, [values.cpf_tutor])

    return (
        <div className="mt-3 p-1 gap-2 ">

            <FieldDocument
                ctx={{} as CtxSimplifiedPedFields}
                required
                name="cpf_tutor"
                className="w-full flex-1 mt-2"
                placeholder="CPF/CNPJ"
                onChange={(e) => onChangeDocument?.(e.target.value)}
            />
            <BoxButtons
                isValid={validateDocument}
                link={false}
                cancel={null}
                onClickSuccess={nextStep}
            />
        </div>
    )
}

export default StepDocument