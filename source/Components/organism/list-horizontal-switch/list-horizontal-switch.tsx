import { FieldArray, type FieldArrayRenderProps } from 'formik'
import { memo, useMemo, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import withControl from '~/Components/helpers/with-control'
import ControlToggle from '~/Components/molecules/control-toggle'
import FieldTextArea from '~/Components/molecules/field-text-area'
import OptionsMenu from '~/Components/molecules/options-menu'
import { makeTitle } from '~/Components/molecules/options-menu/options-menu'
import useKeyboardNavigation from '~/hooks/use-keyboard-navigation'
import type { ArrayPaths } from '~/types/helpers'

export type Question = {
    id: number | string
    question: string
    type: string
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type ListInputProps<Ctx extends object = {}, T = unknown> = {
    ctx: Ctx
    items: Option<T>[]
    name: Ctx extends object ? ArrayPaths<Ctx> : string
    categories: { label: string; value: string }[]
    specialCategory?: { label: string; value: string }[]
    specialItems?: React.ReactNode[]
    onChange: (
        props: FieldArrayRenderProps & {
            checked: boolean
            step: string
            option: Option<T>
        },
    ) => void
}

type Option<T> = {
    value: string | number
    label: string
    checked: boolean
    type: string
} & T

function makeOptions<T>(
    items: Option<T>[],
    categories: { label: string; value: string }[],
): [string, Option<T>[]][] {
    return categories
        .map((category) => {
            const filteredItems: Option<T>[] = items
                .filter((item: Option<T>) => item.type === category.value)
                .map((item: Option<T>) => ({
                    ...item,
                    value: item.value,
                    label: item.label,
                    checked: item.checked,
                    type: category.value,
                }))

            return [category.value, filteredItems]
        })
        .filter(([, options]) => options.length > 0) as [string, Option<T>[]][]
}

type ListSwitchProps<T> = {
    options: Option<T>[]
    onChange: (checked: boolean, option: Option<T>) => void
    onChangeCategory: (category: { label: string; value: string }) => void
    category: { label: string; value: string }
    categories: { label: string; value: string }[]
    name: string
}
const ListSwitch = <T,>({
    categories,
    category,
    options,
    onChange,
    onChangeCategory,
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
                {options.map((option) => (
                    <ControlToggle
                        content={
                            <FieldTextArea
                                label="Observações"
                                name={`${name}.${option.value}.notes` as ''}
                            />
                        }
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

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const ListHorizontalSwitch = <T extends object = {}>({
    items,
    name,
    categories: steps,
    onChange,
}: ListInputProps<T>) => {
    const [category, setCategory] = useState(steps[0])

    const list = useMemo(() => makeOptions(items, steps), [items, steps])

    const keyPressLeft = () => {
        setCategory((prev) => {
            const index = steps.findIndex((item) => item.value === prev.value)
            const next = steps[index - 1]
            if (next) {
                return next
            }
            return prev
        })
    }

    const keyPressRight = () => {
        setCategory((prev) => {
            const index = steps.findIndex((item) => item.value === prev.value)
            const next = steps[index + 1]
            if (next) {
                return next
            }
            return prev
        })
    }

    useKeyboardNavigation({
        ArrowLeft: keyPressLeft,
        ArrowRight: keyPressRight,
    })

    return (
        <FieldArray name={name}>
            {(arrayProps) => (
                <section className="flex flex-col flex-1 !overflow-hidden">
                    <h4 className="flex-1 mb-1 font-sans font-semibold text-center uppercase mobile:underline mobile:text-primary-500 mobile:font-bold">
                        {makeTitle(category.label, false)}
                    </h4>
                    <section className="flex flex-row flex-wrap justify-between w-full">
                        {list.map(([key, options]) => (
                            <ListSwitchControl
                                condition={category.value === key}
                                key={key}
                                name={name}
                                categories={steps}
                                category={category}
                                options={options}
                                onChange={(e, option) =>
                                    onChange?.({
                                        ...arrayProps,
                                        option,
                                        step: category.value,
                                        checked: e,
                                    })
                                }
                                onChangeCategory={setCategory}
                            />
                        ))}
                    </section>
                    <div className="fixed flex justify-between flex-1 w-full px-1 mt-0 bg-transparent bottom-4 h-fit">
                        <button
                            type="button"
                            onClick={keyPressLeft}
                            className="px-4 py-2 rounded-full bg-secondary-500 hover:bg-secondary-600"
                        >
                            <FaArrowLeft />
                        </button>
                        <button
                            onClick={keyPressRight}
                            type="button"
                            className="px-4 py-2 rounded-full bg-secondary-500 hover:bg-secondary-600"
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </section>
            )}
        </FieldArray>
    )
}

export default ListHorizontalSwitch
