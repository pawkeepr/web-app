import useAppQuery from '~/hooks/use-app-query';
import { getAllTutorsOfClinic } from '~/services/helpers';
import { IPetV2Data } from '~/types/pet-v2';

export const NAME = 'list-tutors';
const TIME = 1000 * 60 * 1; // 1 min

const useListTutors = () => {
    const superKeys = [NAME];

    return useAppQuery<IPetV2Data[]>(superKeys, getAllTutorsOfClinic, {
        initialData: [],
        keepPreviousData: true,
        cacheTime: TIME, // 1 min,
        // staleTime: TIME // 1 min
    });
};

export default useListTutors;
