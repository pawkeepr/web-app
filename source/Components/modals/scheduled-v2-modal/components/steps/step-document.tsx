import { cnpj, cpf } from 'cpf-cnpj-validator'
import { useEffect, useMemo } from 'react'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import FieldDocument from '~/Components/molecules/field-document'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { NUMBER_STEPS } from '../../modal-list-pets'
import type { CtxSimplifiedPeTFields, StepProps } from '../../types'

const StepDocument = ({ nextStep, onChangeDocument, onChangeStep }: StepProps) => {
    const { values } = useFormikContextSafe<CtxSimplifiedPeTFields>()

    const validateDocument = useMemo(() => {
        const document = values.ownerEmergencyContact?.cpf_cnpj
        return cpf.isValid(document) || cnpj.isValid(document)
    }, [values.ownerEmergencyContact])

    useEffect(() => {
        if (validateDocument) {
            onChangeStep(NUMBER_STEPS.PETS)
        }
    }, [validateDocument])

    return (
        <div className="gap-2">
            <h5 className="text-center font-semibold text-gray-500 mb-2">
                Insira o CPF do tutor para agendar ou iniciar uma consulta
            </h5>
            <FieldDocument
                ctx={values}
                required
                name="ownerEmergencyContact.cpf_cnpj"
                className="w-full flex-1 mt-2"
                placeholder="CPF/CNPJ"
                onChange={(e: { target: { value: string } }) =>
                    onChangeDocument?.(e.target.value)
                }
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
