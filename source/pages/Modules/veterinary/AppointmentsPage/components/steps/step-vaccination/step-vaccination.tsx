import { useEffect, useState } from 'react'
import type { IconType } from 'react-icons'
import { FaCat, FaDog } from 'react-icons/fa'
import ListHorizontalSwitch from '~/Components/organism/list-horizontal-switch'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { ComplementaryExam, TypeAction } from '~/types/appointment'
import { Species } from '~/types/speciesType'
import CardSimplePet from '../../molecules/card-simple-pet'
import ContentActionVaccination from '../../molecules/content-action-vaccination'
import OptionsSpecies from '../../molecules/options-species'
import type { CtxStepTreatment } from '../../validations.yup'
import { screen } from '../styles'

const STEPS: {
    label: string
    value: Species
    icon?: IconType
}[] = [
    { label: 'Cachorro', value: Species.dog, icon: FaDog },
    { label: 'Gato', value: Species.cat, icon: FaCat },
]

const StepVaccination = () => {
    const [specie, setSpecie] = useState<Species | null>(null)
    const { values } = useFormikContextSafe<CtxStepTreatment>()

    useEffect(() => {
        const specie = values.tutor_pet_vet?.pet?.specie
        if (specie) {
            setSpecie(specie as Species)
        }
    }, [values.tutor_pet_vet?.pet?.specie])

    return (
        <>
            <CardSimplePet />
            <h4 className="font-sans text-base font-semibold text-center capitalize">
                Plano de Vacinação
            </h4>
            <div className={screen({ className: 'px-1 w-full overflow-y-hidden' })}>
                <OptionsSpecies
                    condition={!specie}
                    onChange={(item) => {
                        setSpecie(item.value as Species)
                    }}
                />
                <ListHorizontalSwitch
                    ctx={values}
                    visibleMenu={false}
                    content={({ option, index, replace }) => (
                        <ContentActionVaccination
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
                    items={[
                        {
                            checked: false,
                            label: 'Gripe',
                            type_action: 'vaccination',
                            type: specie as string,
                            value: 1,
                        },
                    ]}
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

export default StepVaccination
