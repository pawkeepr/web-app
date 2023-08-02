import React, {
    ReactElement,
    useCallback,
    useDeferredValue,
    useEffect,
    useState,
} from "react";
import SearchInput from "~/Components/molecules/search-input";

interface ListTabProps<T> {
    items: T[];
    filter: (items: T[], search: string) => T[];
    cards: (
        items: T[]
    ) => JSX.Element | JSX.Element[] | React.ReactNode | ReactElement[] | null;
    Modal: () => JSX.Element;
}

const ListTab = <T,>({ cards, items, Modal, filter }: ListTabProps<T>) => {
    const [search, setSearch] = useState("");
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
        [filter]
    );

    return (
        <React.Fragment>
            <div
                className="
                flex 
                flex-wrap
                mobile:gap-3
                align-center 
                justify-between
                mt-4
                mb-4
                "
            >
                <div
                    className="
                    mt-4
                    w-1/2
                    
                    block sm:hidden
                    "
                >
                     
                </div>
                <div
                    className="
                    mobile:flex content-start
                    "
                >
                    <Modal />
                </div>
            </div>
            <div className="team-list list-view-filter"
                
            >
            <div
                    className="
                    mt-4 
                    mb-4
                    block lg:hidden xl:hidden
  
                    "
                >
                    <SearchInput
                        value={search}
                        onChange={handleSearch}
                        className="form-control mobile:!w-full border-2 border-solid border-primary-500"
                        placeholder="Busque a Consulta..."
                    />
                </div>
                {cards(deferredItems)}
            </div>
        </React.Fragment>
    );
};

export default ListTab;
