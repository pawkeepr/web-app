import React, { ReactElement, useCallback, useDeferredValue, useEffect, useState } from 'react';
import SearchInput from '~/Components/molecules/search-input';

interface ListTabProps<T> {
    items: T[]
    filter: (items: T[], search: string) => T[]
    cards: (items: T[]) => (JSX.Element | JSX.Element[] | React.ReactNode | ReactElement[] | null)
    Modal: () => JSX.Element
}

const ListTab = <T,>({ cards, items, Modal, filter }: ListTabProps<T>) => {

    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState<T[]>([] as T[]);
    const deferredItems = useDeferredValue(filteredItems);

    useEffect(() => {
        setFilteredItems(items);
    }, [items])

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value.toLowerCase();
        setSearch(search);
        setFilteredItems(state => filter(state, search));
    }, [filter])


    return (
        <div className="gap-2">
            <div className="grid grid-cols-2 w-full gap-2 mb-2">
                <div className="col-span-1 mobile:col-span-full mobile:centering w-full">
                    <SearchInput
                        value={search}
                        onChange={handleSearch}
                        className="form-control mobile:!w-full"
                        placeholder='Busque a Consulta...'
                    />
                </div>
                <div className="col-span-1 mobile:col-span-full w-full sm:flex sm:justify-end sm:items-end">
                    <Modal />
                </div>
            </div>
            <div className="team-list list-view-filter">
                {cards(deferredItems)}
            </div>
        </div>
    );
};

export default ListTab;