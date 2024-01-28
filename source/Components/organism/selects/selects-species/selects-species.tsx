import { useEffect, useState } from 'react'
import type { FieldSelectControl } from '~/Components/molecules/field-control/field-control-select'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { IPet } from '~/types/pet'
import SelectsBlood from '../selects-blood'
import SelectsRace from '../selects-race'
import { useSpecies } from '../use-species'

type AuxSpeciesFormikProps = Pick<
    IPet,
    'id' | 'sex' | 'race' | 'specie' | 'bloodType'
>

const SelectsSpecies = <Ctx,>(props: Omit<FieldSelectControl<Ctx>, 'options'>) => {
    const [firstLoad, setFirstLoad] = useState(true)
    const { specie, optionsSpecies, onChangeSpecie } = useSpecies()
    const { values } = useFormikContextSafe<AuxSpeciesFormikProps>()

    useEffect(() => {
        const specie = optionsSpecies.find(
            (specie) => specie.value === values.specie,
        )
        if (!specie) return
        onChangeSpecie(specie)
    }, [])

    return (
        <>
            <FieldControlSelect
                {...props}
                label="Espécie"
                ctx={values}
                name="specie"
                required
                options={optionsSpecies}
                error={props.error && !firstLoad}
                onChangeValue={(value) => {
                    onChangeSpecie(value)
                    setFirstLoad(false)
                }}
            />
            {specie?.breedType?.length > 0 && (
                <SelectsRace mode={props.mode} required />
            )}
            {specie?.bloodType?.length > 0 && <SelectsBlood mode={props.mode} />}
        </>
    )
}

export default SelectsSpecies
