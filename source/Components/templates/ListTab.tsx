import React, {
    ReactElement,
    useCallback,
    useDeferredValue,
    useEffect,
    useState,
} from 'react';
import SearchInput from '~/Components/molecules/search-input';

interface ListTabProps<T> {
    items: T[];
    filter: (items: T[], search: string) => T[];
    cards: (
        items: T[],
    ) => JSX.Element | JSX.Element[] | React.ReactNode | ReactElement[] | null;
    Modal: () => JSX.Element;
}

const ListTab = <T,>({ cards, items, Modal, filter }: ListTabProps<T>) => {
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState<T[]>([] as T[]);
    const deferredItems = useDeferredValue(filteredItems);

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const search = e.target.value.toLowerCase();
            setSearch(search);
            setFilteredItems((state) => filter(state, search));
        },
        [filter],
    );

    return (
        <React.Fragment>
            <div className="flex justify-between items-center mb-2">
                {cards(deferredItems)}
            </div>
        </React.Fragment>
    );
};

export default ListTab;
