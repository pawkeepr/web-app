import { input } from "../input";

type InputCodeProps = {
    moveToNext: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>

const InputCode = ({ moveToNext, className, id, ...rest }: InputCodeProps) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="visually-hidden">{id}</label>
            <input
                type="text"
                className={input({
                    className: `
                    text-center
                    !border-secondary-500
                    ${className}
                ` })}
                id={id}
                maxLength={1}
                onKeyUp={() => moveToNext()}
                {...rest}
            />
        </div>
    )
}

export default InputCode