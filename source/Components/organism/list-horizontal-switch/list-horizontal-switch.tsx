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
        <>
            <div className="flex flex-row flex-wrap justify-between w-full mb-4">
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
            <section className="flex-col flex flex-1 !min-h-[460px] ">
                <div className="flex-[3]">
                    {options.map((option) => (
                        <details
                            // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
                            tabIndex={0}
                            className="w-full collapse collapse-arrow"
                            key={option.value}
                        >
                            <summary className="w-full collapse-title">
                                <ControlToggle
                                    key={option.value}
                                    onChange={(e) => onChange.call(null, e, option)}
                                    name={
                                        `${name}.${
                                            option.value as number
                                        }.checked` as ''
                                    }
                                    label={option.label}
                                />
                            </summary>
                            <div className="collapse-content">
                                <FieldTextArea
                                    label="Observações"
                                    name={`${name}.${option.value}.notes` as ''}
                                />
                            </div>
                        </details>
                    ))}
                </div>
            </section>
        </>
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
                <>
                    <h4 className="mb-2 font-sans font-semibold text-center uppercase mobile:underline mobile:text-primary-500 mobile:font-bold">
                        {makeTitle(category.label, false)}
                    </h4>

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
                    <div className="flex justify-between mt-6">
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
                </>
            )}
        </FieldArray>
    )
}

export default ListHorizontalSwitch
