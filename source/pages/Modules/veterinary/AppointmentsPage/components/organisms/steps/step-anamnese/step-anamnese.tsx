import CardInputAnamnese from '~/Components/organism/card-input-anamnese'
import { questions } from '~/constants/anamnese-questions'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { QuestionAnamnesis } from '~/types/appointment'
import CardSimplePet from '../../../molecules/card-simple-pet'
import type { CtxStepAnamnese } from '../../../validations.yup'
import { screen } from '../styles'

const StepAnamnese = () => {
    const { values, setFieldValue } = useFormikContextSafe<CtxStepAnamnese>()

    const handlePushAnamnese = (value: QuestionAnamnesis) => {
        const items = values.anamnesis?.questions_anamnesis || []
        const index = items.findIndex((item) => item.id === value.id)

        if (index >= 0) {
            items[index] = value
        } else {
            items.push(value)
        }

        setFieldValue('anamnesis.questions_anamnesis', items)
    }

    return (
        <>
            <CardSimplePet />
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Anamnese
            </h4>
            <div className={screen()}>
                <CardInputAnamnese
                    items={questions}
                    handleChange={handlePushAnamnese}
                />
            </div>
        </>
    )
}

export default StepAnamnese
