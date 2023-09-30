import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";

import { Tab } from '@headlessui/react';
import cn from 'classnames';
import { useEffect, useState } from "react";


export type ItemProps<T> = {
    value: string
    label: string
} & T

export type CardProps<T> = {
    index: number
    name: string
} & ItemProps<T>

type MenuMultipleSelectionProps<T> = {
    label: string
    name: string
    options: {
        value: string
        label: string
        color: string
    }[]
    items: ItemProps<T>[]
    card: (props: CardProps<T>) => JSX.Element
}

const MenuMultipleSelection = <T,>({
    options,
    items,
    label,
    name,
    card
}: MenuMultipleSelectionProps<T>) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const Card = card

    useEffect(() => {
        setSelectedIndex(0)
    }, [items])


    return (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <div className="grid grid-cols-2 gap-2">
                <Tab.List
                    className={
                        cn(
                            "flex space-x-1 rounded-sm col-span-full bg-primary-900/20 p-1 w-full justify-center items-center",
                            {
                                'hidden': !items?.length
                            })
                    }>
                    {
                        items?.map(
                            (item) => (
                                <Tab
                                    key={item.value}
                                    className={({ selected }) =>
                                        cn(
                                            'w-full rounded-lg py-2.5 text-sm font-semibold leading-5 text-primary-500',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-secondary-400 focus:outline-none focus:ring-2',
                                            {
                                                'bg-white shadow': selected,
                                                '!text-gray-500 hover:bg-white/[0.12] hover:text-white': !selected
                                            }
                                        )
                                    }
                                >
                                    {item.label}
                                </Tab>
                            )
                        )
                    }
                </Tab.List>
                <div className="flex flex-col col-span-2 w-full">
                    <FieldControlSelect
                        isMulti
                        options={options}
                        divClassName="w-full mb-2"
                        label={label}
                        name={name}
                    />
                    <Tab.Panels>
                        {
                            items?.map(
                                (item, index: number) => (
                                    <Tab.Panel key={index}>
                                        <Card index={index} name={name} {...item} />
                                    </Tab.Panel>
                                )
                            )
                        }
                    </Tab.Panels>
                </div>
            </div>
        </Tab.Group>
    )
}

export default MenuMultipleSelection