import { useFormikContext } from 'formik'

import { useMemo } from 'react'

import { BtnLabel, BtnPrimary } from '~/Components/atoms/btn'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import { sub_specialty } from '~/constants/sub-specialtys'

import CheckboxGroup from '~/Components/molecules/checkbox-group'
import { specialty_validation, type ActivateAccount } from '~/validations/activate'
import type { StepProps } from './types'

import * as Yup from 'yup'
import { pets } from '~/constants/pets'

const options = sub_specialty.map((item) => ({
    value: item,
    label: item,
    color: 'rgb(255 200 107);',
}))

const validate = Yup.object().shape(specialty_validation)

const StepActivationSpecialty = ({ nextStep, prevStep }: StepProps) => {
    const { values } = useFormikContext<ActivateAccount>()

    const requiredValid = useMemo((): boolean => {
        const isValid = validate.isValidSync(values)

        return isValid
    }, [values])

    // useNextStep(nextStep, requiredValid);

    return (
        <div className="flex flex-1 flex-col gap-2">
            <CheckboxGroup
                ctx={values}
                label="Tipo de Atendimento"
                name="types_service"
                items={[
                    {
                        label: 'Online',
                        value: 'online',
                    },
                    {
                        label: 'Clínica',
                        value: 'clinic',
                    },
                    {
                        label: 'Domiciliar',
                        value: 'domiciliary',
                    },
                    {
                        label: 'Emergencial',
                        value: 'emergency',
                    },
                    {
                        label: 'Hospitalar',
                        value: 'hospital',
                    },
                    {
                        label: 'Intensivo',
                        value: 'intensive',
                    },
                    {
                        label: 'Ambulatorial',
                        value: 'ambulatory',
                    },
                ]}
                divClassName="mobile:col-span-full col-span-full "
                required
            />
            <CheckboxGroup
                ctx={values}
                label="Tipo de Animais Atendidos"
                name="list_service_type"
                items={[
                    {
                        label: 'Domésticos',
                        value: 'domestic',
                    },
                    {
                        label: 'Equinos',
                        value: 'horses',
                    },
                    {
                        label: 'Silvestres e Conservação',
                        value: 'wild',
                    },
                    {
                        label: 'Rurais',
                        value: 'rural',
                    },
                    {
                        label: 'Exóticos',
                        value: 'exotic',
                    },
                    {
                        label: 'Não Convencionais',
                        value: 'unconventional',
                    },
                    {
                        label: 'Aquáticos',
                        value: 'aquatic',
                    },
                ]}
                divClassName="mobile:col-span-full col-span-full "
                required
            />
            <FieldControlSelect
                ctx={values}
                label="Animais que Atende a domicílio"
                required
                isMulti
                name="types_animals"
                options={pets}
            />
            <FieldControlSelect
                ctx={values}
                label="Especialidade Principal"
                required
                name="specialty"
                options={options}
            />
            <FieldControlSelect
                ctx={values}
                isMulti
                required
                label="Outras Especialidades"
                name="list_specialty"
                options={options}
            />
            <div className="mt-1 gap-2 flex justify-center items-center col-span-full">
                <BtnLabel
                    onClick={prevStep}
                    label="Voltar"
                    className="border-none"
                />
                <BtnPrimary
                    onClick={nextStep}
                    disabled={!requiredValid}
                    label="Próximo"
                />
            </div>
        </div>
    )
}

export default StepActivationSpecialty
