import { Form } from 'formik'
import { startTransition, useEffect, useMemo } from 'react'
import { BtnConfirm, BtnSecondary } from '~/Components/atoms/btn'
import { OptionSelect } from '~/Components/molecules/field-control'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import FieldTextArea from '~/Components/molecules/field-text-area'
import RadioGroup from '~/Components/molecules/radio-group'
import { KeyOfQuestionTypes, Question } from '~/constants/anamnese-questions'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { QuestionAnamnesis } from '~/types/appointment'

type QuestionAnamneseProps = {
    category: KeyOfQuestionTypes
    questions: Question[]
}

const makeOptions = (items: Question[], category: KeyOfQuestionTypes) => {
    const filtered = items.reduce(
        (acc, item) => {
            if (item.type === category) {
                acc.push({
                    type: item.type,
                    value: item.id,
                    label: item.question,
                    color: 'rgb(255 200 107);',
                })
            }
            return acc
        },
        [] as OptionSelect[],
    )

    return filtered
}

const QuestionsAnamnese = ({ category, questions }: QuestionAnamneseProps) => {
    const { values, handleSubmit, isValid, setFieldValue, errors } =
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
        <Form onSubmit={handleSubmit}>
            <FieldControlSelect
                ctx={values}
                name="type_anamnesis"
                required
                label="Questão"
                options={options}
                isDisabled={options?.length === 0}
            />
            <RadioGroup
                ctx={values}
                title="Resposta"
                checked={values.options_anamnesis}
                name="options_anamnesis"
                items={[
                    {
                        id: 'yes',
                        name: 'Sim',
                        value: 'yes',
                    },
                    {
                        id: 'no',
                        name: 'Não',
                        value: 'no',
                    },
                    {
                        id: 'other',
                        name: 'Outro',
                        value: 'other',
                    },
                ]}
            />
            <FieldTextArea ctx={values} name="notes_anamnesis" label="Anotações" />
            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnSecondary label="Pular (Espaço)" type="submit" />
                <BtnConfirm
                    disabled={!isValid}
                    className="text-white"
                    label="Responder"
                    type="submit"
                />
            </div>
        </Form>
    )
}

export default QuestionsAnamnese
