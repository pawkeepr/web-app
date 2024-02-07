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
import type { QuestionAnamnesis, VeterinaryConsultation } from '~/types/appointment'
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
    list_notes_anamnesis: Yup.array().optional(),
    options_anamnesis: Yup.string()
        .oneOf(['no', 'yes', 'other'])
        .required('Campo obrigatório'),
    logical_list_default_anamnesis: Yup.string().oneOf(['logical']).optional(),
})

type CardInputProps = {
    items: Question[]
}

const STEPS: {
    title: string
    value: KeyOfQuestionTypes
}[] = [
    {
        title: 'Sistema Digestivo',
        value: 'digestive_system',
    },
    {
        title: 'Sistema Respiratório',
        value: 'respiratory_system',
    },
    {
        title: 'Sistema Urinário',
        value: 'urinary_system',
    },
    {
        title: 'Sistema Nervoso',
        value: 'nervous_system',
    },
    {
        value: 'locomotive_system',
        title: 'Sistema Locomotor',
    },
    {
        value: 'physical_activity',
        title: 'Atividade Física',
    },
]

const makeTitle = (title: string, isMobile: boolean) => {
    if (isMobile) {
        return title
            .split(' ')
            .map((item) => item[0])
            .join('')
    }

    return title
}

const makeOptions = (items: Question[], category: KeyOfQuestionTypes) => {
    const filtered = items.reduce((acc, item) => {
        if (item.type === category) {
            acc.push({
                type: item.type,
                value: `${item.id}`,
                label: item.question,
                color: 'rgb(255 200 107);',
            })
        }
        return acc
    }, [] as OptionSelect[])

    return filtered
}

const CardInputAnamnese = ({ items }: CardInputProps) => {
    const [category, setCategory] = useState<KeyOfQuestionTypes>('digestive_system')
    const { isMobile } = useResizeMobile()

    const options = useMemo(() => makeOptions(items, category), [category, items])

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
            const index = STEPS.findIndex((item) => item.value === prev)
            const next = STEPS[index - 1]
            if (next) {
                return next.value
            }
            return prev
        })
    }

    const keyPressRight = () => {
        setCategory((prev) => {
            const index = STEPS.findIndex((item) => item.value === prev)
            const next = STEPS[index + 1]
            if (next) {
                return next.value
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
            border-primary-500 border-2 relative
            mobile:p-0 mobile:border-none mobile:!shadow-none mobile:!rounded-none
            min-h-[420px]
        
        "
        >
            <div className="flex flex-row w-full justify-between flex-wrap mb-4">
                {STEPS.map((item) => (
                    <button
                        type="button"
                        onClick={() => setCategory(item.value)}
                        key={item.value}
                        className={cn(
                            'p-2 text-center uppercase bg-opacity-10 bg-primary-500 flex-1 w-full',
                            {
                                'text-primary-500': category === item.value,
                                'text-gray-400': category !== item.value,
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
                    <>
                        {options.map((item) => (
                            <ControlSwitchDiv
                                ctx={values}
                                name={item.value as string}
                                label={item.label}
                                divClassName="col-span-1 mobile:col-span-full"
                            />
                        ))}
                    </>
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
