import { useMemo } from 'react'
import CardScheduled from '~/Components/organism/card-scheduled/card-scheduled'
import useListAppointments from '~/store/hooks/list-appointments'
import type { VeterinaryConsultation } from '~/types/appointment'

const StepAll = () => {
    const { activeData: scheduledData, isLoading: isLoadingScheduled } =
        useListAppointments({ mode: 'scheduled' })
    const { activeData: confirmedData, isLoading: isLoadingConfirmed } =
        useListAppointments({ mode: 'confirmed' })
    const { activeData: rescheduledData, isLoading: isLoadingRescheduled } =
        useListAppointments({ mode: 'rescheduled' })

    const data = useMemo(() => {
        return [
            ...(scheduledData as VeterinaryConsultation[]),
            ...(rescheduledData as VeterinaryConsultation[]),
        ]
    }, [scheduledData, rescheduledData])

    const isLoading = useMemo(() => {
        return isLoadingScheduled || isLoadingConfirmed || isLoadingRescheduled
    }, [isLoadingScheduled, isLoadingConfirmed, isLoadingRescheduled])

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="w-full">
            <section className="w-full space-y-10">
                <h1 className="text-2xl font-bold">Confirmadas</h1>
                {confirmedData?.map((appointment) => (
                    <CardScheduled key={appointment.id} appointment={appointment} />
                ))}
                {confirmedData?.length === 0 && (
                    <div className="text-center">
                        <span>Não há agendamentos confirmados</span>
                    </div>
                )}
            </section>

            <section className="w-full space-y-10 mt-4">
                <h1 className="text-2xl font-bold">Agendadas</h1>
                {data?.map((appointment) => (
                    <CardScheduled key={appointment.id} appointment={appointment} />
                ))}
                {data?.length === 0 && (
                    <div className="text-center">
                        <span>Não há consultas agendadas</span>
                    </div>
                )}
            </section>
        </div>
    )
}

export default StepAll
