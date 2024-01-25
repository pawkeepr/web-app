import type React from 'react'
import type { ReactElement } from 'react'

interface ListTabProps<T> {
    items: T[]
    cards: (
        items: T[],
    ) => JSX.Element | JSX.Element[] | React.ReactNode | ReactElement[] | null
}

const ListTab = <T,>({ cards, items }: ListTabProps<T>) => {
    return (
        <div className="flex w-full flex-col gap-3 justify-between mb-2">
            {cards(items)}
        </div>
    )
}

export default ListTab
