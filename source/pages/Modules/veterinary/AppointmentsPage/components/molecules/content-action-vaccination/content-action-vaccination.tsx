import Tag from '~/Components/atoms/tag'
import FieldTextArea from '~/Components/molecules/field-text-area'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { TypeDosage, type QuestionVaccination } from '~/types/appointment'
import type { CtxVaccination } from '../../steps/step-vaccination/step-vaccination'

type ContentActionExamProps = {
    index: number
    option: QuestionVaccination
    onChangeTypeAction: (props: {
        index: number
        dose: TypeDosage
        option: QuestionVaccination
    }) => void
}

const ContentActionVaccination = ({
    option,
    onChangeTypeAction,
}: ContentActionExamProps) => {
    const { values } = useFormikContextSafe<CtxVaccination>()

    const index = values.vaccinations?.findIndex(
        (item) => item?.value === option.value,
    )

    const item = values.vaccinations?.[index] ?? {}
    const name = `vaccinations.${index}`

    return (
        <section className="px-4 py-2">
            <div className="flex w-full gap-1 font-sans text-xs text-gray-500 uppercase justify-evenly">
                <Tag
                    name={`${name}.type_action`}
                    disabled={!item?.checked}
                    selected={item?.dose === TypeDosage.first}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            dose: TypeDosage.first,
                            option: item,
                        })
                    }
                >
                    1ª Dose
                </Tag>
                <Tag
                    name={`${name}.type_action`}
                    disabled={!item?.checked}
                    selected={item?.dose === TypeDosage.second}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            dose: TypeDosage.second,
                            option: item,
                        })
                    }
                >
                    2ª Dose
                </Tag>
                <Tag
                    name={`${name}.type_action`}
                    disabled={!item?.checked}
                    selected={item?.dose === TypeDosage.third}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            dose: TypeDosage.third,
                            option: item,
                        })
                    }
                >
                    3ª Dose
                </Tag>
                <Tag
                    name={`${name}.type_action`}
                    disabled={!item?.checked}
                    selected={item?.dose === TypeDosage.fourth}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            dose: TypeDosage.fourth,
                            option: item,
                        })
                    }
                >
                    4ª Dose
                </Tag>
                <Tag
                    name={`${name}.type_action`}
                    disabled={!item?.checked}
                    selected={item?.dose === TypeDosage.n_th}
                    onClick={() =>
                        onChangeTypeAction({
                            index,
                            dose: TypeDosage.n_th,
                            option: item,
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
