import { useMemo } from 'react'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { VeterinaryConsultation } from '~/types/appointment'
import { BreedNames } from '~/types/breedType'
import { Species } from '~/types/speciesType'

const CardSimplePet = () => {
    const { values } = useFormikContextSafe<VeterinaryConsultation>()
    const specie = useMemo(
        () => Species[values.tutor_pet_vet?.pet?.specie as keyof typeof Species],
        [values.tutor_pet_vet?.pet?.specie],
    )

    const race = useMemo(
        () =>
            BreedNames[values.tutor_pet_vet?.pet?.race as keyof typeof BreedNames],
        [values.tutor_pet_vet?.pet?.race],
    )

    return (
        <p className="text-gray-500 p-2 justify-start">
            <strong className="mr-2">Pet:</strong>
            <span>{`${values.tutor_pet_vet?.pet?.name_pet}, ${specie}, ${race}`}</span>
        </p>
    )
}

export default CardSimplePet
