import Tag from '~/Components/atoms/tag'
import FieldTextArea from '~/Components/molecules/field-text-area/field-text-area'
import type { ExamsTypes } from '~/constants'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { TypeAction } from '~/types/appointment'
import type { CtxStepAnamnese } from '../../validations.yup'

export type ItemExam = {
    type: ExamsTypes
    value: number | string
    type_action: TypeAction | null
    label: string
    checked: boolean
}

type ContentActionExamProps = {
    option: ItemExam
    name: string
    label: string
    onChange: (option: ItemExam) => void
}

const ContentActionExam = ({
    name,
    label,
    option,
    onChange,
}: ContentActionExamProps) => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()

    const item =
        values.exams_anamnesis?.complementary_exams?.[option.value as number]

    const onChangeTypeAction = (type: TypeAction) => {
        onChange({
            ...option,
            type_action: type,
        })
    }

    return (
        <section className="p-4">
            <div className="flex w-full gap-1 font-sans text-xs text-gray-500 uppercase justify-evenly">
                <Tag
                    name={name as ''}
                    disabled={!option?.checked}
                    selected={item?.type_action === TypeAction.collect}
                    onClick={() => onChangeTypeAction(TypeAction.collect)}
                >
                    Coletar
                </Tag>
                <Tag
                    name={name as ''}
                    disabled={!option?.checked}
                    selected={item?.type_action === TypeAction.perform}
                    onClick={() => onChangeTypeAction(TypeAction.perform)}
                >
                    Realizar
                </Tag>
                <Tag
                    name={name as ''}
                    disabled={!option?.checked}
                    selected={item?.type_action === TypeAction.request}
                    onClick={() => onChangeTypeAction(TypeAction.request)}
                >
                    Solicitar
                </Tag>
            </div>
            <FieldTextArea
                label={label}
                name={name as ''}
                disabled={!option?.checked}
            />
        </section>
    )
}

export default ContentActionExam
