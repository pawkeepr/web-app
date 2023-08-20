

type ErrMessageProps = {
    message: string;
} & React.HTMLAttributes<HTMLLabelElement>

const ErrMessage = ({ message, ...rest }: ErrMessageProps) => {

    return (
        message && (
            <div className="w-full text-xs text-center text-red-700">
                {message}
            </div>
        )
    )
}

export default ErrMessage