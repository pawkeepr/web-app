/* eslint-disable react/jsx-no-undef */

import { BtnPrimary } from '~/Components/atoms/btn'

import { Form } from 'formik'
import { useMemo } from 'react'
import * as yup from 'yup'
import ControlToggle3States from '~/Components/molecules/control-toggle-3-states'
import FieldControl from '~/Components/molecules/field-control'
import FieldMasked from '~/Components/molecules/field-masked'
import CheckboxModalGroup from '~/Components/organism/checkbox-modal-group'
import SelectsSpecies from '~/Components/organism/selects/selects-species'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import useProfile from '~/store/hooks/profile/use-profile'
import type { RecordsShapeYup, StepProps } from '~/types/helpers'
import { TypeProfile } from '~/types/profile'
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
    | 'approximate_date'
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
    sex: yup.string().required('Campo obrigatório'),
    race: yup.string().required('Campo obrigatório'),
    specie: yup.string().required('Campo obrigatório'),
    date_birth: yup.string().nullable().required('Campo obrigatório'),
    approximate_date: yup.boolean().nullable(),
    castrated: yup.boolean().nullable(),
    identification_number: yup.string().nullable(),
    microchip: yup.string().nullable(),
    organ_donor: yup.boolean().nullable(),
    blood_donator: yup.boolean().nullable(),
    blood_type: yup.string().nullable(),
})

const StepPet = (_props: StepProps) => {
    const { data: profile } = useProfile()
    const hasTutor = profile?.type_profile === TypeProfile.TUTOR
    const { values, initialValues, handleSubmit, isSubmitting, errors } =
        useFormikContextSafe<StepPetKeys>()
    const { mode } = useModeEditablePet()

    const isValid = useMemo(() => {
        return schema.isValidSync(values)
    }, [values])

    const hasPet = !!values.id && !hasTutor

    return (
        <Form
            onSubmit={handleSubmit}
            className="relative flex flex-col pb-4 border-t-0 shadow-lg card-body mobile:p-0"
        >
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
            <div className="grid grid-cols-2 gap-1 mt-4 mobile:grid-cols-1 mobile:gap-2">
                <FieldControl
                    mode={mode}
                    ctx={values}
                    label="Nome do PET"
                    disabled={hasPet && !!initialValues.name}
                    required
                    validateSync={(value) => yup.string().isValidSync(value)}
                    name="name"
                    placeholder="Digite o nome do PET"
                    divClassName="col-span-full"
                />

                <SelectsSpecies mode={mode} />

                <CheckboxModalGroup
                    ctx={values}
                    label="Sexo"
                    required
                    validateSync={(value) => yup.string().isValidSync(value)}
                    mode={mode}
                    name="sex"
                    isDisabled={hasPet && !!initialValues.sex}
                    items={genderValues}
                />

                <div>
                    <FieldControl
                        mode={mode}
                        ctx={values}
                        disabled={hasPet && !!initialValues.date_birth}
                        label="Data de nascimento"
                        required
                        validateSync={(value) => yup.string().isValidSync(value)}
                        name={'date_birth' as any}
                        type="date"
                    />
                    <ControlToggle3States
                        mode={mode}
                        ctx={values}
                        name="approximate_date"
                        label="Data de nascimento aproximada?"
                    />
                </div>

                <FieldMasked
                    mode={mode}
                    ctx={values}
                    disabled={hasPet && !!initialValues.microchip}
                    label="Número do microchip"
                    name="microchip"
                    mask="_____"
                    placeholder="Digite o número do microchip (opcional)"
                />

                <FieldMasked
                    mode={mode}
                    ctx={values}
                    disabled={hasPet && !!initialValues.identification_number}
                    label={'Número de registro cartório'}
                    name="identification_number"
                    mask="_____"
                    placeholder="Digite o número do registro (opcional)"
                />
                <div className="grid grid-cols-2 gap-3 mobile:grid-cols-1 col-span-full">
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
            <div className="flex self-end justify-end w-1/3 mt-2 mobile:justify-center">
                <BtnPrimary
                    disabled={!isValid || isSubmitting || mode !== 'editable'}
                    isLoading={isSubmitting}
                    label="Salvar"
                    className="w-1/2"
                    type="submit"
                />
            </div>
        </Form>
    )
}

export default StepPet
