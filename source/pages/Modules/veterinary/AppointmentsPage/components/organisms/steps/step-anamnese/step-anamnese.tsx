import CardInputAnamnese from '~/Components/organism/card-input-anamnese'
import { questions } from '~/constants/anamnese-questions'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { QuestionAnamnesis } from '~/types/appointment'
import CardSimplePet from '../../../molecules/card-simple-pet'
import type { CtxStepAnamnese } from '../../../validations.yup'

const StepAnamnese = () => {
    const { values, setFieldValue } = useFormikContextSafe<CtxStepAnamnese>()

    const handlePushAnamnese = (value: QuestionAnamnesis) => {
        let items = values.anamnesis?.questions_anamnesis || []
        const index = items.findIndex((item) => item.id === value.id)

        if (value.options_anamnesis === 'no') {
            items = items.filter((item) => item.id !== value.id)
        } else if (value.options_anamnesis === 'yes') {
            if (index >= 0) {
                items[index] = value
            } else {
                items.push(value)
            }
        }

        setFieldValue('anamnesis.questions_anamnesis', items)
    }

    return (
        <>
            <CardSimplePet />
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Anamnese
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>

            <CardInputAnamnese
                items={questions}
                handleChange={handlePushAnamnese}
            />
        </>
    )
}

export default StepAnamnese
