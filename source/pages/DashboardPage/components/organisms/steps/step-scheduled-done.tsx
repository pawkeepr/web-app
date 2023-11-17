import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';
import { useAppSelector } from "~/store/hooks";
import CardScheduled from "../card-scheduled";


const StepDone = () => {
    const data = useAppSelector(state => state.AppointmentVet.all_scheduled_confirmed_done);
    const [selected, setSelected] = useState(null)

    return (
        <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only ">Server size</RadioGroup.Label>
            <div className="space-y-10 w-full">
                {data.map((appointment) => (
                    <CardScheduled key={appointment.id} checked={selected === appointment} appointment={appointment} />
                ))}
            </div>
        </RadioGroup>
    );
};

export default StepDone;