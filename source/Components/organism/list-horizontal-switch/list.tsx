import type { FieldArrayRenderProps } from 'formik'
import withControl from '~/Components/helpers/with-control'
import ControlToggle from '~/Components/molecules/control-toggle'
import OptionsMenu from '~/Components/molecules/options-menu'
import type { ContentProps } from './list-horizontal-switch'

type Option<T> = {
    value: string | number
    label: string
    checked: boolean
    type: string
} & T

type ListSwitchProps<T> = {
    options: Option<T>[]
    onChange: (checked: boolean, option: Option<T>) => void
    onChangeCategory: (category: { label: string; value: string }) => void
    category: { label: string; value: string }
    categories: { label: string; value: string }[]
    content?: (props: ContentProps<T>) => React.ReactNode
    name: string
    arrayProps: FieldArrayRenderProps
}

const List = <T,>({
    categories,
    category,
    options,
    onChange,
    onChangeCategory,
    content,
    arrayProps,
    name,
}: ListSwitchProps<T>) => {
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
                {options.map((option, index) => (
                    <ControlToggle
                        content={content?.({
                            option,
                            index,
                            ...arrayProps,
                        })}
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

const ListControl = withControl(List)

export default ListControl
