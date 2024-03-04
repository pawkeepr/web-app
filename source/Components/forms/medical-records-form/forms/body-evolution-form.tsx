import { Form, Formik } from 'formik'
import FieldNumber from '~/Components/molecules/field-number'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { BodyEvolution } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const BodyEvolutionForm = ({
    item = {} as BodyEvolution,
    handleSubmit,
}: OptionFormsProps<BodyEvolution>) => {
    return (
        <Formik
            initialValues={
                {
                    weight: 0,
                    age: 0,
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    height: 0,
                    imc: 0,
                    length: 0,
                    notes: '',
                    name: '',
                    notes_consults: '',
                    type: 'body-evolution',
                    type_profile: 1,
                    type_weight: 'kg',
                    value: 0,
                    who_applied: '',
                    ...item,
                } as BodyEvolution
            }
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit }) => (
                <Form
                    className="grid grid-cols-3 gap-1 mobile:grid-cols-1"
                    onSubmit={handleSubmit}
                >
                    <FieldNumber
                        ctx={values}
                        label="Peso"
                        placeholder="Peso do pet em quilos, exemplo = 0.5 (500 gramas)"
                        required
                        name="weight"
                    />

                    <FieldNumber
                        ctx={values}
                        label="Altura"
                        placeholder="Altura do pet em centímetros, exemplo = 32"
                        name="height"
                    />

                    <FieldNumber
                        ctx={values}
                        label="Comprimento"
                        placeholder="Comprimento do pet em centímetros "
                        className="border-gray-300"
                        name="length"
                    />

                    <FieldTextArea
                        ctx={values}
                        label="Anotações Gerais"
                        required
                        name="notes"
                        divClassName="col-span-full"
                    />
                </Form>
            )}
        </Formik>
    )
}

export default BodyEvolutionForm
