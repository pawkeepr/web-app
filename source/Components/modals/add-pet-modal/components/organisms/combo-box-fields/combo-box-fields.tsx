import { useFormikContext } from "formik"
import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import FieldControl from "~/Components/molecules/field-control/field-control"
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select"
import FieldMasked from "~/Components/molecules/field-masked"
import { BloodType } from "~/store/slices/pets/bloodType"
import { Breed } from "~/store/slices/pets/breedType"
import { genderValues } from "~/store/slices/pets/sexType"
import { SpeciesType, species } from '~/store/slices/pets/speciesType'

type AuxSpeciesFormikProps = {
    species: SpeciesType
    breed: string
    bloodType: string
    pet_data: {
        sex: any
        id?: string
        species: SpeciesType
        breed: Breed
        bloodType: BloodType
    }
}

type ComboBoxFieldsProps = {
    name?: string
}

const ComboBoxFields = ({ name }: ComboBoxFieldsProps) => {

    const [specie, setSpecie] = useState<SpeciesType>({} as SpeciesType)
    const [breedValue, setBreedValue] = useState('')
    const [bloodTypeValue, setBloodTypeValue] = useState('')

    const { setFieldValue, values } = useFormikContext<AuxSpeciesFormikProps>()

    const [isPending, startTransition] = useTransition()

    const pet = values['pet_data']

    useEffect(() => {
        if (!pet?.id) {
            return
        }

        const specie = species.find(specie => (specie.name as any) === pet.species)

        if (!specie) {
            return
        }

        startTransition(() => {
            setSpecie(specie)
            setFieldValue('breed', pet.breed)
            setFieldValue('bloodType', pet.bloodType)
        })


    }, [pet, setFieldValue])

    const memoNameSpecies = !name ? 'pet_data.specie' : `${name}.specie`
    const memoNameBreed = !name ? 'pet_data.breed' : `${name}.breed`
    const memoNameBloodType = !name ? 'pet_data.blood_type' : `${name}.bloodType`


    const onChangeSpecie = useCallback((specie: SpeciesType) => {
        startTransition(() => {
            setSpecie(specie)
            setFieldValue(memoNameBreed, null)
            setFieldValue(memoNameBloodType, null)
            setBreedValue('')
            setBloodTypeValue('')

        })

    }, [setFieldValue, memoNameBreed, memoNameBloodType])

    const memoSpecies = useMemo(() => {
        return species.map(({ name, value, ...specie }) => ({ label: name, value: value, ...specie }))
    }, [])

    const memoBreed = useMemo(() => {
        return specie?.breedType?.map(({ name, value, ...breed }) => ({ label: name, value: value, ...breed }))
    }, [specie])

    const memoBloodType = useMemo(() => {
        return specie?.bloodType?.map(({ name, value, ...bloodType }) => ({ label: name, value: value, ...bloodType }))
    }, [specie])

    return (
        <>
            <div className="w-full grid grid-cols-2 mobile:grid-cols-1 gap-2">
                <FieldControlSelect
                    options={memoSpecies}
                    required
                    disabled={isPending || !!values.pet_data?.id}
                    onChangeValue={onChangeSpecie}
                    name={memoNameSpecies}
                    placeholder="Ex: Cachorro, Gato, etc..."
                    label="Espécie" />


                <FieldControlSelect
                    options={memoBreed}
                    disabled={!specie.breedType || isPending || !!values.pet_data?.id}
                    onChangeValue={e => setBreedValue(e)}
                    value={breedValue}
                    required
                    name={memoNameBreed}
                    label="Raça"
                    placeholder="Ex: Vira-lata, Poodle, etc..." />

                <FieldControlSelect
                    options={memoBloodType}
                    onChangeValue={e => setBloodTypeValue(e)}
                    value={bloodTypeValue}
                    disabled={!specie.bloodType || isPending || !!values.pet_data?.id}
                    required
                    name={memoNameBloodType}
                    label="Tipo Sanguíneo"
                    placeholder="Ex: A, B, etc..." />

                <FieldControlSelect
                    options={genderValues as any}
                    disabled={!!values.pet_data?.id}
                    name="pet_data.sex"
                    required
                    label="Sexo do Pet"
                    placeholder="Macho/Fêmea..." />
            </div>
            <div className="flex md:flex-row flex-col mt-2 mb-2 gap-2">

                <FieldControl
                    label={`Data de nascimento`}
                    required
                    name={`pet_data.date_birth`}
                    type="date"
                />

                <FieldMasked
                    label={`Número do microchip`}
                    name={`pet_data.microchip`}
                    mask="_____"
                    placeholder="Digite o número do microchip (opcional)"
                />

                <FieldMasked
                    label={`Número de registro cartório`}
                    name={`pet_data.identification_number`}
                    mask="_____"
                    placeholder="Digite o número do registro (opcional)"
                />

            </div>
        </>
    )
}

export default ComboBoxFields