import { Formik } from 'formik'
import { useMemo, useState } from 'react'
import type { IconType } from 'react-icons'
import { FaArrowLeft, FaArrowRight, FaRunning } from 'react-icons/fa'
import { GiBrain, GiKidneys, GiLungs, GiStomach } from 'react-icons/gi'
import * as Yup from 'yup'
import ControlSwitchDiv from '~/Components/molecules/control-switch-div'
import type { OptionSelect } from '~/Components/molecules/field-control'
import OptionsMenu from '~/Components/molecules/options-menu'
import { makeTitle } from '~/Components/molecules/options-menu/options-menu'
import type { KeyOfQuestionTypes, Question } from '~/constants/anamnese-questions'
import {
    OPTION_BOOLEAN,
    type QuestionAnamnesis,
    type VeterinaryConsultation,
} from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'

export type CtxStepAnamnese = Pick<
    VeterinaryConsultation,
    'anamnesis' | 'details_pet_consultation' | 'dates_consults'
>

const validationSchema = Yup.object().shape<RecordsShapeYup<QuestionAnamnesis>>({
    name_anamnesis: Yup.string().optional(),
    type_anamnesis: Yup.object().shape({
        value: Yup.string().required('Campo obrigatório'),
        label: Yup.string().required('Campo obrigatório'),
    }),
    notes_anamnesis: Yup.string().optional(),
    options_anamnesis: Yup.string()
        .oneOf(['no', 'yes', 'other'])
        .required('Campo obrigatório'),
})

type CardInputProps = {
    items: Question[]
    handleChange?: (value: QuestionAnamnesis) => void
}

const STEPS: {
    label: string
    value: KeyOfQuestionTypes
    icon?: IconType
}[] = [
    {
        label: 'Sistema Digestivo',
        value: 'digestive_sys',
        icon: GiStomach,
    },
    {
        label: 'Sistema Respiratório',
        value: 'respiratory_sys',
        icon: GiLungs,
    },
    {
        label: 'Sistema Urinário',
        value: 'urinary_sys',
        icon: GiKidneys,
    },
    {
        label: 'Sistema Nervoso',
        value: 'nervous_sys',
        icon: GiBrain,
    },
    {
        value: 'locomotive_sys',
        label: 'Sistema Locomotor',
        icon: FaRunning,
    },
]

export const makeOptions = (items: Question[], category: KeyOfQuestionTypes) => {
    const filtered = items.reduce(
        (acc, item) => {
            if (item.type === category) {
                acc.push({
                    type: item.type,
                    value: `${item.id}`,
                    label: item.question,
                    color: 'rgb(255 200 107);',
                })
            }
            return acc
        },
        [] as (OptionSelect & { type: string })[],
    )

    return filtered
}

const CardInputAnamnese = ({ items, handleChange }: CardInputProps) => {
    const [category, setCategory] = useState<{
        label: string
        value: KeyOfQuestionTypes
    }>(STEPS[0])

    const options = useMemo(
        () => makeOptions(items, category.value),
        [category, items],
    )

    const initialValues = useMemo(() => {
        return options.reduce(
            (acc, item) => {
                return {
                    // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
                    ...acc,
                    [item.value]: false,
                }
            },
            {} as Record<string, boolean>,
        )
    }, [options])

    const keyPressLeft = () => {
        setCategory((prev) => {
            const index = STEPS.findIndex((item) => item.value === prev.value)
            const next = STEPS[index - 1]
            if (next) {
                return next
            }
            return prev
        })
    }

    const keyPressRight = () => {
        setCategory((prev) => {
            const index = STEPS.findIndex((item) => item.value === prev.value)
            const next = STEPS[index + 1]
            if (next) {
                return next
            }
            return prev
        })
    }

    return (
        <>
            <h4 className="font-sans mb-2 text-center font-semibold uppercase mobile:underline mobile:text-primary-500 mobile:font-bold">
                {makeTitle(category.label, false)}
            </h4>
            <div className="flex flex-row w-full justify-between flex-wrap mb-4">
                {STEPS.map((item) => (
                    <OptionsMenu
                        item={item as any}
                        option={category}
                        classNames={{
                            label: 'mobile:hidden',
                        }}
                        onChangeOption={(item) =>
                            setCategory({
                                ...item,
                                label: item.label,
                                value: item.value as KeyOfQuestionTypes,
                            })
                        }
                    />
                ))}
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => {}}
            >
                {({ values }) => (
                    <section className="mobile:gap-4 ">
                        {options.map((item) => (
                            <ControlSwitchDiv
                                initialValue={null}
                                ctx={values}
                                onChange={(e) =>
                                    handleChange?.({
                                        id: item.value,
                                        name_anamnesis: item.label,
                                        notes_anamnesis: '',
                                        type_anamnesis: item.type,
                                        options_anamnesis:
                                            OPTION_BOOLEAN[
                                                String(e) as OPTION_BOOLEAN
                                            ],
                                    })
                                }
                                name={item.value as string}
                                label={item.label}
                            />
                        ))}
                        <div className="flex w-full justify-between mt-4">
                            <button
                                onClick={keyPressLeft}
                                type="button"
                                className="btn bg-secondary-500 text-gray-500"
                            >
                                <FaArrowLeft />
                            </button>

                            <button
                                onClick={keyPressRight}
                                type="button"
                                className="btn bg-secondary-500 text-gray-500"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    </section>
                )}
            </Formik>
        </>
    )
}

export default CardInputAnamnese
