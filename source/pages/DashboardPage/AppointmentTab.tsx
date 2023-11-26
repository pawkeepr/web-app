import React, {
    useCallback,
    useDeferredValue,
    useEffect,
    useState
} from "react";
import ScheduledNewAppointment from "~/Components/modals/scheduled-appointment";
import FieldDocumentAppointment from '~/Components/molecules/field-document-appointment';
import SearchInput from "~/Components/molecules/search-input";
import DefaultLayout from "../_layouts/dashboard/dashboard";

import HorizontalTabs from "./components/organisms/templates/Horizontal-List";

interface AppointmentsTabsProps<T> {

}

const AppointmentsTabs = <T,>() => {
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState<T[]>([] as T[]);
    const deferredItems = useDeferredValue(filteredItems);

    useEffect(() => {
        setFilteredItems([]);
    }, []);

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const search = e.target.value.toLowerCase();
            setSearch(search);
        },
        []
    );

    return (
        <DefaultLayout title="Dashboard">
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
                    <FieldDocumentAppointment />
                    <ScheduledNewAppointment selectedTabInitial={0} />
                </div>
            </div>
            <HorizontalTabs />
        </DefaultLayout>
    );
};

export default AppointmentsTabs;
