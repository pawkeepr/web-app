import { FieldArray, type FieldArrayRenderProps } from 'formik'
import { useMemo } from 'react'
import ControlToggle3States from '~/Components/molecules/control-toggle-3-states'
import {
    TKeysOfQuestionTypes,
    type KeyOfQuestionTypes,
    type Question,
} from '~/constants/anamnese-questions'
import type { VeterinaryConsultation } from '~/types/appointment'
import type { ArrayPaths } from '~/types/helpers'

export type CtxStepAnamnese = Pick<
    VeterinaryConsultation,
    'anamnesis' | 'details_pet_consultation' | 'dates_consults'
>

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type ListInputProps<T extends object = {}> = {
    ctx: T
    items: Question[]
    name: T extends object ? ArrayPaths<T> : string
    categories: string[]
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
    categories: string[],
): [KeyOfQuestionTypes, Option<T>[]][] {
    return categories
        .map((category) => {
            const filteredItems = items
                .filter((item: Question) => item.type.includes(category))
                .map((item: Question) => ({
                    ...item,
                    value: item.id,
                    label: item.question,
                    checked: null,
                    type: category,
                }))
            return [category, filteredItems]
        })
        .filter(([, options]) => options.length > 0) as [
        KeyOfQuestionTypes,
        Option<T>[],
    ][]
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
                <section className="flex-col flex flex-1 !min-h-[460px] ">
                    <div className="flex-[3]">
                        {list.map(([category, options]) => (
                            <section key={category} className="my-1">
                                <h1 className="mb-2 font-sans text-base font-semibold text-gray-500">
                                    {TKeysOfQuestionTypes[category]}
                                </h1>
                                {options.map((option) => (
                                    <ControlToggle3States
                                        key={option.value}
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
