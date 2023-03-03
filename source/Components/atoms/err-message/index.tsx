
import { ErrorMessage } from 'formik';
import Form from 'react-bootstrap/Form';

type ErrMessageProps = {
    name: string;
}

const ErrMessage = ({ name }: ErrMessageProps) => {

    const render = (msg: string) => {
        return (
            <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
        )
    }

    return (
        <ErrorMessage name={name} render={render} />

    )
}

export default ErrMessage