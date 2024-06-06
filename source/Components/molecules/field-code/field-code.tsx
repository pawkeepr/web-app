import { useField } from 'formik'

import type { ChangeEvent, ComponentProps } from 'react'
import InputCode from '~/Components/atoms/input-code'

import type { InputCodeProps } from '~/Components/atoms/input-code/input-code'

type InputFieldProps<T> = ComponentProps<'input'> &
    T & {
        label?: string
        name: string
        position: number
        required?: boolean
        moveToNext?: () => void
        component?: (props: InputCodeProps) => JSX.Element
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    }

const FieldCode = <T,>({
    label,
    required = false,
    component = InputCode,
    className,
    position,
    ...props
}: InputFieldProps<T>) => {
    const [inputProps, _meta] = useField(props)
    const id = props.name || props.id

    const InputComponent = component

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        // ultimo elemento
        if (e.target.value.length > 1) {
            e.target.value = e.target.value[e.target.value.length - 1]
        }

        props.onChange?.(e)
        inputProps.onChange(e)
    }

    const getInputElement = (index: number) => {
        return document.getElementById(`digit${index}`)
    }

    const moveToNext = (index: number) => {
        const element = getInputElement(index + 1)
        element?.focus()
        getInputElement(index)?.blur()
    }

    // const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    //     e.preventDefault()
    //     const paste = e.clipboardData.getData('text')

    //     const pasteArray = paste.split('')

    //     for (let i = 0; i < pasteArray.length; i++) {
    //         const element = getInputElement(i)

    //         if (element !== null) {

    //         }
    //     }

    //     // Trigger the onChange handler after setting the new value
    // }

    return (
        <InputComponent
            {...inputProps}
            {...props}
            id={id}
            required={required}
            data-testid={`input-code-${id}`}
            moveToNext={() => moveToNext?.(position)}
            onChange={onChange}
            className="!px-0"
            // onPaste={onPaste}
        />
    )
}

export default FieldCode
