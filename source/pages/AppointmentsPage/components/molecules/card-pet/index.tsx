import { useMemo } from 'react'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { Breed } from '~/store/slices/pets/breedType'
import { Gender, Species } from '~/store/slices/pets/speciesType'
import { VeterinaryConsultation } from '~/types/appointment'
import { calcAge } from '~/utils/calc-age'

type CtxCard = Pick<VeterinaryConsultation, 'tutor_pet_vet'>

const CardPet = () => {
    const { values } = useFormikContextSafe<CtxCard>()

    const specie = useMemo(
        () => Species[values.tutor_pet_vet?.pet?.specie as keyof typeof Species],
        [values.tutor_pet_vet?.pet?.specie],
    )
    const race = useMemo(
        () => values.tutor_pet_vet?.pet?.race as Breed,
        [values.tutor_pet_vet?.pet?.race],
    )
    const gender = useMemo(
        () => Gender[values.tutor_pet_vet?.pet?.sex as Gender],
        [values.tutor_pet_vet?.pet?.sex],
    )

    return (
        <section className=" flex flex-col justify-start p-4">
            <div className="gap-2 flex-wrap flex mt-2">
                <p className="text-gray-500 flex justify-start">
                    <strong className="mr-2">Pet:</strong>
                    <span>{`${values.tutor_pet_vet?.pet?.name_pet}, ${specie}, ${race}`}</span>
                </p>
                <p className="text-gray-500">
                    <strong className="mr-2">Idade:</strong>
                    {calcAge(values.tutor_pet_vet?.pet?.date_birth)} Anos
                </p>
                <p className="text-gray-500">
                    <strong className="mr-2">Sexo:</strong>
                    {gender}
                </p>
            </div>
            <div className="gap-2 flex-wrap flex mt-2">
                <p className="text-gray-500">
                    <strong className="mr-2">Tutor:</strong>
                    {values.tutor_pet_vet?.tutor?.name}
                </p>
            </div>
        </section>
    )
}

export default CardPet
