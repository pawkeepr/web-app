import { useFormikContext } from 'formik';

import { useMemo } from 'react';

import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn';
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select';
import { sub_specialty } from '~/common/data/sub-specialtys';

import CheckboxGroup from '~/Components/molecules/checkbox-group';
import { ActivateAccount } from '~/validations/activate';
import { StepProps } from './types';

import * as Yup from 'yup';

const options = sub_specialty.map((item) => ({
    value: item,
    label: item,
    color: 'rgb(255 200 107);',
}));

const validate = Yup.object().shape({
    specialty: Yup.object({
        value: Yup.string().required('O campo especialidade é obrigatório'),
        label: Yup.string().required('O campo especialidade é obrigatório'),
    }).required('O campo especialidade é obrigatório'),
    list_service_type: Yup.array()
        .min(1, 'Selecione pelo menos um tipo de atendimento')
        .required(),
    list_specialty: Yup.array()
        .min(1, 'Selecione pelo menos uma sub especialidade')
        .of(
            Yup.object().shape({
                value: Yup.string().required(
                    'O campo especialidade é obrigatório',
                ),
                label: Yup.string().required(
                    'O campo especialidade é obrigatório',
                ),
            }),
        ),
});

const StepActivationSpecialty = ({
    nextStep,
    prevStep,
    ...rest
}: StepProps) => {
    const { values } = useFormikContext<ActivateAccount>();

    const requiredValid = useMemo((): boolean => {
        const isValid = validate.isValidSync(values);

        return isValid;
    }, [values]);

    // useNextStep(nextStep, requiredValid);

    return (
        <div className="flex flex-1 flex-col gap-2">
            <CheckboxGroup
                label="Tipo de atendimento"
                name="list_service_type"
                items={[
                    {
                        label: 'Domésticos',
                        value: 'domestics',
                    },
                    {
                        label: 'Médio porte',
                        value: 'midsize',
                    },
                    {
                        label: 'Grande porte',
                        value: 'large',
                    },
                ]}
                divClassName="mobile:col-span-full col-span-full "
                required
            />
            <FieldControlSelect
                type="text"
                label="Especialidade"
                required
                name="specialty"
                options={options}
            />
            <FieldControlSelect
                isMulti
                type="text"
                required
                label="Sub Especialidades"
                name="list_specialty"
                options={options}
            />
            <div className="mt-1 flex justify-center items-center col-span-full">
                <BtnCancel onClick={prevStep} label="Voltar" />
                <BtnPrimary
                    onClick={nextStep}
                    disabled={!requiredValid}
                    label="Próximo"
                />
            </div>
        </div>
    );
};

export default StepActivationSpecialty;
