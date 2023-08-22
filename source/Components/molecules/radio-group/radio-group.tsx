
import { useField } from 'formik'
import Checkbox from '~/Components/atoms/checkbox'
import Label from '~/Components/atoms/label'

interface RadioGroupProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    items: (T & { name: string, value: any })[]
    name: string
}

export default function RadioGroup<T>({ items = [], name, className, ...rest }: RadioGroupProps<T>) {

    const [field, meta] = useField(name)

    return (

        <div className="mx-auto w-full relative flex justify-center items-center flex-wrap gap-2">
            {
                items.map((item, index) => (
                    <div className="flex flex-row items-center justify-center" key={index}>
                        <Checkbox
                            id={item.name}
                            type="radio"
                            radio
                            required
                            {...field}
                        />
                        <Label htmlFor={item.name} label={item.name} />
                    </div>
                ))
            }
        </div>

    )
}
