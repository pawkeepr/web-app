import type React from 'react';
import { useCallback, useDeferredValue, useEffect, useState } from 'react';
import ScheduledNewAppointment from '~/Components/modals/scheduled-appointment';
import FieldDocumentAppointment from '~/Components/molecules/field-document-appointment';
import SearchInput from '~/Components/molecules/search-input';
import ContextModalPlus from '~/hooks/use-plus-modal';
import DefaultLayout from '../_layouts/dashboard/dashboard';
import HorizontalTabs from './components/organisms/templates/Horizontal-List';

const PetAndTutors = <T,>() => {
    const [search, setSearch] = useState('');
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
            <div className="flex justify-end items-center">
                <SearchInput
                    value={search}
                    onChange={handleSearch}
                    placeholder="Busque a Consulta..."
                    className="rounded-md w-1/2"
                />

                <div className="w-1/2 flex-row flex items-center ">
                    <FieldDocumentAppointment />
                    <ScheduledNewAppointment selectedTabInitial={0} />
                </div>
            </div>
            <HorizontalTabs />
            <ContextModalPlus />
        </DefaultLayout>
    );
};

export default PetAndTutors;
