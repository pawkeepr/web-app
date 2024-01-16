import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { InitialValues } from '~/pages/NewPetPage'
import { species, type SpeciesType } from '~/types/speciesType'

type AuxSpeciesFormikProps = Pick<
    InitialValues,
    'id' | 'sex' | 'race' | 'specie' | 'bloodType'
>

const ComboBoxFields = () => {
    const [specie, setSpecie] = useState<SpeciesType>({} as SpeciesType)
    const [breedValue, setBreedValue] = useState('')
    const [bloodTypeValue, setBloodTypeValue] = useState('')

    const { setFieldValue, values: pet } =
        useFormikContextSafe<AuxSpeciesFormikProps>()

    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        if (!pet?.id) {
            return
        }

        const specie = species.find((specie) => (specie.name as any) === pet.specie)

        if (!specie) {
            return
        }

        startTransition(() => {
            setSpecie(specie)
            setFieldValue('specie', specie.name)
            setFieldValue('race', pet.race)
            setFieldValue('bloodType', pet.bloodType)
        })
    }, [pet, setFieldValue])

    const onChangeSpecie = useCallback(
        (specie: SpeciesType) => {
            startTransition(() => {
                setSpecie(specie)
                setFieldValue('race', null)
                setFieldValue('bloodType', null)
                setBreedValue('')
                setBloodTypeValue('')
            })
        },
        [setFieldValue],
    )

    const memoSpecies = useMemo(() => {
        return species.map(({ name, value, ...specie }) => ({
            label: name,
            value: value,
            ...specie,
        }))
    }, [])

    const memoBreed = useMemo(() => {
        return specie?.breedType?.map(({ name, value, ...breed }) => ({
            label: name,
            value: value,
            ...breed,
        }))
    }, [specie])

    const memoBloodType = useMemo(() => {
        return specie?.bloodType?.map(({ name, value, ...bloodType }) => ({
            label: name,
            value: value,
            ...bloodType,
        }))
    }, [specie])

    return (
        <>
            <FieldControlSelect
                ctx={{} as AuxSpeciesFormikProps}
                options={memoSpecies}
                required
                disabled={isPending || !!pet.id}
                onChangeValue={onChangeSpecie}
                name="specie"
                placeholder="Ex: Cachorro, Gato, etc..."
                label="Espécie"
            />

            <FieldControlSelect
                ctx={{} as AuxSpeciesFormikProps}
                options={memoBreed}
                disabled={!specie.breedType || isPending || !!pet.id}
                onChangeValue={(e) => setBreedValue(e)}
                value={breedValue}
                required
                name="race"
                label="Raça"
                placeholder="Ex: Vira-lata, Poodle, etc..."
            />

            <FieldControlSelect
                ctx={{} as AuxSpeciesFormikProps}
                options={memoBloodType}
                onChangeValue={(e) => setBloodTypeValue(e)}
                value={bloodTypeValue}
                disabled={!specie.bloodType || isPending || !!pet.id}
                required
                name="bloodType"
                label="Tipo Sanguíneo"
                placeholder="Ex: A, B, etc..."
            />
        </>
    )
}

export default ComboBoxFields
