import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import cn from 'classnames'
import { Fragment } from 'react'
import { Form } from 'react-bootstrap'
import { If } from '~/utils/tsx-control-statements'
import useListBox, { Item } from './use-list-box'

export type ListBoxTailwindProps<T> = {
    items: Array<Item & T>
    option?: Item & T
    value?: string | null
    label?: string
    required?: boolean
    name: string
    reset?: any // toda vez que o valor do name mudar, o valor do select será resetado
    disabled?: boolean
    placeholder?: string
    onChangeOption?: (item: Item & T) => void
}

export default function ListBoxTailwind<T>({
    label,
    required = false,
    name,
    option,
    reset,
    value,
    onChangeOption,
    items,
    placeholder = 'Selecione uma opção',
    disabled = false,
}: ListBoxTailwindProps<T>) {

    const { isPending, onChangeValue, placeholderState, selected } = useListBox({
        name,
        option,
        reset,
        value,
        onChangeOption,
        items,
        placeholder,
    })

    return (
        <div>
            <If condition={!!label}>
                <Form.Label htmlFor={name} className="mb-0 list-group-item fs-12" data-testid={`label-${name}`}>
                    {label}
                    <If condition={required}>
                        <span className="text-danger">*</span>
                    </If>
                </Form.Label>
            </If>
            {
                isPending && (<div className="spinner-border text-primary item-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>)
            }

            {
                !isPending && (
                    <Listbox value={selected} onChange={onChangeValue} disabled={disabled}>
                        <div className="relative mt-1">
                            <Listbox.Button
                                data-testid="list-box-tailwind"
                                placeholder={placeholder}
                                id={`${name}-list-box-tailwind`}
                                className="
                                    relative w-full cursor-default 
                                    rounded-lg bg-white dark:!bg-dark
                                    py-2 pl-3 pr-10 text-left 
                                    shadow-md focus:outline-none 
                                    focus-visible:border-indigo-500 
                                    focus-visible:ring-2 
                                    focus-visible:ring-white 
                                    focus-visible:ring-opacity-75 
                                    focus-visible:ring-offset-2 
                                    focus-visible:ring-offset-orange-300 
                                    sm:text-sm
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    disabled:dark:opacity-70"
                            >
                                {
                                    disabled && (
                                        <span className="block truncate">{value || placeholder}</span>
                                    )
                                }

                                {
                                    !disabled && (
                                        <span className="block truncate">{placeholderState}</span>
                                    )
                                }
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options
                                    data-testid="list-box-tailwind-options"
                                    className="
                                    absolute mt-1 max-h-60 w-full 
                                    overflow-auto rounded-md bg-white
                                    dark:!bg-gray-700 py-1 
                                    text-base shadow-lg ring-1 
                                    ring-black ring-opacity-5 
                                    focus:outline-none sm:text-sm z-5u0
                                    "
                                >
                                    {items?.map((item, itemIdx) => (
                                        <Listbox.Option
                                            data-testid={`list-box-tailwind-options-${itemIdx}`}
                                            key={itemIdx}
                                            className={({ active }) => {
                                                return cn(
                                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                                    {
                                                        'bg-primary-600 text-gray-200': active,
                                                        'text-gray-900 dark:text-gray-200': !active
                                                    }
                                                )
                                            }
                                            }
                                            value={item}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={cn(
                                                            'block truncate',
                                                            {
                                                                'font-medium': selected,
                                                                'font-normal': !selected
                                                            }
                                                        )
                                                        }
                                                    >
                                                        {item.name}
                                                    </span>
                                                    {selected && (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    )
                                                    }
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                )
            }
        </div>
    )
}
