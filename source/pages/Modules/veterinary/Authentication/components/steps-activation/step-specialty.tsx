import { useFormikContext } from 'formik'

import { useMemo } from 'react'

import { BtnNeutral, BtnPrimary } from '~/Components/atoms/btn'
import { sub_specialty } from '~/constants/sub-specialtys'

import { specialty_validation, type ActivateAccount } from '~/validations/activate'
import type { StepProps } from './types'

import * as Yup from 'yup'
import CheckboxIsMultiModalGroup from '~/Components/organism/checkbox-is-multi-modal-group'
import CheckboxModalGroup from '~/Components/organism/checkbox-modal-group'

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
        <div className="flex flex-col flex-1 gap-1">
            <CheckboxModalGroup
                ctx={values}
                label="Especialidade Principal"
                required
                className="my-4"
                name="specialty"
                items={options}
            />

            <CheckboxIsMultiModalGroup
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
                required
            />
            <CheckboxIsMultiModalGroup
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
                required
            />
            <CheckboxIsMultiModalGroup
                ctx={values}
                label="Animais que Atende a domicílio"
                required
                items={pets}
                name="types_animals"
            />

            <CheckboxIsMultiModalGroup
                ctx={values}
                required
                label="Outras Especialidades"
                name="list_specialty"
                items={options}
            />

            <div className="flex items-center justify-center gap-2 mt-1 col-span-full">
                <BtnNeutral
                    outline
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
