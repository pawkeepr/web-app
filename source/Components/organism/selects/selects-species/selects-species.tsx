import { useEffect } from 'react'
import type { ModeView } from '~/Components/molecules/field-control'
import type { FieldSelectControl } from '~/Components/molecules/field-control/field-control-select'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import useProfile from '~/store/hooks/profile/use-profile'
import type { IPet } from '~/types/pet'
import { TypeProfile } from '~/types/profile'
import CheckboxModalGroup from '../../checkbox-modal-group'
import SelectsBlood from '../selects-blood'
import SelectsRace from '../selects-race'
import { useSpecies } from '../use-species'

type AuxSpeciesFormikProps = Pick<
    IPet,
    'id' | 'sex' | 'race' | 'specie' | 'blood_type'
>

const SelectsSpecies = <Ctx,>(props: Omit<FieldSelectControl<Ctx>, 'options'>) => {
    const { specie, optionsSpecies, onChangeSpecie } = useSpecies()
    const { values, initialValues } = useFormikContextSafe<AuxSpeciesFormikProps>()
    const { data: profile } = useProfile()
    const hasTutor = profile?.type_profile === TypeProfile.TUTOR
    const hasPet = !!values.id && !hasTutor

    useEffect(() => {
        const specie = optionsSpecies.find(
            (specie) => specie.value === values.specie,
        )
        if (!specie) return
        onChangeSpecie(specie)
    }, [values.specie])

    return (
        <>
            <CheckboxModalGroup
                ctx={values}
                label="Espécie"
                required
                mode={props.mode as ModeView}
                name="specie"
                isDisabled={hasPet && !!initialValues.specie}
                items={optionsSpecies}
            />

            {specie?.breedType?.length > 0 && (
                <SelectsRace mode={props.mode} required />
            )}
            {specie?.bloodType?.length > 0 && <SelectsBlood mode={props.mode} />}
        </>
    )
}

export default SelectsSpecies
