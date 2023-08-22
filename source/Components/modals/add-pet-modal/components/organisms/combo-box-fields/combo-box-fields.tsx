/* eslint-disable react-hooks/exhaustive-deps */
import { useFormikContext } from "formik"
import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select"
import { BloodType } from "~/store/pets/bloodType"
import { Breed } from "~/store/pets/breedType"
import { SpeciesType, species } from '~/store/pets/speciesType'

type AuxSpeciesFormikProps = {
    species: SpeciesType
    breed: string
    bloodType: string
    pet: {
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

    const { setFieldValue, values } = useFormikContext<AuxSpeciesFormikProps>()

    const [isPending, startTransition] = useTransition()

    const pet = values['pet']

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


    }, [pet])

    const memoNameSpecies = !name ? 'species' : `${name}.species`
    const memoNameBreed = !name ? 'breed' : `${name}.breed`
    const memoNameBloodType = !name ? 'bloodType' : `${name}.bloodType`


    const onChangeSpecie = useCallback((specie: SpeciesType) => {
        startTransition(() => {
            setSpecie(specie)
            setFieldValue(memoNameBreed, null)
            setFieldValue(memoNameBloodType, null)
        })

    }, [memoNameBreed, memoNameBloodType])

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
        <div className="w-full grid grid-cols-3 mobile:grid-cols-1 gap-2">
            <FieldControlSelect
                options={memoSpecies}
                required
                disabled={isPending || !!values.pet?.id}
                onChangeValue={onChangeSpecie}
                name={memoNameSpecies}
                placeholder="Ex: Cachorro, Gato, etc..."
                label="Espécie"
            />


            <FieldControlSelect
                options={memoBreed}
                disabled={!specie.breedType || isPending || !!values.pet?.id}
                required
                name={memoNameBreed}
                label="Raça"
                placeholder="Ex: Vira-lata, Poodle, etc..."
            />

            <FieldControlSelect
                options={memoBloodType}
                disabled={!specie.bloodType || isPending || !!values.pet?.id}
                required
                name={memoNameBloodType}
                label="Tipo Sanguíneo"
                placeholder="Ex: A, B, etc..."
            />
        </div>
    )
}

export default ComboBoxFields