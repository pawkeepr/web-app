import { FieldArray, type FieldArrayRenderProps } from 'formik'
import { useMemo, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
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
    checked: boolean | null
    type: string
} & T

export const makeOptions = <T,>(items: Option<T>[], category: string) => {
    const filtered = items.filter((item) => item.type === category)

    return filtered
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const ListHorizontalSwitch = <T extends object = {}>({
    items,
    name,
    categories: steps,
    onChange,
}: ListInputProps<T>) => {
    const [category, setCategory] = useState(steps[0])
    const list = useMemo(
        () => makeOptions(items, category.value),
        [items, category.value],
    )

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
                    <div className="flex flex-row flex-wrap justify-between w-full mb-4">
                        {steps.map((item) => (
                            <OptionsMenu
                                key={item.value}
                                item={item}
                                option={category}
                                classNames={{
                                    label: 'mobile:hidden',
                                }}
                                onChangeOption={(item) =>
                                    setCategory({
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
                            {list.map((option) => (
                                <details
                                    // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
                                    tabIndex={0}
                                    className="w-full collapse collapse-arrow"
                                    key={option.value}
                                >
                                    <summary className="w-full collapse-title">
                                        <ControlToggle
                                            key={option.value}
                                            onChange={(e) =>
                                                onChange?.({
                                                    ...arrayProps,
                                                    option,
                                                    step: category.value,
                                                    checked: e,
                                                })
                                            }
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
                                            name={
                                                `${name}.${option.value}.note` as ''
                                            }
                                        />
                                    </div>
                                </details>
                            ))}
                        </div>
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
                    </section>
                </>
            )}
        </FieldArray>
    )
}

export default ListHorizontalSwitch
