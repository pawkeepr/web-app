import { twMerge } from 'tailwind-merge'

type ErrMessageProps = {
    message: string
} & React.HTMLAttributes<HTMLDivElement>

const ErrMessage = ({ message, className, ...props }: ErrMessageProps) => {
    if (!message) {
        return null
    }
    return (
        <div
            {...props}
            className={twMerge(
                '"w-full text-xs text-center text-red-700"',
                className,
            )}
        >
            {message}
        </div>
    )
}

export default ErrMessage
