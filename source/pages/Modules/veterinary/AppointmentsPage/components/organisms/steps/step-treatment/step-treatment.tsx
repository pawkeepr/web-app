import { FieldArray, useFormikContext } from 'formik'
import type { OptionSelect } from '~/Components/molecules/field-control'
import CardInputTreatment from '~/Components/organism/card-input-treatment'
import CardSimplePet from '../../../molecules/card-simple-pet'
import type { CtxStepTreatment } from '../../../validations.yup'

const items: OptionSelect[] = [
    {
        value: 'medicine',
        label: 'Medicação',
    },
    {
        value: 'vaccine',
        label: 'Vacina',
    },
    {
        value: 'nutrition',
        label: 'Nutrição Alimentar',
    },
    {
        value: 'fast_test',
        label: 'Testes rápidos',
    },
    {
        value: 'exam',
        label: 'Exame',
    },
    {
        value: 'activities_carry',
        label: 'Atividades físicas',
    },
]

const KeyTreatment = {
    activities_carry: 'Atividades físicas',
    fast_test: 'Testes rápidos',
    medicine: 'Medicação',
    vaccine: 'Vacina',
    exam: 'Exame',
    nutrition: 'Nutrição Alimentar',
} as const

const StepTreatment = () => {
    const { values } = useFormikContext<CtxStepTreatment>()

    return (
        <section>
            <CardSimplePet />
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Tratamento
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>
            <FieldArray name="treatments.questions_treatment">
                {({ push, remove }) => (
                    <>
                        <CardInputTreatment
                            items={items}
                            handleSubmit={(data, formikHelpers) => {
                                return new Promise(() => {
                                    push(data)
                                    formikHelpers.resetForm()
                                })
                            }}
                        />
                        {values.treatments?.questions_treatment?.map(
                            (treatment, index) => (
                                <div
                                    key={`treatment-${index}`}
                                    className="w-full bg-secondary rounded-md text-xs py-1 px-2"
                                >
                                    <div className="w-full flex flex-row bg-secondary px-2 rounded-sm border-dashed border border-primary">
                                        <div className="grid grid-cols-6 w-full">
                                            <h6 className="col-span-2 font-mono font-semibold  capitalize">
                                                {treatment.name_treatment}
                                            </h6>

                                            <h6 className="col-span-1 font-mono font-semibold  capitalize">
                                                {
                                                    KeyTreatment[
                                                        treatment.type_treatment as keyof typeof KeyTreatment
                                                    ]
                                                }
                                            </h6>

                                            <p className="col-span-3 font-mono  capitalize">
                                                {treatment.notes_treatment}
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
                    </>
                )}
            </FieldArray>
        </section>
    )
}

export default StepTreatment
