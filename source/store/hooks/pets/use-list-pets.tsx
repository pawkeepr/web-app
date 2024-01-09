import useAppQuery from '~/hooks/use-app-query';
import { getAllPetsOfClinic } from '~/services/helpers';
import { IPetV2Data } from '~/types/pet-v2';

export const NAME = 'list-pets';
const TIME = 1000 * 60 * 1; // 1 min

const useListPets = () => {
    const superKeys = [NAME];

    return useAppQuery<IPetV2Data[]>(superKeys, getAllPetsOfClinic, {
        initialData: [],
        keepPreviousData: true,
        cacheTime: TIME, // 1 min
        // staleTime: TIME // 1 min
    });
};

export default useListPets;
