import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'

import { FieldArray, useFormikContext } from 'formik'
import { useMemo } from 'react'
import ItemMedicalRecordsForm from '~/Components/forms/item-medical-records-form/item-medical-records-form'
import TreatmentItemForm from '~/Components/forms/treatment-item-form'
import type { StepProps, Tabs } from '~/types/helpers'
import {
    type CtxStepTreatment,
    schemaStepTreatmentValidation,
} from '../../../validations.yup'

const KeyTreatment = {
    activities_carry: 'Recomendações de atividades físicas',
    fast_test: 'Testes rápidos',
    medicine: 'Medicação',
    vaccine: 'Vacina',
    exam: 'Exame',
    nutrition: 'Nutrição Alimentar',
} as const

const StepTreatment = ({ toggleTab, activeTab }: StepProps) => {
    const { values } = useFormikContext<CtxStepTreatment>()

    const isValid = useMemo(() => {
        return schemaStepTreatmentValidation.isValidSync(values.treatments)
    }, [values])

    return (
        <section className="card card-body shadow-lg">
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Informações de Tratamento
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>
            <FieldArray name="treatments.questions_treatment">
                {({ push, remove }) => (
                    <>
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
                        <ItemMedicalRecordsForm
                            handleCancel={() => {}}
                            cpf_cnpj=""
                            id_pet=""
                            form={(props) => (
                                <TreatmentItemForm
                                    {...props}
                                    handleSubmit={push}
                                    item={null}
                                />
                            )}
                        />
                    </>
                )}
            </FieldArray>

            <div className="flex items-center justify-center">
                <BtnCancel
                    type="button"
                    label="Voltar"
                    onClick={() => {
                        toggleTab((activeTab - 1) as Tabs)
                    }}
                />
                <BtnPrimary
                    disabled={!isValid}
                    type="button"
                    label="Próximo"
                    onClick={() => {
                        toggleTab((activeTab + 1) as Tabs)
                    }}
                />
            </div>
        </section>
    )
}

export default StepTreatment
