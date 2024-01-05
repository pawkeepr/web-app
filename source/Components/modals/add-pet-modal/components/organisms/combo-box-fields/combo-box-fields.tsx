import { useFormikContext } from "formik"
import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select"
import { BloodType } from "~/store/slices/pets/bloodType"
import { Breed } from "~/store/slices/pets/breedType"
import { Gender, SpeciesType, species } from '~/store/slices/pets/speciesType'

type AuxSpeciesFormikProps = {
    id?: string
    specie: SpeciesType
    breed: Breed
    bloodType: BloodType
    sex: Gender
}

type ComboBoxFieldsProps = {
    name?: string
}

const ComboBoxFields = ({ name }: ComboBoxFieldsProps) => {

    const [specie, setSpecie] = useState<SpeciesType>({} as SpeciesType)
    const [breedValue, setBreedValue] = useState('')
    const [bloodTypeValue, setBloodTypeValue] = useState('')

    const { setFieldValue, values: pet } = useFormikContext<AuxSpeciesFormikProps>()

    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        if (!pet?.id) {
            return
        }

        const specie = species.find(specie => (specie.name as any) === pet.specie)

        if (!specie) {
            return
        }

        startTransition(() => {
            setSpecie(specie)
            setFieldValue('specie', specie.name)
            setFieldValue('race', pet.breed)
            setFieldValue('blood_type', pet.bloodType)
        })


    }, [pet, setFieldValue])

    const memoNameSpecies = !name ? 'specie' : `${name}.specie`
    const memoNameBreed = !name ? 'race' : `${name}.race`
    const memoNameBloodType = !name ? 'blood_type' : `${name}.blood_type`


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
            <FieldControlSelect
                options={memoSpecies}
                required
                disabled={isPending || !!pet.id}
                onChangeValue={onChangeSpecie}
                name={memoNameSpecies}
                placeholder="Ex: Cachorro, Gato, etc..."
                label="Espécie" />


            <FieldControlSelect
                options={memoBreed}
                disabled={!specie.breedType || isPending || !!pet.id}
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
                disabled={!specie.bloodType || isPending || !!pet.id}
                required
                name={memoNameBloodType}
                label="Tipo Sanguíneo"
                placeholder="Ex: A, B, etc..." />
        </>
    )
}

export default ComboBoxFields