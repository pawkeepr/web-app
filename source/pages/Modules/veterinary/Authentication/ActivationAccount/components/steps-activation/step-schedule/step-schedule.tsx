import { FieldArray } from 'formik'
import { useMemo } from 'react'
import { BtnNeutral, BtnPrimary } from '~/Components/atoms/btn'
import ControlToggle from '~/Components/molecules/control-toggle'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { ActivateAccount } from '~/validations/activate'
import type { StepProps } from '../types'

const Day = ({
    label,
    value,
    index,
}: { label: string; value: string; index: number }) => {
    const { values } = useFormikContextSafe<ActivateAccount>()
    return (
        <FieldArray name="opening_days_times">
            {({ replace }) => {
                return (
                    <li className="flex justify-between gap-1 text-xs font-semibold text-gray-500 mobile:w-full">
                        <ControlToggle
                            initialValue={null}
                            ctx={values}
                            divClassName="w-full"
                            onChange={(e) => {
                                if (e) {
                                    replace(index, {
                                        type_schedule: 'online',
                                        day: value,
                                        hour_start: '08:00',
                                        hour_end: '18:00',
                                        out_of_hours_service: 'false',
                                    })
                                } else {
                                    replace(index, null)
                                }
                            }}
                            name={`opening_days_times[${index}]` as any}
                            label={label}
                        />
                    </li>
                )
            }}
        </FieldArray>
    )
}

const StepSchedule = ({ nextStep, prevStep }: StepProps) => {
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
            <ul className="flex flex-col w-full gap-1">
                <Day label="Segunda-feira" value="monday" index={0} />
                <Day label="Terça-feira" value="tuesday" index={1} />
                <Day label="Quarta-feira" value="wednesday" index={2} />
                <Day label="Quinta-feira" value="thursday" index={3} />
                <Day label="Sexta-feira" value="friday" index={4} />
                <Day label="Sábado" value="saturday" index={5} />
                <Day label="Domingo" value="sunday" index={6} />
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
