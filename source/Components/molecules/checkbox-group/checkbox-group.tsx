import { useField } from 'formik'
import { useState } from 'react'
import Checkbox from '~/Components/atoms/checkbox'

import Label from '~/Components/atoms/label'
import type { ObjPaths } from '~/types/helpers'

type Item = {
    label: string
    value: unknown
}

interface CheckboxGroupProps<Ctx> extends React.HTMLAttributes<HTMLDivElement> {
    items: Item[]
    ctx?: Ctx extends undefined ? never : Ctx
    name: Ctx extends undefined ? string : ObjPaths<Ctx>
    label: string
    required?: boolean
    disabledError?: boolean
    divClassName?: string
}

export default function CheckboxGroup<Ctx>({
    items = [],
    name,
    label,
    required,
    id,
    divClassName,
}: CheckboxGroupProps<Ctx>) {
    const [field, _meta, helpers] = useField(name)

    const { setValue } = helpers

    const [checkedValues, setCheckedValues] = useState<string[]>([])

    function setCheckboxValue(name: string) {
        if (!checkedValues.includes(name)) {
            return setCheckedValues((values) => {
                const result = [...values, name]
                setValue(result)
                return result
            })
        }

        setCheckedValues((values) => {
            const result = values.filter((element) => element !== name)
            setValue(result)
            return result
        })
    }

    return (
        <div className={divClassName}>
            <Label label={label} required={required} id={id} separator=":" />
            <div className="flex items-center justify-around gap-1 flex-wrap ">
                {items.map((item, index) => (
                    <div
                        className="flex w-fit flex-row items-center mobile:flex-grow justify-center"
                        key={`${item.value}-${index}`}
                    >
                        <div className="w-fit ">
                            <Checkbox
                                id={item.value as string}
                                type="checkbox"
                                checked={checkedValues.includes(
                                    item.value as string,
                                )}
                                {...field}
                                onChange={() =>
                                    setCheckboxValue(item.value as string)
                                }
                            />
                        </div>
                        <Label
                            className="flex-[3]"
                            htmlFor={item.value as string}
                            label={item.label}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
