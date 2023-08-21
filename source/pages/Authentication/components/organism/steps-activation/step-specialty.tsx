import { useFormikContext } from "formik";

import { useMemo } from "react";

import { BtnLabel, BtnPrimary } from "~/Components/atoms/btn";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import { sub_specialty } from "~/common/data/sub-specialtys";
import validatePerson from "~/validations/person";

import useNextStep from "~/hooks/use-next-step";
import { ActivateAccount } from "~/validations/activate";
import { StepProps } from "../steps/types";

const options = sub_specialty.map((item) => ({
    value: item,
    label: item,
    color: 'rgb(255 200 107);',
}));

const StepActivationSpecialty = ({ nextStep, prevStep, ...rest }: StepProps) => {
    const { values } = useFormikContext<ActivateAccount>();

    const requiredValid = useMemo((): boolean => {
        const isValid = validatePerson.isValidSync(values);

        return isValid;
    }, [values]);

    useNextStep(nextStep, requiredValid);

    return (
        <div className="container grid grid-cols-2 gap-1 mobile:grid-cols-1">
            <FieldControlSelect
                type="text"
                divClassName="mobile:col-span-2"
                label="Especialidade"
                name="specialty"
                options={options}
            />
            <FieldControlSelect
                isMulti
                type="text"
                divClassName="mobile:col-span-2"
                label="Sub Especialidades"
                name="sub_specialty"
                options={options}
            />
            <div className="mt-1 flex justify-center items-center col-span-full">
                <BtnLabel onClick={prevStep} label="Anterior" />
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
