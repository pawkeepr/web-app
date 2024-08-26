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

const SelectsBlood = <Ctx,>(props: Omit<FieldSelectControl<Ctx>, 'options'>) => {
    const { specie } = useSpecies()
    const [firstLoad, setFirstLoad] = useState(true)

    const { values, setFieldValue, initialValues } =
        useFormikContextSafe<AuxSpeciesFormikProps>()

    useEffect(() => {
        if (firstLoad) return setFirstLoad(false)
        setFieldValue('blood_type', null, true)
    }, [specie])

    const { data: profile } = useProfile()
    const hasTutor = profile?.type_profile === TypeProfile.TUTOR
    const hasPet = !!values.id && !hasTutor

    return (
        <CheckboxModalGroup
            {...props}
            ctx={values}
            label="Tipo de sanguíneo"
            mode={props.mode as ModeView}
            name="blood_type"
            isDisabled={hasPet && !!initialValues.blood_type}
            items={specie.bloodType}
        />
    )
}

export default SelectsBlood
