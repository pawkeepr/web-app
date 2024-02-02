import { useMemo } from 'react'
import { BtnPrimary } from '~/Components/atoms/btn'
import CardInputAnamnese from '~/Components/organism/card-input-anamnese'
import { questions } from '~/constants/anamnese-questions'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { StepProps, Tabs } from '~/types/helpers'
import {
    schemaStepAnamneseValidation,
    type CtxStepAnamnese,
} from '../../../validations.yup'

const TranslationOptions = {
    yes: 'Sim',
    no: 'Não',
    other: 'Outro',
} as const

const StepAnamnese = ({ toggleTab, activeTab }: StepProps) => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()

    const isValid = useMemo(() => {
        return schemaStepAnamneseValidation.isValidSync(values)
    }, [values])

    return (
        <section className="card card-body shadow-lg mobile:!shadow-none mobile:!rounded-none mobile:m-0 mobile:p-0">
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Anamnese
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>

            <CardInputAnamnese items={questions} />

            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnPrimary
                    label="Próximo"
                    disabled={!isValid}
                    onClick={() => {
                        toggleTab((activeTab + 1) as Tabs)
                    }}
                />
            </div>
        </section>
    )
}

export default StepAnamnese
