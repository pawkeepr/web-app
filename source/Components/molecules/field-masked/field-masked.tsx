import { InputMask, type InputMaskProps } from '@react-input/mask'
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
    const classes = useFieldControlClasses({
        ...props,
        value: values?.[name] as string,
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
