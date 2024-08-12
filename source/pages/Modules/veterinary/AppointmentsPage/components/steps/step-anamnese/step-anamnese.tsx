import * as Yup from 'yup'
import FieldNumber from '~/Components/molecules/field-number'
import FieldTextArea from '~/Components/molecules/field-text-area'
import ListVerticalSwitch from '~/Components/organism/list-vertical-switch'
import {
    QuestionTypes,
    TKeysOfQuestionTypes,
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
            <section className={screen()}>
                <h4 className="font-sans text-base font-semibold text-center capitalize">
                    Pré-Anamnese
                    <br />
                    <span className="text-xs font-bold text-secondary-500">
                        Obrigatório (*)
                    </span>
                </h4>
                <div>
                    <FieldTextArea
                        ctx={values}
                        label="Motivo da Consulta"
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
                <h4 className="font-sans text-base font-semibold text-center capitalize">
                    Anamnese
                </h4>
                <div>
                    <ListVerticalSwitch
                        name="anamnesis.questions_anamnesis"
                        ctx={values}
                        categories={Object.keys(QuestionTypes).map((key) => {
                            const type = key as KeyOfQuestionTypes
                            return {
                                value: type,
                                label: TKeysOfQuestionTypes[type],
                            }
                        })}
                        items={questions}
                        onChange={({ checked, replace, option }) => {
                            const item = {
                                id: option.value,
                                name_anamnesis: option.label,
                                notes_anamnesis: '',
                                type_anamnesis: option.type,
                                checked,
                                options_anamnesis:
                                    OPTION_BOOLEAN[
                                        String(checked) as OPTION_BOOLEAN
                                    ],
                            }
                            const isValid = validationSchema.isValidSync(item)

                            if (!isValid)
                                return errorToast('Erro ao adicionar item')
                            replace?.(option.value as number, item)
                        }}
                    />
                </div>
            </section>
        </>
    )
}

export default StepAnamnese
