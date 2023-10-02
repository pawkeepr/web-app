import React, {
    ReactElement,
    useCallback,
    useDeferredValue,
    useEffect,
    useState,
} from "react";
import SearchInput from "~/Components/molecules/search-input";
import AddNewAppointment from "../modals/add-appointment/add-appointment-modal";

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
            <div className="flex justify-between items-center">
                <div
                    className="team-list w-1/2 list-view-filter col-span-8"
                    style={{ marginTop: 12 }}
                >
                        <SearchInput
                            value={search}
                            onChange={handleSearch}
                            placeholder="Busque a Consulta..."
                            className="rounded-md"
                        />
                </div>

                <div className="flex col-span-4 items-center gap-2">
                    <Modal />
                    <div style={{ marginTop: 10 }}>
                        <AddNewAppointment />
                    </div>
                </div>
            </div>
            <HorizontalTabs />
            {cards(deferredItems)}
        </React.Fragment>
    );
};

export default ListTab;
