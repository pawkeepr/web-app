import { useFormikContext } from "formik"
import { InitialValues } from "~/pages/AppointmentsPage/Appointments"
import { Gender, KeyOfGender, KeyOfSpecies, Species } from "~/store/slices/pets/speciesType"
import { calcAge } from "~/utils/calc-age"

const CardPet = () => {

    const { values } = useFormikContext<InitialValues>()

    return (
        <section className=" flex flex-col justify-start p-4">
            <div className="gap-2 flex-wrap flex mt-2">
                <p className="text-gray-500 flex justify-start">
                    <strong className="mr-2">Pet:</strong>
                    <span>
                        {
                            `${values.pet_data?.name_pet}, ${Species[(values.pet_data?.specie as Species) as unknown as KeyOfSpecies]}, ${values.pet_data?.race as string}`
                        }
                    </span>
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
            <div className="gap-2 flex-wrap flex mt-2">
                <p className="text-gray-500">
                    <strong className="mr-2">Tutor:</strong>
                    {values.name_tutor}
                </p>
            </div>
        </section>
    )
}

export default CardPet