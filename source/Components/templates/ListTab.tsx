import React, { ReactElement, useDeferredValue, useEffect, useState } from 'react'

interface ListTabProps<T> {
    items: T[]
    filter: (items: T[], search: string) => T[]
    cards: (
        items: T[],
    ) => JSX.Element | JSX.Element[] | React.ReactNode | ReactElement[] | null
    Modal: () => JSX.Element
}

const ListTab = <T,>({ cards, items }: ListTabProps<T>) => {
    const [filteredItems, setFilteredItems] = useState<T[]>([] as T[])
    const deferredItems = useDeferredValue(filteredItems)

    useEffect(() => {
        setFilteredItems(items)
    }, [items])

    return (
        <React.Fragment>
            <div className="flex justify-between items-center mb-2">
                {cards(deferredItems)}
            </div>
        </React.Fragment>
    )
}

export default ListTab
