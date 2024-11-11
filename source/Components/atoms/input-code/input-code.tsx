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
    // Função que limita o valor a um único caractere
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        event.target.value = value.slice(-1) // mantém apenas o último caractere
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {

        // verifica se a tecla pressionada é um número
        if (Number.isNaN(Number.parseInt(event.key))) {
            return
        }
        moveToNext()
    }

    return (
        <div className="mb-3">
            <label htmlFor={id} className="visually-hidden">
                {id}
            </label>
            <input
                {...rest}
                type="number"
                onInput={handleInput}
                maxLength={1}
                max={9}
                min={0}
                className={input({
                    className: `${className} !px-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`,
                    required,
                    center: true,
                })}
                id={id}
                onKeyUp={handleKeyUp}
            />
        </div>
    )
}

export default InputCode
