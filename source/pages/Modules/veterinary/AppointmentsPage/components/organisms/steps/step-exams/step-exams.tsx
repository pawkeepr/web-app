import CardInputExams from '~/Components/organism/card-input-exams'
import { exams } from '~/constants/exams-questions'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { QuestionAnamnesis } from '~/types/appointment'
import CardSimplePet from '../../../molecules/card-simple-pet'
import { screen } from '../styles'

const StepExams = () => {
    const { values, setFieldValue } = useFormikContextSafe<any>()

    const handlePushExams = (value: QuestionAnamnesis) => {
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
            <h4 className="font-sans text-base font-semibold text-center capitalize">
                Exams
            </h4>
            <div className={screen()}>
                <CardInputExams items={exams} handleChange={handlePushExams} />
            </div>
        </>
    )
}

export default StepExams
