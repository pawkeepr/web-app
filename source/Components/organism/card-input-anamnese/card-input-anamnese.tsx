import cn from 'classnames'
import { Formik } from 'formik'
import { useMemo, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import * as Yup from 'yup'
import ControlSwitchDiv from '~/Components/molecules/control-switch-div'
import type { OptionSelect } from '~/Components/molecules/field-control'
import type { KeyOfQuestionTypes, Question } from '~/constants/anamnese-questions'
import useKeyboardNavigation from '~/hooks/use-keyboard-navigation'
import useResizeMobile from '~/hooks/use-resize-mobile'
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
    title: string
    value: KeyOfQuestionTypes
}[] = [
    {
        title: 'Sistema Digestivo',
        value: 'digestive_sys',
    },
    {
        title: 'Sistema Respiratório',
        value: 'respiratory_sys',
    },
    {
        title: 'Sistema Urinário',
        value: 'urinary_sys',
    },
    {
        title: 'Sistema Nervoso',
        value: 'nervous_sys',
    },
    {
        value: 'locomotive_sys',
        title: 'Sistema Locomotor',
    },
    {
        value: 'physical_activity',
        title: 'Atividade Física',
    },
]

export const makeTitle = (title: string, isMobile: boolean) => {
    if (isMobile) {
        return title
            .split(' ')
            .map((item) => item[0])
            .join('')
    }

    return title
}

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
        title: string
        value: KeyOfQuestionTypes
    }>(STEPS[0])
    const { isMobile } = useResizeMobile()

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

    useKeyboardNavigation({
        ArrowLeft: keyPressLeft,
        ArrowRight: keyPressRight,
    })

    return (
        <div
            className="
                gap-2 flex flex-col card shadow-2xl p-8 
                border-secondary-500 border-2 relative
                mobile:p-2 mobile:border  mobile:!shadow-none
                min-h-[420px]  rounded-sm
            "
        >
            <h4 className="font-sans text-center font-semibold uppercase">
                {makeTitle(category.title, false)}
            </h4>
            <div className="flex flex-row w-full justify-between flex-wrap mb-4">
                {STEPS.map((item) => (
                    <button
                        type="button"
                        onClick={() => setCategory(item)}
                        key={item.value}
                        className={cn(
                            'p-2 text-center uppercase bg-opacity-10 bg-primary-500 flex-1 w-full',
                            {
                                'text-primary-500': category.value === item.value,
                                'text-gray-400': category.value !== item.value,
                            },
                        )}
                    >
                        {makeTitle(item.title, isMobile)}
                    </button>
                ))}
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => {}}
            >
                {({ values }) => (
                    <section className="px-4">
                        {options.map((item) => (
                            <ControlSwitchDiv
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
                                divClassName="col-span-1 mobile:col-span-full"
                            />
                        ))}
                    </section>
                )}
            </Formik>
            <button
                onClick={keyPressRight}
                type="button"
                className="btn btn-primary absolute bottom-4 right-4"
            >
                <FaArrowRight />
            </button>

            <button
                onClick={keyPressLeft}
                type="button"
                className="btn btn-primary absolute bottom-4 left-4"
            >
                <FaArrowLeft />
            </button>
        </div>
    )
}

export default CardInputAnamnese
