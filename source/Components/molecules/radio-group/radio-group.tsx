import { Field } from 'formik'
import { checkbox } from '~/Components/atoms/checkbox'
import Label from '~/Components/atoms/label'
import type { ObjPaths } from '~/types/helpers'

interface RadioGroupProps<T, Ctx = undefined>
    extends React.HTMLAttributes<HTMLDivElement> {
    items: (T & { name: string; value: unknown })[]
    ctx?: Ctx extends undefined ? never : Ctx
    name: Ctx extends undefined ? string : ObjPaths<Ctx>
    title: string
    required?: boolean
    separator?: string
    checked?: string | number | object
}

export default function RadioGroup<T, Ctx = undefined>({
    items = [],
    name,
    title,
    className,
    required,
    checked,
    separator = ':',
    ...rest
}: RadioGroupProps<T, Ctx>) {
    return (
        <div className="col-span-full">
            <Label
                label={title}
                required={required}
                id={name as string}
                separator={separator as string}
            />
            <div
                className="justify-center items-center flex mobile:flex-col mobile:items-start col-span-full"
                role="group"
                aria-labelledby={name as string}
            >
                {items.map((item, index) => (
                    <div
                        className="flex flex-row items-center justify-center"
                        key={item.name + index}
                    >
                        <Label
                            required={required}
                            id={item.name as string}
                            label={item.name}
                        >
                            <Field
                                className={checkbox({
                                    className,
                                    radio: true,
                                    ...rest,
                                })}
                                checked={item.value === checked}
                                name={name}
                                type="radio"
                                value={item.value}
                            />
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    )
}
