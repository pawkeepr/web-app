import CardScheduled from '~/Components/organism/card-scheduled/card-scheduled'
import useGetAllAppointments from './hook'

const StepDone = () => {
    const { isLoading, filteredDoneData } = useGetAllAppointments()
    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-10 w-full">
            {filteredDoneData?.map((appointment) => (
                <CardScheduled key={appointment.id} appointment={appointment} />
            ))}
        </div>
    )
}

export default StepDone
