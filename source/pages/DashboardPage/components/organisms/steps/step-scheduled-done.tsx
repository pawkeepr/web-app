import { useAppointmentDone } from '~/store/hooks/appointments';
import CardScheduled from "../organisms/card-scheduled";


const StepDone = () => {

    const { activeData, isLoading } = useAppointmentDone()

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-10 w-full">
            {activeData?.scheduled?.map((appointment) => (
                <CardScheduled key={appointment.id} appointment={appointment} boxButtons={null} />
            ))}
        </div>
    );
};

export default StepDone;