import { useAppSelector } from "~/store/hooks";

const StepCanceled = (props) => {
    const data = useAppSelector(state => state.scheduled.all_scheduled_canceled);
    console.log('pet');
    return (
            <div>
                <h5>{ data }</h5>
            </div>
    );
};

export default StepCanceled;
