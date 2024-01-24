import { useMemo } from 'react'
import { BtnPrimary } from '~/Components/atoms/btn'
import FieldArraySafe from '~/Components/molecules/field-array-safe'
import type { OptionSelect } from '~/Components/molecules/field-control'
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

            <FieldArraySafe ctx={values} name="anamnesis.questions_anamnesis">
                {({ push, remove }) => (
                    <>
                        {values.anamnesis?.questions_anamnesis?.map(
                            (treatment, index) => (
                                <div
                                    key={`treatment-${index}`}
                                    className="w-full bg-secondary rounded-md text-xs py-1 px-2"
                                >
                                    <div className="w-full flex flex-row bg-secondary px-2 rounded-sm border-dashed border border-primary">
                                        <div className="grid grid-cols-6 w-full">
                                            <h6 className="col-span-2 font-mono font-semibold  capitalize">
                                                {treatment.name_anamnesis}
                                            </h6>
                                            <h6 className="col-span-1 font-mono font-semibold  capitalize">
                                                {
                                                    TranslationOptions[
                                                        treatment.options_anamnesis as keyof typeof TranslationOptions
                                                    ]
                                                }
                                            </h6>
                                            <h6 className="col-span-1 font-mono font-semibold  capitalize">
                                                {typeof treatment.type_anamnesis ===
                                                'string'
                                                    ? treatment.type_anamnesis
                                                    : treatment.type_anamnesis
                                                          ?.label}
                                            </h6>

                                            <p className="col-span-3 font-mono  capitalize">
                                                {treatment.notes_anamnesis}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-red-500"
                                            onClick={() => remove(index)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            ),
                        )}
                        <CardInputAnamnese
                            items={questions}
                            handleSubmit={(data, formikHelpers) => {
                                return new Promise(() => {
                                    const { label, type } =
                                        data.type_anamnesis as OptionSelect

                                    push({
                                        ...data,
                                        name_anamnesis: label,
                                        type_anamnesis: type,
                                    })

                                    formikHelpers.resetForm()
                                })
                            }}
                        />
                    </>
                )}
            </FieldArraySafe>

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
