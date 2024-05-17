import { Formik } from 'formik'
import { useMemo, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import * as Yup from 'yup'
import ControlToggle from '~/Components/molecules/control-toggle'
import type { OptionSelect } from '~/Components/molecules/field-control'
import OptionsMenu from '~/Components/molecules/options-menu'
import { makeTitle } from '~/Components/molecules/options-menu/options-menu'
import type { Exams, KeyOfExamsTypes } from '~/constants/exams-questions'
import useKeyboardNavigation from '~/hooks/use-keyboard-navigation'
import {
    OPTION_BOOLEAN,
    type ComplementaryExam,
    type QuestionAnamnesis,
    type VeterinaryConsultation,
} from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'

export type CtxStepAnamnese = Pick<
    VeterinaryConsultation,
    'anamnesis' | 'details_pet_consultation' | 'dates_consults'
>

const validationSchema = Yup.object().shape<RecordsShapeYup<ComplementaryExam>>({
    type_exam: Yup.string().required(),
    list_exams: Yup.array().of(Yup.string()),
    notes: Yup.string().optional(),
})

type CardInputProps = {
    items: Exams[]
    handleChange?: (value: QuestionAnamnesis) => void
}

import type { IconType } from 'react-icons'
import {
    GiBodyBalance,
    GiChemicalDrop,
    GiHealthNormal,
    GiRadiations,
    GiShieldBash,
    GiTestTubes,
} from 'react-icons/gi'

const STEPS: {
    label: string
    value: KeyOfExamsTypes
    icon?: IconType
}[] = [
    { label: 'Hematologia', value: 'hematology', icon: GiTestTubes },
    { label: 'Bioquímica', value: 'biochemistry', icon: GiChemicalDrop },
    { label: 'Parasitologia', value: 'parasitology', icon: GiChemicalDrop },
    { label: 'Imunologia', value: 'immunology', icon: GiShieldBash },
    { label: 'Urinálise', value: 'urinalysis', icon: GiChemicalDrop },
    { label: 'Local da Lesão', value: 'lesion_location', icon: GiBodyBalance },
    {
        label: 'Ultrassonografia / Radiologia',
        value: 'ultrasound_radiology',
        icon: GiRadiations,
    },
    {
        label: 'Descrição de Lesões',
        value: 'lesion_description',
        icon: GiHealthNormal,
    },
]

export const makeOptions = (items: Exams[], category: KeyOfExamsTypes) => {
    const filtered = items.reduce(
        (acc, item) => {
            if (item.type === category) {
                acc.push({
                    type: item.type,
                    value: `${item.id}`,
                    label: item.exam,
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
        value: KeyOfExamsTypes
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

    useKeyboardNavigation({
        ArrowLeft: keyPressLeft,
        ArrowRight: keyPressRight,
    })

    return (
        <>
            <h4 className="mb-2 font-sans font-semibold text-center uppercase mobile:underline mobile:text-primary-500 mobile:font-bold">
                {makeTitle(category.label, false)}
            </h4>
            <div className="flex flex-row flex-wrap justify-between w-full mb-4">
                {STEPS.map((item) => (
                    <OptionsMenu
                        key={item.value}
                        item={item as any}
                        option={category}
                        classNames={{
                            label: 'mobile:hidden',
                        }}
                        onChangeOption={(item) =>
                            setCategory({
                                ...item,
                                label: item.label,
                                value: item.value as KeyOfExamsTypes,
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
                    <section className="flex-col flex flex-1 !min-h-[460px] ">
                        <div className="flex-[3]">
                            {options.map((item) => (
                                <ControlToggle
                                    key={item.value}
                                    ctx={values}
                                    onChange={(e) =>
                                        handleChange?.({
                                            id: item.value,
                                            checked: e,
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
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={keyPressLeft}
                                className="px-4 py-2 rounded-full bg-secondary-500 hover:bg-secondary-600"
                            >
                                <FaArrowLeft />
                            </button>
                            <button
                                onClick={keyPressRight}
                                type="button"
                                className="px-4 py-2 rounded-full bg-secondary-500 hover:bg-secondary-600"
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
