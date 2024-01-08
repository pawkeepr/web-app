import { Field } from 'formik';
import { checkbox } from '~/Components/atoms/checkbox';
import Label from '~/Components/atoms/label';

interface RadioGroupProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    items: (T & { name: string; value: unknown })[];
    name: string;
    title: string;
    required?: boolean;
    separator?: string;
}

export default function RadioGroup<T>({
    items = [],
    name,
    title,
    className,
    required,
    separator = ':',
    ...rest
}: RadioGroupProps<T>) {
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
                                name={name}
                                type="radio"
                                value={item.value}
                            />
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
