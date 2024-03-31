import { useMemo } from 'react'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import CardInputAnamnese from '~/Components/organism/card-input-anamnese'
import { questions } from '~/constants/anamnese-questions'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { QuestionAnamnesis } from '~/types/appointment'
import type { StepProps, Tabs } from '~/types/helpers'
import {
    type CtxStepAnamnese,
    schemaStepAnamneseValidation,
} from '../../../validations.yup'

const StepAnamnese = ({ toggleTab, activeTab }: StepProps) => {
    const { values, setFieldValue } = useFormikContextSafe<CtxStepAnamnese>()

    const handlePushAnamnese = (value: QuestionAnamnesis) => {
        let items = values.anamnesis?.questions_anamnesis || []
        const index = items.findIndex((item) => item.id === value.id)

        if (value.options_anamnesis === 'no') {
            items = items.filter((item) => item.id !== value.id)
        } else if (value.options_anamnesis === 'yes') {
            if (index >= 0) {
                items[index] = value
            } else {
                items.push(value)
            }
        }

        setFieldValue('anamnesis.questions_anamnesis', items)
    }

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

            <CardInputAnamnese
                items={questions}
                handleChange={handlePushAnamnese}
            />

            {values.anamnesis?.questions_anamnesis?.map((anamnese, index) => (
                <div
                    key={`anamnese-${index}`}
                    className="w-full bg-secondary rounded-md text-xs py-1 px-2"
                >
                    <div className="w-full flex flex-row bg-secondary px-2 rounded-sm border-dashed border border-primary">
                        <div className="grid grid-cols-6 w-full">
                            <h6 className="col-span-2 font-mono font-semibold  capitalize">
                                {anamnese.name_anamnesis}
                            </h6>

                            <p className="col-span-2 font-mono  capitalize">
                                {anamnese.notes_anamnesis}
                            </p>

                            <p className="col-span-2 font-mono  capitalize">
                                {anamnese.options_anamnesis}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex items-center justify-center gap-3 mt-4">
                <BtnCancel
                    label="Voltar"
                    onClick={() => {
                        toggleTab((activeTab - 1) as Tabs)
                    }}
                />

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
