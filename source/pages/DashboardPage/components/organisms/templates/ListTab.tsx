import React, { ReactElement, useCallback, useDeferredValue, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import SearchInput from '~/Components/molecules/search-input/search-input';

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
        <React.Fragment>
            <Row className="g-4 mb-3">
                <div className="col-sm">
                    <SearchInput
                        value={search}
                        onChange={handleSearch}
                        className="form-control"
                        placeholder='Busque a Consulta...'
                    />
                </div>
                <div className="col-sm-auto">
                    <Modal />
                </div>
            </Row>
            <div className="team-list list-view-filter">
                {cards(deferredItems)}
            </div>

        </React.Fragment>
    );
};

export default ListTab;