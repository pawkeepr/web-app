import { Form } from 'formik'
import { startTransition, useEffect, useMemo } from 'react'
import ControlSwitchDiv from '~/Components/molecules/control-switch-div'
import type { OptionSelect } from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { KeyOfQuestionTypes, Question } from '~/constants/anamnese-questions'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { QuestionAnamnesis } from '~/types/appointment'

type QuestionAnamneseProps = {
    category: KeyOfQuestionTypes
    questions: Question[]
}

const makeOptions = (items: Question[], category: KeyOfQuestionTypes) => {
    const filtered = items.reduce((acc, item) => {
        if (item.type === category) {
            acc.push({
                type: item.type,
                value: item.id,
                label: item.question,
                color: 'rgb(255 200 107);',
            })
        }
        return acc
    }, [] as OptionSelect[])

    return filtered
}

const QuestionsAnamnese = ({ category, questions }: QuestionAnamneseProps) => {
    const { values, handleSubmit, setFieldValue } =
        useFormikContextSafe<QuestionAnamnesis>()

    const options = useMemo(
        () => makeOptions(questions, category),
        [category, questions],
    )

    useEffect(() => {
        if (options.length > 0) {
            const [first] = options
            startTransition(() => {
                setFieldValue('type_anamnesis', first)
            })
        }
    }, [category])

    return (
        <Form onSubmit={handleSubmit} className="grid grid-cols-1">
            {options.map((item) => (
                <ControlSwitchDiv
                    ctx={values}
                    label={item.label}
                    divClassName="col-span-1 mobile:col-span-full"
                />
            ))}
            <FieldTextArea ctx={values} name="notes_anamnesis" label="Anotações" />
        </Form>
    )
}

export default QuestionsAnamnese
