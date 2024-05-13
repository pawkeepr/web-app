import { useMemo } from 'react'
import { BtnNeutral, BtnPrimary } from '~/Components/atoms/btn'
import ControlToggle from '~/Components/molecules/control-toggle'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { ActivateAccount } from '~/validations/activate'
import type { StepProps } from '../types'

const Day = ({ label, value }: { label: string; value: any }) => {
    const { values, setFieldValue } = useFormikContextSafe<ActivateAccount>()
    return (
        <li className="flex justify-between gap-1 text-xs font-semibold text-gray-500 mobile:w-full">
            <ControlToggle
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
            <h1 className="w-full my-1 text-sm font-bold text-center text-gray-500">
                Selecione os dias que você deseja realizar agendamentos na
                plataforma
            </h1>
            <ul className="flex flex-col w-full gap-1 ">
                <Day label="Segunda-feira" value="monday" />
                <Day label="Terça-feira" value="tuesday" />
                <Day label="Quarta-feira" value="wednesday" />
                <Day label="Quinta-feira" value="thursday" />
                <Day label="Sexta-feira" value="friday" />
                <Day label="Sábado" value="saturday" />
                <Day label="Domingo" value="sunday" />
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
