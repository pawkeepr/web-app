<<<<<<< HEAD
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

=======
import DefaultLayout from '../_layouts/dashboard/dashboard'

import HorizontalTabs from './components/organisms/templates/Horizontal-List'

const PetAndTutors = <T,>() => {
>>>>>>> main
    return (
        <DefaultLayout title="Dashboard">
            <HorizontalTabs />
        </DefaultLayout>
    )
}

export default PetAndTutors
