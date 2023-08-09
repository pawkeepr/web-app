import { useAppSelector } from "~/store/hooks";

const StepConfirmed = () => {
    const data = useAppSelector(state => state.Consults.data.all_scheduled_confirmed);
    return (
            <div>
                <h5>{ data }</h5>
            </div>
    );
};

export default StepConfirmed;
