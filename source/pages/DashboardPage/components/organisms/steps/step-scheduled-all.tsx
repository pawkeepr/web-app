import Link from "next/link";
import { Card, CardBody, Col, Row } from "reactstrap";
import MyImage from "~/Components/atoms/my-image";
import { useAppSelector } from "~/store/hooks";

const StepAll = (props) => {
    const data = useAppSelector(state => state.scheduled.all_scheduled);

    console.log(data);
    

    return (
            <div>
                <h5>pet</h5>
            </div>
    );
};

export default StepAll;
