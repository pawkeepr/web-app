

type ErrMessageProps = {
    message: string;
} & React.HTMLAttributes<HTMLLabelElement>

const ErrMessage = ({ message, ...rest }: ErrMessageProps) => {

    return (
        <label className="
            absolute bottom-0 left-0 right-0
            font-bold text-red-400 
            text-xs text-center 
        " {...rest}>{message}</label>
    )
}

export default ErrMessage