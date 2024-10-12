import { Form, Formik } from 'formik'
import { memo } from 'react'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import FieldNumber from '~/Components/molecules/field-number'
import FieldTextArea from '~/Components/molecules/field-text-area'
import CheckboxModalGroup from '~/Components/organism/checkbox-modal-group'
import type { BodyEvolution } from '~/types/medical-records'
import { calcAge } from '~/utils/calc-age'
import type { OptionFormsProps } from '../../medical-records-form'

const BodyEvolutionFormik = ({
    item = {} as BodyEvolution,
    pet,
    handleSubmit,
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
                    className="flex flex-col items-center justify-center flex-1 w-full gap-1"
                    onSubmit={handleSubmit}
                >
                    <div className="z-10 flex">
                        <FieldNumber
                            ctx={values}
                            label="Peso"
                            placeholder="Peso do pet em quilos, exemplo = 0.5 (500 gramas)"
                            required
                            name="weight"
                        />
                        <CheckboxModalGroup
                            mode="editable"
                            items={[
                                {
                                    value: 'g',
                                    label: 'Gramas',
                                },
                                {
                                    value: 'kg',
                                    label: 'Quilogramas',
                                },
                                {
                                    value: 'lb',
                                    label: 'Libras',
                                },
                                {
                                    value: 'oz',
                                    label: 'Onças',
                                },
                                {
                                    value: 'ar',
                                    label: 'Arrobas',
                                },
                                {
                                    value: 'q',
                                    label: 'Quintais',
                                },
                                {
                                    value: 't',
                                    label: 'Toneladas',
                                },
                            ]}
                            className="border-none"
                            ctx={values}
                            label="Tipo de Peso"
                            name="type_weight"
                        />
                    </div>

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
                    <div className="flex justify-end flex-1 gap-1 col-span-full">
                        <BtnCancel
                            outline
                            className="flex-1 text-gray-400 border-none "
                            label="Cancelar"
                        />

                        <BtnPrimary
                            className="flex-1 text-white"
                            label="Adicionar"
                            type="submit"
                        />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default memo(BodyEvolutionFormik)
