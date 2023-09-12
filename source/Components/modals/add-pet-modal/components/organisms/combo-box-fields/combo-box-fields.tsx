import { useFormikContext } from "formik"
import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import FieldControl from "~/Components/molecules/field-control/field-control"
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select"
import { BloodType } from "~/store/pets/bloodType"
import { Breed } from "~/store/pets/breedType"
import { genderValues } from "~/store/pets/sexType"
import { SpeciesType, species } from '~/store/pets/speciesType'



type AuxSpeciesFormikProps = {
    species: SpeciesType
    breed: string
    bloodType: string
    pet: {
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
            setBreedValue('')
            setBloodTypeValue('')

        })

    }, [setFieldValue, memoNameBreed, memoNameBloodType])

    // const onChangeSpecie = (specie: SpeciesType) => {
    //     startTransition(() => {
    //         setSpecie(specie)
    //         setFieldValue(memoNameBreed, null)
    //         setFieldValue(memoNameBloodType, null)
    //     })
    // }

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
                disabled={isPending || !!values.pet?.id}
                onChangeValue={onChangeSpecie}
                name={memoNameSpecies}
                placeholder="Ex: Cachorro, Gato, etc..."
                label="Espécie" />


            <FieldControlSelect
                options={memoBreed}
                disabled={!specie.breedType || isPending || !!values.pet?.id}
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
                disabled={!specie.bloodType || isPending || !!values.pet?.id}
                required
                name={memoNameBloodType}
                label="Tipo Sanguíneo"
                placeholder="Ex: A, B, etc..." />
            <FieldControlSelect
                options={genderValues as any}
                disabled={!!values.pet?.id}
                name="sex"
                required
                label="Sexo do Pet"
                placeholder="Macho/Fêmea..." />
        </div>
            <div className="flex md:flex-row flex-col mt-2 mb-2 gap-2">

                <FieldControl
                    label={`Data de nascimento`}
                    required
                    name={`date_birth`}
                    type="date" />
                <FieldControl
                    label={`Número do microchip`}
                    name={`chip_Number`}
                    type="field masked"
                    mask="_____"
                    placeholder="Digite o número do microchip (opcional)" />
                <FieldControl
                    label={`Número de registro cartório`}
                    name={`id_Office_Register`}
                    type="field masked"
                    mask="_____"
                    placeholder="Digite o número do registro (opcional)" />

            </div>
        </>   
    )
}

export default ComboBoxFields