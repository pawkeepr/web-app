import { useState } from 'react'
import type { Props } from 'react-select'
import Label from '~/Components/atoms/label'
import Select from '~/Components/atoms/select'
import type { InputControlProps, OptionSelect } from '../field-control'

export type FieldSelectControl<Ctx> = Omit<
    InputControlProps<Props, Ctx>,
    'value' | 'disabled'
> & {
    onChangeValue?: (item: unknown) => void
    options?: OptionSelect[]
    value?: OptionSelect | null
    required?: boolean
    label: string
    isDisabled?: boolean
    name: string
    divClassName?: string
}

const FieldSelect = ({
    label,
    required = false,
    name,
    divClassName,
    options = [],
    onChangeValue = () => {},
    ...props
}: FieldSelectControl<unknown>) => {
    const [selected, setSelected] = useState<OptionSelect | null>(null)

    const onChange = (option: unknown | OptionSelect) => {
        onChangeValue?.(option)
        setSelected(option as OptionSelect)
    }

    return (
        <div className={divClassName}>
            <Label label={label} required={required} id={name} separator={':'} />
            <Select
                {...props}
                id={name}
                required={required}
                className={required ? 'border-secondary-500' : ''}
                options={options}
                name={name}
                onChange={onChange}
                value={selected}
            />
        </div>
    )
}

export default FieldSelect
