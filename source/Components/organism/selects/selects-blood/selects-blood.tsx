import { useEffect, useState } from 'react'
import type { FieldSelectControl } from '~/Components/molecules/field-control/field-control-select'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import useProfile from '~/store/hooks/profile/use-profile'
import type { IPet } from '~/types/pet'
import { TypeProfile } from '~/types/profile'
import { useSpecies } from '../use-species'

type AuxSpeciesFormikProps = Pick<
    IPet,
    'id' | 'sex' | 'race' | 'specie' | 'blood_type'
>

const SelectsBlood = <Ctx,>(props: Omit<FieldSelectControl<Ctx>, 'options'>) => {
    const [firstLoad, setFirstLoad] = useState(true)
    const { specie } = useSpecies()
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
        <FieldControlSelect
            {...props}
            label="Tipo de sanguíneo"
            ctx={values}
            isDisabled={hasPet && !!initialValues.blood_type}
            name="blood_type"
            options={specie.bloodType}
            error={props.error && !firstLoad}
        />
    )
}

export default SelectsBlood
