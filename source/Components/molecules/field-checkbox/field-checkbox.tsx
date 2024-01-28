import { useField } from 'formik'
import Checkbox from '~/Components/atoms/checkbox'
import { labelStyled } from '~/Components/atoms/label/label'
import type { InputControlProps } from '../field-control/types'

type FieldCheckboxProps<T, Ctx> = InputControlProps<T, Ctx>

const FieldCheckbox = <T, Ctx>({
    name,
    className,
    children,
    ...rest
}: FieldCheckboxProps<T, Ctx>) => {
    const [field, meta] = useField(name)

    return (
        <div className="flex items-center justify-center ">
            <Checkbox {...rest} {...field} checked={field.value} />
            <label htmlFor={field.name} className={labelStyled({ className })}>
                {children}
            </label>
        </div>
    )
}

export default FieldCheckbox
