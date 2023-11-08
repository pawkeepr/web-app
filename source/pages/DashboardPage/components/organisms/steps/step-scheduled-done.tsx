import { useAppSelector } from "~/store/hooks";

const StepDone = (props) => {
    const data = useAppSelector(state => state.scheduled.all_scheduled_confirmed_done);
    console.log('pet');

    return (
            <div>
                <h5>{ data }</h5>
            </div>
    );
};

export default StepDone;