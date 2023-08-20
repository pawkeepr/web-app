import React, {
    ReactElement,
    useCallback,
    useDeferredValue,
    useEffect,
    useState,
} from "react";
import SearchInput from "~/Components/molecules/search-input";

import HorizontalTabs from "../../pages/DashboardPage/components/organisms/templates/Horizontal-List";


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
            <HorizontalTabs />
            <div
                className="
                md:w-full
                flex 
                flex-wrap
                mobile:gap-3
                items-center 
                justify-between
                "
            >

                <div
                    className="
                    mobile:w-full
                    mobile:hidden
                    "
                >
                    <SearchInput
                        value={search}
                        onChange={handleSearch}
                        className="form-control mobile:!w-full border-2 border-solid border-primary-500"
                        placeholder="Busque a Consulta..."
                    />
                </div>
                <div
                    className="
                    mobile:flex content-start
                    "
                >
                    <Modal />
                </div>
            </div>
            <div className="team-list list-view-filter">
                <div
                    className="
                    mt-1 
                    mb-2
                    mobile:w-full
                    hidden
                    mobile:block
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
