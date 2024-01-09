import { InputProps, input } from '../input';

type InputCodeProps = {
    moveToNext: () => void;
} & InputProps;

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
                    className,
                    required,
                    center: true,
                })}
                id={id}
                maxLength={1}
                onKeyUp={() => moveToNext()}
                {...rest}
            />
        </div>
    );
};

export default InputCode;
