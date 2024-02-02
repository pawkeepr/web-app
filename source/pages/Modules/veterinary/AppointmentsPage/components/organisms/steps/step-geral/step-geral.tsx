import { BtnPrimary } from '~/Components/atoms/btn'
import FieldNumber from '~/Components/molecules/field-number'
import FieldTextArea from '~/Components/molecules/field-text-area'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { StepProps } from '~/types/helpers'
import type { CtxStepAnamnese } from '../../../validations.yup'

const StepGeral = ({ toggleTab }: StepProps) => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()

    return (
        <section className="card card-body shadow-lg mobile:!shadow-none mobile:!rounded-none mobile:m-0 mobile:p-0">
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Prontuário
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>
            <div className="grid grid-cols-3 gap-3 mobile:grid-cols-1">
                <FieldNumber
                    ctx={values}
                    label="Peso"
                    placeholder="Peso do pet em quilos, exemplo = 0.5 (500 gramas)"
                    required
                    name="details_pet_consultation.weight"
                />

                <FieldNumber
                    ctx={values}
                    label="Altura"
                    placeholder="Altura do pet em centímetros, exemplo = 32"
                    name="details_pet_consultation.height"
                />

                <FieldNumber
                    ctx={values}
                    label="Comprimento"
                    placeholder="Comprimento do pet em centímetros "
                    className="border-gray-300"
                    name="details_pet_consultation.length"
                />

                <div>
                    {values.details_pet_consultation?.imc > 0 && (
                        <h2 className="m-4 font-bold">
                            O IMC do animal é:{' '}
                            {values.details_pet_consultation?.imc?.toFixed(2)}
                        </h2>
                    )}
                </div>

                <FieldTextArea
                    ctx={values}
                    label="Motivação da Consulta"
                    required
                    name="details_pet_consultation.motivation"
                    divClassName="col-span-full"
                />
            </div>
            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnPrimary
                    className="text-white"
                    label="Próximo"
                    type="button"
                    onClick={() => toggleTab(2)}
                />
            </div>
        </section>
    )
}

export default StepGeral
