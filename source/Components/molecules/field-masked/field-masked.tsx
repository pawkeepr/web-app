import { InputMask, type InputMaskProps } from '@react-input/mask'
import { useMemo } from 'react'
import { input } from '~/Components/atoms/input'
import FieldControl, {
    useFieldControlClasses,
    type InputControlProps,
} from '~/Components/molecules/field-control'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'

const FieldMasked = <Ctx,>({
    placeholder,
    name,
    replacement = { _: /\d/ },
    ...props
}: InputControlProps<InputMaskProps, Ctx>) => {
    const { values } = useFormikContextSafe()

    const value = useMemo(() => {
        const splitNames = name?.split('.')
        let value = values
        for (const splitName of splitNames) {
            value = value?.[splitName]
        }
        return value
    }, [values, name])

    const classes = useFieldControlClasses({
        ...props,
        value: value as string,
    })

    return (
        <FieldControl
            {...props}
            placeholder={placeholder || 'Digite aqui...'}
            name={name}
            replacement={replacement}
            component={InputMask}
            className={input({ className: classes })}
        />
    )
}

export default FieldMasked
