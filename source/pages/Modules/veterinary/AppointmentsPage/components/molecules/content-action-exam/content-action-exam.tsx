import Tag from '~/Components/atoms/tag'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { Option } from '~/Components/organism/list-horizontal-switch'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { TypeAction } from '~/types/appointment'
import type { CtxStepAnamnese } from '../../validations.yup'

type ContentActionExamProps<T> = {
    index: number
    option: Option<T>
    onChangeTypeAction: (props: {
        index: number
        type: TypeAction
        option: Option<T>
    }) => void
}

const ContentActionExam = <T,>({
    option,
    onChangeTypeAction,
}: ContentActionExamProps<T>) => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()

    const index = values.exams_anamnesis?.complementary_exams?.findIndex(
        (item) => item?.id === option.value,
    )

    const item = values.exams_anamnesis?.complementary_exams?.[index] ?? {}
    const name = `exams_anamnesis.complementary_exams.${index}`

    return (
        <section className="px-4 py-2">
            <div className="flex w-full gap-1 font-sans text-xs text-gray-500 uppercase justify-evenly">
                <Tag
                    name={`${name}.type_action`}
                    disabled={!item?.checked}
                    selected={item?.type_action === TypeAction.collect}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            type: TypeAction.collect,
                            option: item as any,
                        })
                    }
                >
                    Coletar
                </Tag>
                <Tag
                    name={`${name}.type_action`}
                    disabled={!item?.checked}
                    selected={item?.type_action === TypeAction.perform}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            type: TypeAction.perform,
                            option: item as any,
                        })
                    }
                >
                    Realizar
                </Tag>
                <Tag
                    name={`${name}.type_action`}
                    disabled={!item?.checked}
                    selected={item?.type_action === TypeAction.request}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            type: TypeAction.request,
                            option: item as any,
                        })
                    }
                >
                    Solicitar
                </Tag>
            </div>
            <FieldTextArea
                label="Observações"
                name={`${name}.notes` as ''}
                disabled={!item?.checked}
            />
        </section>
    )
}

export default ContentActionExam
