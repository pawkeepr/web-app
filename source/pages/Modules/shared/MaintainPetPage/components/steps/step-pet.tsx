/* eslint-disable react/jsx-no-undef */

import { useMemo } from 'react'
import * as yup from 'yup'
import ControlToggle3States from '~/Components/molecules/control-toggle-3-states'
import FieldControl from '~/Components/molecules/field-control'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import FieldMasked from '~/Components/molecules/field-masked'
import SelectsSpecies from '~/Components/organism/selects/selects-species'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { RecordsShapeYup, StepProps } from '~/types/helpers'
import { genderValues } from '~/types/sexType'
import type { InitialValues } from '../../index'
import { useModeEditablePet } from '../hooks/use-mode-editable-pet'

type KeysInitial =
    | 'name'
    | 'date_birth'
    | 'sex'
    | 'microchip'
    | 'identification_number'
    | 'id'
    | 'race'
    | 'specie'
    | 'castrated'
    | 'organ_donor'
    | 'blood_donator'
    | 'blood_type'
    | 'pedigree'
type StepPetKeys = Pick<InitialValues, KeysInitial>
type StepPetSchema = RecordsShapeYup<StepPetKeys>

const schema = yup.object().shape<StepPetSchema>({
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
    castrated: yup.boolean(),
    identification_number: yup.string().nullable(),
    microchip: yup.string().nullable(),
    organ_donor: yup.boolean(),
    blood_donator: yup.boolean(),
    blood_type: yup
        .object()
        .shape({
            label: yup.string().required('Campo obrigatório'),
            value: yup.string().required('Campo obrigatório'),
        })
        .nullable(),
})

const StepPet = ({ nextStep }: StepProps) => {
    const { values, initialValues } = useFormikContextSafe<StepPetKeys>()
    const { mode } = useModeEditablePet()

    const isValid = useMemo(() => {
        return schema.isValidSync(values)
    }, [values])

    return (
        <section className="relative flex flex-col shadow-lg card-body mobile:p-0">
            <div className="p-1 m-2 mb-4">
                <h4 className="font-sans text-base font-semibold text-center capitalize">
                    Informações do PET
                    <br />
                    <span className="text-sm font-bold text-secondary-500">
                        Obrigatório (*)
                    </span>
                </h4>
            </div>
            <h1 className="font-semibold">Preencha as Informações do PET</h1>
            <div className="grid grid-cols-2 gap-4 mt-4 mobile:grid-cols-1 mobile:gap-2">
                <FieldControl
                    mode={mode}
                    ctx={values}
                    label="Nome do PET"
                    disabled={!!values.id && !!initialValues.name}
                    required
                    name="name"
                    placeholder="Digite o nome do PET"
                    divClassName="col-span-full"
                />

                <SelectsSpecies mode={mode} />

                <FieldControlSelect
                    mode={mode}
                    ctx={values}
                    options={genderValues}
                    isDisabled={!!values.id && !!initialValues.sex}
                    name="sex"
                    required
                    label="Sexo do Pet"
                    placeholder="Macho/Fêmea..."
                />

                <FieldControl
                    mode={mode}
                    ctx={values}
                    disabled={!!values.id && !!initialValues.date_birth}
                    label="Data de nascimento"
                    required
                    name={'date_birth' as any}
                    type="date"
                />

                <FieldMasked
                    mode={mode}
                    ctx={values}
                    disabled={!!values.id && !!initialValues.microchip}
                    label="Número do microchip"
                    name="microchip"
                    mask="_____"
                    placeholder="Digite o número do microchip (opcional)"
                />

                <FieldMasked
                    mode={mode}
                    ctx={values}
                    disabled={!!values.id && !!initialValues.identification_number}
                    label={'Número de registro cartório'}
                    name="identification_number"
                    mask="_____"
                    placeholder="Digite o número do registro (opcional)"
                />
                <div className="grid grid-cols-2 gap-3 col-span-full">
                    <ControlToggle3States
                        mode={mode}
                        ctx={values}
                        name="castrated"
                        label="Castrado"
                        divClassName="col-span-1 mobile:col-span-full"
                    />

                    <ControlToggle3States
                        mode={mode}
                        ctx={values}
                        name="organ_donor"
                        label="Doador de órgãos?"
                        divClassName="col-span-1 mobile:col-span-full"
                    />
                    <ControlToggle3States
                        mode={mode}
                        ctx={values}
                        name="blood_donator"
                        label="Doador de sangue?"
                        divClassName="col-span-1 mobile:col-span-full"
                    />
                    <ControlToggle3States
                        mode={mode}
                        ctx={values}
                        name="pedigree"
                        label="Pedigree?"
                        divClassName="col-span-1 mobile:col-span-full"
                    />
                </div>
            </div>
            <div className="flex justify-end w-full mobile:justify-center">
                {/* <BtnPrimary
                    label="Próximo"
                    disabled={!isValid}
                    onClick={nextStep}
                /> */}
            </div>
        </section>
    )
}

export default StepPet
