import { getAllVetsOfTutors } from "~/services/helpers";
import type { IMainResponsibleGuardian } from "~/types/pet-v2";
import useAppStore from "../use-app-store";

export const NAME = "list-vets-by-tutor";

const useListVets = (cpf_cnpj: string) => {
    const superKeys = [NAME];

    return useAppStore<IMainResponsibleGuardian[]>({
        get: getAllVetsOfTutors.bind(null, cpf_cnpj),
        keys: superKeys,
        name: NAME,
    });
};

export default useListVets;
