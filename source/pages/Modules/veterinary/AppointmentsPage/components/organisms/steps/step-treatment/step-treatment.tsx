import { FieldArray } from 'formik'
import type { OptionSelect } from '~/Components/molecules/field-control'
import CardInputTreatment from '~/Components/organism/card-input-treatment'
import CardSimplePet from '../../../molecules/card-simple-pet'

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

const StepTreatment = () => {
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
                    <CardInputTreatment
                        items={items}
                        handleRemove={(index) => remove(index)}
                        handleSubmit={(data, formikHelpers) => {
                            return new Promise(() => {
                                push(data)
                                formikHelpers.resetForm()
                            })
                        }}
                    />
                )}
            </FieldArray>
        </section>
    )
}

export default StepTreatment
