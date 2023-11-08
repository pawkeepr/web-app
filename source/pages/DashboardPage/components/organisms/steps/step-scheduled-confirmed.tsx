import Link from "next/link";
import { Card, CardBody, Col, Row } from "reactstrap";
import MyImage from "~/Components/atoms/my-image";
import { useAppSelector } from "~/store/hooks";


const StepConfirmed = (post) => {

    // const pet = useAppSelector(state => state.scheduled.all_scheduled_confirmed);
    // console.log('data');
    
    return (
        <li
        key={post.id}
        className="relative rounded-md p-3 hover:bg-gray-100"
      >
        <h3 className="text-sm font-medium leading-5">
          {post.title}
        </h3>
        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
          <li>{post.date}</li>
          <li>&middot;</li>
          <li>{post.commentCount} comments</li>
          <li>&middot;</li>
          <li>{post.shareCount} shares</li>
        </ul>

      </li>
    );
};

export default StepConfirmed;
