import type { AxiosResponse } from "axios";
import {
    type IDateConsult,
    getAllAppointmentsDonePet,
} from "~/services/helpers";
import type { VeterinaryConsultation } from "~/types/appointment";
import useAppStore from "../use-app-store";

type AppointmentStrategy =
    | "scheduled"
    | "canceled"
    | "done"
    | "rescheduled"
    | "confirmed";

type FGetAxios<T = unknown, G = unknown> = (
    ...args: unknown[]
) => Promise<AxiosResponse<T, G>>;

const nameStrategy = new Map<AppointmentStrategy, string>([
    ["scheduled", "appointment-scheduled"],
    ["canceled", "appointment-canceled"],
    ["done", "appointment-done"],
    ["rescheduled", "appointment-rescheduled"],
    ["confirmed", "appointment-confirmed"],
] as const);

const getStrategy = (id_pet: string) =>
    new Map<AppointmentStrategy, FGetAxios>([
        ["scheduled", getAllAppointmentsDonePet.bind(null, id_pet)],
        ["canceled", getAllAppointmentsDonePet.bind(null, id_pet)],
        ["done", getAllAppointmentsDonePet.bind(null, id_pet)],
        ["rescheduled", getAllAppointmentsDonePet.bind(null, id_pet)],
        ["confirmed", getAllAppointmentsDonePet.bind(null, id_pet)],
    ] as const);

type UseAppointmentByPetProps = {
    mode: AppointmentStrategy;
    id_pet: string;
    handleClose?: () => void;
};

const name = "appointment";

export const useListAppointmentsByPet = ({
    mode,
    id_pet,
    handleClose: handleCloseModal,
}: UseAppointmentByPetProps) => {
    if (!mode) throw new Error("Mode is required");

    const keys = [name, nameStrategy.get(mode) as string];
    const get = getStrategy(id_pet).get(mode) as FGetAxios<
        VeterinaryConsultation[]
    >;

    return useAppStore<
        VeterinaryConsultation[],
        IDateConsult | VeterinaryConsultation
    >({
        get,
        handleCloseModal,
        keys,
        name,
        initialData: [],
    });
};

export default useListAppointmentsByPet;
