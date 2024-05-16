import FieldNumber from '~/Components/molecules/field-number'
import FieldTextArea from '~/Components/molecules/field-text-area'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import CardSimplePet from '../../molecules/card-simple-pet'
import type { CtxStepAnamnese } from '../../validations.yup'
import { screen } from '../styles'

const StepGeral = () => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()

    return (
        <>
            <CardSimplePet />
            <h4 className="font-sans text-base font-semibold text-center capitalize">
                Pré-Anamnese
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>
            <div className={screen()}>
                <FieldTextArea
                    isValid={values.dates_consults?.reason_consultation.length > 0}
                    ctx={values}
                    label="Motivo da Consulta"
                    required
                    name="dates_consults.reason_consultation"
                    divClassName="col-span-full"
                />

                <FieldNumber
                    ctx={values}
                    label="Peso"
                    required
                    isValid={values.details_pet_consultation?.weight.length > 0}
                    visibleError={false}
                    divClassName="col-span-full"
                    name="details_pet_consultation.weight"
                />
                <legend className="text-xs text-center text-gray-400 col-span-full">
                    Peso do pet em quilos, exemplo = 0.5 (500 gramas)
                </legend>
            </div>
        </>
    )
}

export default StepGeral
