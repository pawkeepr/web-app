import { useAppSelector } from "~/store/hooks";

const StepDone = () => {
    const data = useAppSelector(state => state.Consults.data.all_scheduled_done);

    return (
            <div>
                <h5>{ data }</h5>
            </div>
    );
};

export default StepDone;