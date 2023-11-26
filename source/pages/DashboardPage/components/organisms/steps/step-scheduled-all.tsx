import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { useAppointmentScheduled } from "~/store/hooks/appointments";
import CardScheduled from "../organisms/card-scheduled";


const StepAll = () => {
    const { activeData, isLoading } = useAppointmentScheduled()

    const [selected, setSelected] = useState(null)

    if (isLoading) return <div>Loading...</div>

    return (
        <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only ">Server size</RadioGroup.Label>
            <div className="space-y-10 w-full">
                {activeData?.scheduled?.map((appointment) => (
                    <CardScheduled key={appointment.id} appointment={appointment} />
                ))}
            </div>
        </RadioGroup>
    );
};

export default StepAll;
