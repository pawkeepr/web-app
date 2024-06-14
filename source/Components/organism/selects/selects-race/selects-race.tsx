import { useEffect, useState } from 'react'
import type { ModeView } from '~/Components/molecules/field-control'
import type { FieldSelectControl } from '~/Components/molecules/field-control/field-control-select'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import useProfile from '~/store/hooks/profile/use-profile'
import type { IPet } from '~/types/pet'
import { TypeProfile } from '~/types/profile'
import CheckboxModalGroup from '../../checkbox-modal-group'
import { useSpecies } from '../use-species'

type AuxSpeciesFormikProps = Pick<
    IPet,
    'id' | 'sex' | 'race' | 'specie' | 'blood_type'
>

const SelectsRace = <Ctx,>(props: Omit<FieldSelectControl<Ctx>, 'options'>) => {
    const [firstLoad, setFirstLoad] = useState(true)
    const { specie } = useSpecies()
    const { values, setFieldValue, initialValues } =
        useFormikContextSafe<AuxSpeciesFormikProps>()

    useEffect(() => {
        if (firstLoad) return setFirstLoad(false)
        setFieldValue('race', null, true)
    }, [specie])

    const { data: profile } = useProfile()
    const hasTutor = profile?.type_profile === TypeProfile.TUTOR
    const hasPet = !!values.id && !hasTutor

    return (
        <CheckboxModalGroup
            {...props}
            ctx={values}
            label="Raça"
            required
            mode={props.mode as ModeView}
            name="race"
            isDisabled={hasPet && !!initialValues.race}
            items={specie.breedType}
        />
    )
}

export default SelectsRace
