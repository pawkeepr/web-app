import { memo } from 'react'
import withControl from '~/Components/helpers/with-control'
import ControlToggle from '~/Components/molecules/control-toggle'
import FieldTextArea from '~/Components/molecules/field-text-area'
import OptionsMenu from '~/Components/molecules/options-menu'

export type Option<T> = {
    value: string | number
    label: string
    checked: boolean
    type: string
    type_action?: string | null
} & T

type ListSwitchProps<T> = {
    options: Option<T>[]
    onChange: (checked: boolean, option: Option<T>) => void
    onChangeCategory: (category: { label: string; value: string }) => void
    category: { label: string; value: string }
    categories: { label: string; value: string }[]
    content?: (params: {
        label: string
        name: string
        option: Option<T>
        onChange: (e: unknown) => void
    }) => React.ReactNode
    name: string
}

const ListSwitch = <T,>({
    categories,
    category,
    options,
    onChange,
    onChangeCategory,
    content = ({ label, name }) => (
        <FieldTextArea label={label} name={name as ''} />
    ),
    name,
}: ListSwitchProps<T>) => {
    const Content = content
    return (
        <section className="w-full">
            <div className="flex flex-row flex-wrap justify-between w-full ">
                {categories.map((item) => (
                    <OptionsMenu
                        key={item.value}
                        item={item}
                        option={category}
                        classNames={{
                            label: 'mobile:hidden',
                        }}
                        onChangeOption={(item) =>
                            onChangeCategory({
                                ...item,
                                label: item.label,
                                value: item.value as string,
                            })
                        }
                    />
                ))}
            </div>
            <section className="w-full mt-2 h-[80vh] overflow-y-auto scroll pb-[160px] z-10">
                {options.map((option) => (
                    <ControlToggle
                        content={({ checked, name, onChange }) => (
                            <Content
                                onChange={(e) => onChange?.(e)}
                                label="Observações"
                                name={`${name}.${option.value as number}` as ''}
                                option={{
                                    ...option,
                                    value: option.value,
                                    label: option.label,
                                    checked,
                                }}
                            />
                        )}
                        key={option.value}
                        onChange={(e) => onChange.call(null, e, option)}
                        name={`${name}.${option.value as number}.checked` as ''}
                        label={option.label}
                    />
                ))}
            </section>
        </section>
    )
}

const ListSwitchControl = withControl(memo(ListSwitch))

export default ListSwitchControl
