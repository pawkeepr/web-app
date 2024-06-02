import Tag from '~/Components/atoms/tag'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { Option } from '~/Components/organism/list-horizontal-switch'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { TypeDosage } from '~/types/appointment'
import type { CtxStepAnamnese } from '../../validations.yup'

type ContentActionExamProps<T> = {
    index: number
    option: Option<T>
    onChangeTypeAction: (props: {
        index: number
        type: TypeDosage
        option: Option<T>
    }) => void
}

const ContentActionVaccination = <T,>({
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
                    selected={item?.type_action === TypeDosage.first}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            type: TypeDosage.first,
                            option: item as any,
                        })
                    }
                >
                    1ª Dose
                </Tag>
                <Tag
                    name={`${name}.type_action`}
                    disabled={!item?.checked}
                    selected={item?.type_action === TypeDosage.second}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            type: TypeDosage.second,
                            option: item as any,
                        })
                    }
                >
                    2ª Dose
                </Tag>
                <Tag
                    name={`${name}.type_action`}
                    disabled={!item?.checked}
                    selected={item?.type_action === TypeDosage.third}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            type: TypeDosage.third,
                            option: item as any,
                        })
                    }
                >
                    3ª Dose
                </Tag>
                <Tag
                    name={`${name}.type_action`}
                    disabled={!item?.checked}
                    selected={item?.type_action === TypeDosage.fourth}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            type: TypeDosage.fourth,
                            option: item as any,
                        })
                    }
                >
                    4ª Dose
                </Tag>
                <Tag
                    name={`${name}.type_action`}
                    disabled={!item?.checked}
                    selected={item?.type_action === TypeDosage.n_th}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            type: TypeDosage.n_th,
                            option: item as any,
                        })
                    }
                >
                    Nª Dose
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

export default ContentActionVaccination
