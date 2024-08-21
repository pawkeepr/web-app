import { useEffect, useMemo, useState } from 'react'
import { VaccinationsItems } from '~/constants/vaccinations'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type {
    QuestionVaccination,
    VeterinaryConsultation,
} from '~/types/appointment'
import { Species } from '~/types/speciesType'
import CardSimplePet from '../../molecules/card-simple-pet'
import OptionsSpecies from '../../molecules/options-species'
import VaccinationsOptions from '../../organism/vaccinations-options/vaccinations-options'
import { screen } from '../styles'

const STEPS: {
    label: string
    value: Species
}[] = [
    { label: 'Cachorro', value: Species.dog },
    { label: 'Gato', value: Species.cat },
    { label: 'Equino', value: Species.equine },
    { label: 'Coelho', value: Species.rabbit },
    { label: 'Ave', value: Species.bird },
    { label: 'Peixe', value: Species.fish },
    { label: 'Répteis', value: Species.chelonians },
    { label: 'Serpente', value: Species.serpent },
    { label: 'Lagarto', value: Species.lizard },
    { label: 'Bovino', value: Species.bovine },
    { label: 'Suíno', value: Species.pig },
    { label: 'Ave', value: Species.chicken },
    { label: 'Caprino', value: Species.caprine },
    { label: 'Roedor', value: Species.rodent },
]

export type CtxVaccination = {
    vaccinations: QuestionVaccination[]
} & Pick<VeterinaryConsultation, 'tutor_pet_vet'>

const StepVaccination = () => {
    const [specie, setSpecie] = useState<Species | null>(null)
    const { values } = useFormikContextSafe<CtxVaccination>()

    useEffect(() => {
        const specie = values.tutor_pet_vet?.pet?.specie
        if (specie) {
            setSpecie(specie as Species)
        }
    }, [values.tutor_pet_vet?.pet?.specie])

    const items = useMemo(() => {
        return VaccinationsItems[specie || Species.unknown].map(
            (item, index) =>
                ({
                    label: item.name,
                    value: index,
                    type: specie || Species.unknown,
                    checked: false,
                    batch: '',
                    brand: '',
                    date_next_application: '',
                    dose: null,
                    notes: '',
                    revaccination_annual: false,
                }) as QuestionVaccination,
        )
    }, [specie])

    const steps = useMemo(() => {
        if (!specie) return STEPS

        return STEPS.filter((item) => item.value === specie)
    }, [specie])

    return (
        <>
            <CardSimplePet />
            <h4 className="font-sans text-base font-semibold text-center capitalize">
                Plano de Vacinação
            </h4>
            <OptionsSpecies
                condition={!specie}
                onChange={(item) => {
                    setSpecie(item.value as Species)
                }}
            />
            <div className={screen({ className: 'px-1 w-full overflow-y-hidden' })}>
                <VaccinationsOptions
                    steps={steps}
                    items={items}
                    specie={specie as Species}
                />
            </div>
        </>
    )
}

export default StepVaccination
