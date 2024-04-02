import FieldNumber from '~/Components/molecules/field-number'
import FieldTextArea from '~/Components/molecules/field-text-area'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import CardSimplePet from '../../../molecules/card-simple-pet'
import type { CtxStepAnamnese } from '../../../validations.yup'

const StepGeral = () => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()

    return (
        <>
            <CardSimplePet />
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Pré-Anamnese
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>
            <div
                className="
                gap-2 flex flex-col card shadow-2xl p-8 
                border-secondary-500 border relative
                mobile:p-2 mobile:border  mobile:!shadow-none
                min-h-[420px]  rounded-sm
                grid-cols-3 mobile:grid-cols-1
            "
            >
                <FieldTextArea
                    ctx={values}
                    label="Motivação da Consulta"
                    required
                    name="dates_consults.reason_consultation"
                    divClassName="col-span-full"
                />
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
            </div>
        </>
    )
}

export default StepGeral
