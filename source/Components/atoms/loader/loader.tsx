import Spinner from 'react-bootstrap/Spinner';

type LoaderProps = {
    loading: boolean;
}

const Loader = ({ loading }: LoaderProps) => {
    return (
        <div className={`
            position-fixed 
            top-0 
            left-0 
            w-100 
            h-100 
            d-flex 
            align-items-center 
            justify-content-center 
            ${loading ? 'visible' : 'invisible'}`
        }>
            <Spinner animation="border" variant="primary" />
        </div>
    );
};
