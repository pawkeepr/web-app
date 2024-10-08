import { FieldArray, type FieldArrayRenderProps } from 'formik'
import { useMemo } from 'react'
import ControlToggle3States from '~/Components/molecules/control-toggle-3-states'
import FieldTextArea from '~/Components/molecules/field-text-area'

import type { ArrayPaths } from '~/types/helpers'
export type Question = {
    id: number
    question: string
    type: string
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type ListInputProps<T extends object = {}> = {
    ctx: T
    items: Question[]
    name: T extends object ? ArrayPaths<T> : string
    categories: { label: string; value: string }[]
    onChange: (
        props: FieldArrayRenderProps & {
            checked: boolean
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

function makeOptions<T>(
    items: Question[],
    categories: { label: string; value: string }[],
): [string, Option<T>[]][] {
    return categories
        .map((category) => {
            const filteredItems = items
                .filter((item: Question) => item.type === category.value)
                .map((item: Question) => ({
                    ...item,
                    value: item.id,
                    label: item.question,
                    checked: null,
                    type: category.value,
                }))
            return [category.label, filteredItems]
        })
        .filter(([, options]) => options.length > 0) as [string, Option<T>[]][]
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const ListVerticalSwitch = <T extends object = {}>({
    items,
    name,
    categories,
    onChange,
}: ListInputProps<T>) => {
    const list = useMemo(() => makeOptions(items, categories), [items, categories])

    return (
        <FieldArray name={name}>
            {(arrayProps) => (
                <section className="flex-col flex flex-1 !min-h-[460px] mobile:pb-[140px]">
                    <div className="flex-[3]">
                        {list.map(([category, options]) => (
                            <section key={category} className="my-1">
                                <h1 className="px-1 mb-2 font-sans text-base font-semibold text-gray-500">
                                    {category}
                                </h1>
                                {options.map((option) => (
                                    <div key={option.value} className="px-2">
                                        <ControlToggle3States
                                            content={
                                                <FieldTextArea
                                                    label="Observações"
                                                    name={
                                                        `${name}.${option.value}.note` as ''
                                                    }
                                                />
                                            }
                                            initialValue={option.checked}
                                            onChange={(checked) => {
                                                onChange({
                                                    checked,
                                                    option: option as Option<T>,
                                                    ...arrayProps,
                                                })
                                            }}
                                            name={
                                                `${name}.${
                                                    option.value as number
                                                }.checked` as ''
                                            }
                                            label={option.label}
                                        />
                                    </div>
                                ))}
                            </section>
                        ))}
                    </div>
                </section>
            )}
        </FieldArray>
    )
}

export default ListVerticalSwitch
