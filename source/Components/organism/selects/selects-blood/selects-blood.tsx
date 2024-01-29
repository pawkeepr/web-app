import { useEffect, useState } from 'react'
import type { FieldSelectControl } from '~/Components/molecules/field-control/field-control-select'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { IPet } from '~/types/pet'
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

    return (
        <FieldControlSelect
            {...props}
            label="Tipo de sanguíneo"
            ctx={values}
            isDisabled={!!values.id && !!initialValues.blood_type}
            name="blood_type"
            options={specie.bloodType}
            error={props.error && !firstLoad}
        />
    )
}

export default SelectsBlood
