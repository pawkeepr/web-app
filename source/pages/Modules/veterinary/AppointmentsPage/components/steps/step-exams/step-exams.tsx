import { useMemo } from 'react'
import type { IconType } from 'react-icons'
import {
    GiChemicalDrop,
    GiRadiations,
    GiShieldBash,
    GiTestTubes,
} from 'react-icons/gi'
import ListHorizontalSwitch from '~/Components/organism/list-horizontal-switch'
import { ExamsTypes, type KeyOfExamsTypes } from '~/constants'
import { exams } from '~/constants/exams-questions'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { ComplementaryExam, TypeAction } from '~/types/appointment'
import CardSimplePet from '../../molecules/card-simple-pet'
import ContentActionExam from '../../molecules/content-action-exam'
import type { CtxStepAnamnese } from '../../validations.yup'
import { screen } from '../styles'

const STEPS: {
    label: string
    value: KeyOfExamsTypes
    icon?: IconType
}[] = [
    { label: 'Hematologia', value: ExamsTypes.hematology, icon: GiTestTubes },
    { label: 'Bioquímica', value: ExamsTypes.biochemistry, icon: GiChemicalDrop },
    {
        label: 'Parasitologia',
        value: ExamsTypes.parasitology,
        icon: GiChemicalDrop,
    },
    { label: 'Imunologia', value: ExamsTypes.immunology, icon: GiShieldBash },
    { label: 'Urinálise', value: ExamsTypes.urinalysis, icon: GiChemicalDrop },
    {
        label: 'Ultrassonografia / Radiologia',
        value: ExamsTypes.ultrasound_radiology,
        icon: GiRadiations,
    },
]

const StepExams = () => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()

    const examsItems = useMemo(() => {
        return exams.map((item) => ({
            ...item,
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            type: item.type as any,
            value: item.id,
            type_action: null,
            checked: false,
        }))
    }, [exams])

    return (
        <>
            <CardSimplePet />
            <h4 className="font-sans text-base font-semibold text-center capitalize">
                Exames
            </h4>
            <div className={screen({ className: 'px-1 w-full overflow-y-hidden' })}>
                <ListHorizontalSwitch
                    ctx={values}
                    content={({ option, index, replace }) => (
                        <ContentActionExam
                            index={index}
                            option={option}
                            onChangeTypeAction={({ index, option, type }) => {
                                const item = {
                                    ...option,
                                    type_action: type,
                                }
                                replace?.(index, item)
                            }}
                        />
                    )}
                    items={examsItems}
                    name="exams_anamnesis.complementary_exams"
                    categories={STEPS}
                    onChange={({ option, step, checked, replace }) => {
                        const item = {
                            id: option.value,
                            name_exam: option.label,
                            notes: '',
                            type_exam: step,
                            type_action: option.type_action as TypeAction,
                            checked,
                        } as ComplementaryExam & { id: number; checked: boolean }
                        replace?.(option.value as number, item)
                    }}
                />
            </div>
        </>
    )
}

export default StepExams
