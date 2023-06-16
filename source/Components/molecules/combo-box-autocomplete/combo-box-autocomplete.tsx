import { Combobox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { FaArrowAltCircleDown, FaCheck } from 'react-icons/fa'
import FieldControl from '../field-control/field-control'

import { useFormikContext } from 'formik'
import { InputControlProps } from '../field-control/types'

import cn from 'classnames'

type Item = {
    item: string[]
}

type ComboBoxAutocompleteProps<T> = {
    items: string[]
    option?: Item & T
    onChangeOption?: (item: Item & T) => void
    onChange?: (item: string) => void
} & InputControlProps

const ComboBoxAutocomplete = <T,>({ name, items = [], option, onChange, onChangeOption, ...rest }: ComboBoxAutocompleteProps<T>) => {
    const [selected, setSelected] = useState<Item & T>(option || {} as Item & T)
    const [query, setQuery] = useState('')

    const { setFieldValue, values } = useFormikContext<{ [key in string]: any }>()
    const queryValue = values[name]

    useEffect(() => {
        setQuery(queryValue)
    }, [queryValue])

    
    const onChangeValue = (item: Item & T) => {
        onChangeOption?.(item)
        setSelected(item)
        setFieldValue(name, item)
    }

    const filteredItems =
        query === '' || query === undefined || query === null
            ? items
            : items.filter((item) =>
                item.toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query?.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        <Combobox value={selected} onChange={onChangeValue}>
            <div className="relative  w-full items-center ">
                <div className="relative">
                    <FieldControl
                        
                        className='form-control'
                        name={name}
                        disabled={true}
                        component={Combobox.Input as any}
                        displayValue={items}
                        {...rest}
                    >
                        <Combobox.Button className="flex items-center p-1 mx-2 position-absolute right-0 top-0 bottom-0">
                            <FaArrowAltCircleDown
                                className="h-3 w-3 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </FieldControl>
                </div>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options
                        className="
                            absolute max-h-60 
                            w-full overflow-auto 
                            rounded-md light:bg-white 
                            text-base shadow-lg 
                            ring-1 ring-black 
                            ring-opacity-5 
                            focus:outline-none 
                            sm:text-sm
                            z-50
                            dark:!bg-gray-700
                        "
                    >
                        {filteredItems.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredItems.map((item) => (
                                <Combobox.Option
                                    key={item}
                                    className={({ active }) =>
                                        cn(
                                            'relative cursor-default select-none py-2 pl-10 pr-4',
                                            {
                                                'bg-primary-600 text-white': active,
                                                'text-gray-900': !active
                                            },
                                            'dark:text-gray-200 '
                                        )
                                    }
                                    
                                    value={item}
                                    onClick={() => {
                                        if (typeof onChange === 'function') {
                                          onChange(item);
                                        }
                                      }}
                                >
                                    {({ selected, active }) => (
                                        <div>
                                            <span
                                                className={
                                                    cn({
                                                        'block truncate': true,
                                                        'font-medium': selected,
                                                        'font-normal': !selected
                                                    })
                                                }
                                            >
                                                {item}
                                            </span>
                                            {selected && (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                        }`}
                                                >
                                                    <FaCheck />
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}

export default ComboBoxAutocomplete