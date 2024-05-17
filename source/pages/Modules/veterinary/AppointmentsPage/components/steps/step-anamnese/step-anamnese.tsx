import * as Yup from 'yup'
import ListSwitch from '~/Components/organism/list-vertical-switch'
import {
    QuestionTypes,
    questions,
    type KeyOfQuestionTypes,
} from '~/constants/anamnese-questions'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { errorToast } from '~/store/helpers/toast'
import { OPTION_BOOLEAN, type QuestionAnamnesis } from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'
import CardSimplePet from '../../molecules/card-simple-pet'
import type { CtxStepAnamnese } from '../../validations.yup'
import { screen } from '../styles'

const validationSchema = Yup.object().shape<RecordsShapeYup<QuestionAnamnesis>>({
    name_anamnesis: Yup.string().optional(),
    type_anamnesis: Yup.string().required('Campo obrigatório'),
    notes_anamnesis: Yup.string().optional(),
    checked: Yup.boolean().required('Campo obrigatório'),
    options_anamnesis: Yup.string()
        .oneOf(['no', 'yes', 'other'])
        .required('Campo obrigatório'),
})

const StepAnamnese = () => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()

    return (
        <>
            <CardSimplePet />
            <h4 className="font-sans text-base font-semibold text-center capitalize">
                Anamnese
            </h4>
            <div className={screen()}>
                <ListSwitch
                    name="anamnesis.questions_anamnesis"
                    ctx={values}
                    categories={Object.keys(QuestionTypes) as KeyOfQuestionTypes[]}
                    items={questions}
                    onChange={({ checked, replace, option }) => {
                        const item = {
                            id: option.value,
                            name_anamnesis: option.label,
                            notes_anamnesis: '',
                            type_anamnesis: option.type,
                            checked,
                            options_anamnesis:
                                OPTION_BOOLEAN[String(checked) as OPTION_BOOLEAN],
                        }
                        const isValid = validationSchema.isValidSync(item)

                        if (!isValid) return errorToast('Erro ao adicionar item')
                        replace?.(option.value as number, item)
                    }}
                />
            </div>
        </>
    )
}

export default StepAnamnese
