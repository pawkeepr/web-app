import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { getAll } from "~/store/slices/appointment-vet/actions";
import CardScheduled from "../organisms/card-scheduled";


const StepAll = () => {
    const data = useAppSelector(state => state.AppointmentVet.all_scheduled);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

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

export default StepAll;
