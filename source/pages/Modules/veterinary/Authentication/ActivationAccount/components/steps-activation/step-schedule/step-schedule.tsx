import { useMemo } from 'react'
import { BtnNeutral, BtnPrimary } from '~/Components/atoms/btn'
import ControlSwitchDiv from '~/Components/molecules/control-switch-div'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { ActivateAccount } from '~/validations/activate'
import type { StepProps } from '../types'

const Day = ({ label, value }: { label: string; value: string }) => {
    const { values, setFieldValue } = useFormikContextSafe<ActivateAccount>()
    return (
        <li className="flex justify-between gap-1 p-1   text-xs font-semibold text-gray-500 mobile:w-full">
            <ControlSwitchDiv
                initialValue={null}
                ctx={values}
                divClassName="w-full"
                name={value}
                label={label}
            />
        </li>
    )
}

const StepSchedule = ({ nextStep, prevStep }: StepProps) => {
    const { values, setFieldValue } = useFormikContextSafe<ActivateAccount>()

    const requiredValid = useMemo((): boolean => {
        const isValid = true

        return isValid
    }, [])

    return (
        <section className="flex flex-row flex-wrap w-full">
            <ul className="flex flex-col w-full gap-1 ">
                <Day label="Domingo" value="sunday" />
                <Day label="Segunda" value="monday" />
                <Day label="Terça" value="tuesday" />
                <Day label="Quarta" value="wednesday" />
                <Day label="Quinta" value="thursday" />
                <Day label="Sexta" value="friday" />
                <Day label="Sábado" value="saturday" />
            </ul>
            <div className="flex items-center justify-center w-full gap-2 mt-1">
                <BtnNeutral
                    outline
                    className="border-none"
                    onClick={prevStep}
                    label="Voltar"
                />
                <BtnPrimary
                    onClick={nextStep}
                    disabled={!requiredValid}
                    label="Próximo"
                />
            </div>
        </section>
    )
}

export default StepSchedule
