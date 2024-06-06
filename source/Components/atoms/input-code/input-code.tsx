import { input, type InputProps } from '../input'

export type InputCodeProps = {
    moveToNext: () => void
} & InputProps

const InputCode = ({
    moveToNext,
    required = false,
    className,
    id,
    ...rest
}: InputCodeProps) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="visually-hidden">
                {id}
            </label>
            <input
                type="text"
                className={input({
                    className: `${className} !px-0 `,
                    required,
                    center: true,
                })}
                id={id}
                onKeyUp={() => moveToNext()}
                {...rest}
            />
        </div>
    )
}

export default InputCode
