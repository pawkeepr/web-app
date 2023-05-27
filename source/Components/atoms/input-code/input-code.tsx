type InputCodeProps = {
    moveToNext: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>

const InputCode = ({ moveToNext, className, id, ...rest }: InputCodeProps) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="visually-hidden">Digit 1</label>
            <input
                type="text"
                className={`
                    form-control 
                    form-control-lg 
                    border-2 
                    text-center
                    ${className}
                `}
                id={id}
                maxLength={1}
                onKeyUp={() => moveToNext()}
                {...rest}
            />
        </div>
    )
}

export default InputCode