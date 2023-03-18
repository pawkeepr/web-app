

type ErrMessageProps = {
    message: string;
} & React.HTMLAttributes<HTMLLabelElement>

const ErrMessage = ({ message, ...rest }: ErrMessageProps) => {

    return (
        <label className="font-bold list-group-item text-danger fs-11 text-center" {...rest}>{message}</label>
    )
}

export default ErrMessage