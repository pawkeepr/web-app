/* eslint-disable react/jsx-no-undef */

import { BtnPrimary } from '~/Components/atoms/btn'

import { useMemo } from 'react'
import * as yup from 'yup'
import FieldControl from '~/Components/molecules/field-control'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import FieldMasked from '~/Components/molecules/field-masked'
import SelectsSpecies from '~/Components/organism/selects/selects-species'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { StepProps, Tabs } from '~/types/helpers'
import { genderValues } from '~/types/sexType'
import type { InitialValues } from '../../index'
import { useModeEditablePet } from '../../use-zustand-hook'

type KeysInitial =
    | 'name'
    | 'date_birth'
    | 'sex'
    | 'microchip'
    | 'identification_number'
    | 'id'
    | 'race'
    | 'specie'
type StepPetKeys = Pick<InitialValues, KeysInitial>

const schema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    sex: yup
        .object()
        .shape({
            label: yup.string().required('Campo obrigatório'),
            value: yup.string().required('Campo obrigatório'),
        })
        .required('Campo obrigatório'),
    race: yup
        .object()
        .shape({
            label: yup.string().required('Campo obrigatório'),
            value: yup.string().required('Campo obrigatório'),
        })
        .required('Campo obrigatório'),
    specie: yup
        .object()
        .shape({
            label: yup.string().required('Campo obrigatório'),
            value: yup.string().required('Campo obrigatório'),
        })
        .required('Campo obrigatório'),
    date_birth: yup.string().nullable().required('Campo obrigatório'),
})

const StepPet = ({ toggleTab, activeTab }: StepProps) => {
    const { values } = useFormikContextSafe<StepPetKeys>()
    const { mode } = useModeEditablePet()

    const isValid = useMemo(() => {
        return schema.isValidSync(values)
    }, [values])

    return (
        <div className="card card-body shadow-lg">
            <div className="p-1 m-2 mb-4">
                <h4 className="text-center font-sans font-semibold text-base capitalize">
                    Informações do PET
                    <br />
                    <span className="text-sm font-bold text-secondary-500">
                        Obrigatório (*)
                    </span>
                </h4>
            </div>
            <h1 className="font-semibold">Preencha as Informações do PET</h1>
            <div className="grid grid-cols-3 gap-4 mt-4 mobile:grid-cols-1 mobile:gap-2">
                <FieldControl
                    mode={mode}
                    ctx={values}
                    label="Nome do PET"
                    disabled={!!values.id && !!values.name}
                    required
                    name="name"
                    placeholder="Digite o nome do PET"
                    divClassName="col-span-full"
                />

                <SelectsSpecies mode={mode} />

                <FieldControlSelect
                    ctx={values}
                    options={genderValues}
                    isDisabled={!!values.id && !!values.sex}
                    name="sex"
                    required
                    label="Sexo do Pet"
                    placeholder="Macho/Fêmea..."
                />

                <FieldControl
                    mode={mode}
                    ctx={values}
                    disabled={!!values.id && !!values.date_birth}
                    label="Data de nascimento"
                    required
                    name="date_birth"
                    type="date"
                />

                <FieldMasked
                    mode={mode}
                    ctx={values}
                    disabled={!!values.id && !!values.microchip}
                    label="Número do microchip"
                    name="microchip"
                    mask="_____"
                    placeholder="Digite o número do microchip (opcional)"
                />

                <FieldMasked
                    mode={mode}
                    ctx={values}
                    disabled={!!values.id && !!values.identification_number}
                    label={'Número de registro cartório'}
                    name="identification_number"
                    mask="_____"
                    placeholder="Digite o número do registro (opcional)"
                />
            </div>
            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnPrimary
                    label="Próximo"
                    disabled={!isValid}
                    onClick={() => {
                        toggleTab((activeTab + 1) as Tabs)
                    }}
                />
            </div>
        </div>
    )
}

export default StepPet
