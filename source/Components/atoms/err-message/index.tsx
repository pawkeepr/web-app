

type ErrMessageProps = {
    message: string;
}

const ErrMessage = ({ message }: ErrMessageProps) => {

    return (
        <p className="font-bold list-group-item text-danger fs-11 text-center">{message}</p>
    )
}

export default ErrMessage