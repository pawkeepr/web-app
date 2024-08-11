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
                {...rest}
                type="number"
                className={input({
                    className: `${className} !px-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`,
                    required,
                    center: true,
                })}
                id={id}
                onKeyUp={() => moveToNext()}
            />
        </div>
    )
}

export default InputCode
