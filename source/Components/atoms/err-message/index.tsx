

type ErrMessageProps = {
    message: string;
}

const ErrMessage = ({ message }: ErrMessageProps) => {

    return (
        <p className="font-bold text-danger fs-6 text-center">{message}</p>
    )
}

export default ErrMessage