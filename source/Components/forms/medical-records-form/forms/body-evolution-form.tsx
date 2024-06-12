import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import FieldNumber from '~/Components/molecules/field-number'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { BodyEvolution } from '~/types/medical-records'
import { calcAge } from '~/utils/calc-age'
import type { OptionFormsProps } from '../medical-records-form'

const BodyEvolutionForm = ({
    item = {} as BodyEvolution,
    pet,
    handleSubmit,
    handleClose,
}: OptionFormsProps<BodyEvolution>) => {
    return (
        <Formik
            initialValues={
                {
                    weight: 0,
                    age: calcAge(pet?.date_birth).toString(),
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
            {({ values, handleSubmit, isValid }) => (
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
                        name="notes"
                        divClassName="col-span-full"
                    />
                    <div className="flex justify-end flex-1 col-span-full">
                        <BtnCancel
                            className="flex-1"
                            label="Cancelar"
                            onClick={handleClose}
                        />

                        <BtnPrimary
                            className="flex-1 text-white"
                            label="Adicionar"
                            type="submit"
                            disabled={!isValid}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default BodyEvolutionForm
