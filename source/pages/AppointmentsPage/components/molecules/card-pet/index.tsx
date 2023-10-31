import { useFormikContext } from "formik"
import { InitialValues } from "~/pages/AppointmentsPage/Appointments"
import { Gender, KeyOfGender, KeyOfSpecies, Species } from "~/store/slices/pets/speciesType"
import { calcAge } from "~/utils/calc-age"
import PetAvatar from "../../atoms/pet-avatar"

const CardPet = () => {

    const { values } = useFormikContext<InitialValues>()

    return (
        <section className=" flex flex-col justify-start p-4">
            <PetAvatar name={values.pet_data?.name_pet as string} />
            <div className="gap-2 flex-wrap flex mt-2">
                <p className="text-gray-500">
                    <strong className="mr-2">Espécie:</strong>
                    {Species[values.pet_data?.specie as KeyOfSpecies]}
                </p>
                <p className="text-gray-500">
                    <strong className="mr-2">Raça:</strong>
                    {values.pet_data?.race}
                </p>
                <p className="text-gray-500">
                    <strong className="mr-2">Idade:</strong>
                    {calcAge(values.pet_data?.date_birth)} Anos
                </p>
                <p className="text-gray-500">
                    <strong className="mr-2">Sexo:</strong>
                    {Gender[values.pet_data?.sex as KeyOfGender]}
                </p>
            </div>
        </section>
    )
}

export default CardPet