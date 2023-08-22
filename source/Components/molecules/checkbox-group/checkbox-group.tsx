import { useField } from 'formik'
import { useState } from 'react'

import Label from '~/Components/atoms/label'

type Item = {
    label: string
    value: any
}

interface CheckboxGroupProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    items: Item[]
    name: string
    label: string
    required?: boolean
    disabledError?: boolean
    divClassName?: string
}

export default function CheckboxGroup<T>({ items = [], name, label, required, className, id, disabledError, divClassName, ...rest }: CheckboxGroupProps<T>) {

    const [field, meta, helpers] = useField(name)


    const { setValue } = helpers

    const [checkedValues, setCheckedValues] = useState<string[]>([])

    function setCheckboxValue(name: string) {
        if (!checkedValues.includes(name)) {
            return setCheckedValues(values => {
                const result = [...values, name]
                setValue(result)
                return result
            })
        }

        setCheckedValues(values => {
            const result = values.filter(element => element !== name)
            setValue(result)
            return result
        })
    }

    return (
        <div className={divClassName}>
            <Label
                label={label}
                required={required}
                id={id}
                separator=':'
            />
            <div className="mx-auto w-full relative flex justify-center items-center flex-wrap gap-2">
                {
                    items.map((item, index) => (
                        <div className="form-check form-check-inline" key={index}>
                            <input
                                id={item.label}
                                type="checkbox"
                                className="form-check-input"
                                checked={checkedValues.includes(item.value)}
                                {...field}
                                onChange={() => setCheckboxValue(item.value)}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={item.label}
                            >
                                {item.label}
                            </label>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}
