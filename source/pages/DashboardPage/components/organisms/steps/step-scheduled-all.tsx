import { useMemo } from 'react'
import useListAppointments from '~/store/hooks/list-appointments'
import type { VeterinaryConsultation } from '~/types/appointment'
import CardScheduled from '../organisms/card-scheduled'

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
        <div className="space-y-10 w-full">
            {confirmedData?.map((appointment) => (
                <CardScheduled key={appointment.id} appointment={appointment} />
            ))}
            {data?.map((appointment) => (
                <CardScheduled key={appointment.id} appointment={appointment} />
            ))}
        </div>
    )
}

export default StepAll
