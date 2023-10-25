import { LOADING } from "~/helpers/loading";
import {
    GET_ALL,
    GET_ALL_FAIL,
    GET_ALL_SUCCESS,
    STOP_LOADING,
    UPDATE, UPDATE_FAIL, UPDATE_SUCCESS
} from "~/store/helpers/constants";
import { IAppointmentVet } from "../appointment-vet/types";


export interface Data extends IAppointmentVet {

}

export type InitialState = {
    all_scheduled: Data[];
    all_scheduled_confirmed: Data[];
    all_scheduled_canceled: Data[];
    all_scheduled_confirmed_done: Data[];
    isLoading: LOADING;
    isLoadingOnlyOne: LOADING;
    error: string | null;
};

export const name = 'scheduled';

export const SCHEDULED = (action: string) => `${action}/scheduled`

export const ACTION_GET_ALL_SCHEDULED = `${name}/${SCHEDULED(GET_ALL)}`;
export const ACTION_GET_ALL_SCHEDULED_SUCCESS = `${name}/${SCHEDULED(GET_ALL_SUCCESS)}`;
export const ACTION_GET_ALL_SCHEDULED_FAIL = `${name}/${SCHEDULED(GET_ALL_FAIL)}`;

export const SCHEDULED_CONFIRMED = (action: string) => `${action}/scheduled_confirmed`

export const ACTION_GET_ALL_SCHEDULED_CONFIRMED = `${name}/${SCHEDULED_CONFIRMED(GET_ALL)}`;
export const ACTION_GET_ALL_SCHEDULED_CONFIRMED_SUCCESS = `${name}/${SCHEDULED_CONFIRMED(GET_ALL_SUCCESS)}`;
export const ACTION_GET_ALL_SCHEDULED_CONFIRMED_FAIL = `${name}/${SCHEDULED_CONFIRMED(GET_ALL_FAIL)}`;

export const SCHEDULED_CANCELED = (action: string) => `${action}/scheduled_canceled`

export const ACTION_GET_ALL_SCHEDULED_CANCELED = `${name}/${SCHEDULED_CANCELED(GET_ALL)}`;
export const ACTION_GET_ALL_SCHEDULED_CANCELED_SUCCESS = `${name}/${SCHEDULED_CANCELED(GET_ALL_SUCCESS)}`;
export const ACTION_GET_ALL_SCHEDULED_CANCELED_FAIL = `${name}/${SCHEDULED_CANCELED(GET_ALL_FAIL)}`;

export const SCHEDULED_CONFIRMED_DONE = (action: string) => `${action}/scheduled_confirmed_done`

export const ACTION_GET_ALL_SCHEDULED_CONFIRMED_DONE = `${name}/${SCHEDULED_CONFIRMED_DONE(GET_ALL)}`;
export const ACTION_GET_ALL_SCHEDULED_CONFIRMED_DONE_SUCCESS = `${name}/${SCHEDULED_CONFIRMED_DONE(GET_ALL_SUCCESS)}`;
export const ACTION_GET_ALL_SCHEDULED_CONFIRMED_DONE_FAIL = `${name}/${SCHEDULED_CONFIRMED_DONE(GET_ALL_FAIL)}`;

export const ACTION_UPDATE_SCHEDULED = `${name}/${SCHEDULED(UPDATE)}`;
export const ACTION_UPDATE_SCHEDULED_SUCCESS = `${name}/${SCHEDULED(UPDATE_SUCCESS)}`;
export const ACTION_UPDATE_SCHEDULED_FAIL = `${name}/${SCHEDULED(UPDATE_FAIL)}`;

export const ACTION_UPDATE_SCHEDULED_CANCELED = `${name}/${SCHEDULED_CANCELED(UPDATE)}`;
export const ACTION_UPDATE_SCHEDULED_CANCELED_SUCCESS = `${name}/${SCHEDULED_CANCELED(UPDATE_SUCCESS)}`;
export const ACTION_UPDATE_SCHEDULED_CANCELED_FAIL = `${name}/${SCHEDULED_CANCELED(UPDATE_FAIL)}`;

export const ACTION_UPDATE_SCHEDULED_CONFIRMED = `${name}/${SCHEDULED_CONFIRMED(UPDATE)}`;
export const ACTION_UPDATE_SCHEDULED_CONFIRMED_SUCCESS = `${name}/${SCHEDULED_CONFIRMED(UPDATE_SUCCESS)}`;
export const ACTION_UPDATE_SCHEDULED_CONFIRMED_FAIL = `${name}/${SCHEDULED_CONFIRMED(UPDATE_FAIL)}`;

export const ACTION_UPDATE_SCHEDULED_CONFIRMED_DONE = `${name}/${SCHEDULED_CONFIRMED_DONE(UPDATE)}`;
export const ACTION_UPDATE_SCHEDULED_CONFIRMED_DONE_SUCCESS = `${name}/${SCHEDULED_CONFIRMED_DONE(UPDATE_SUCCESS)}`;
export const ACTION_UPDATE_SCHEDULED_CONFIRMED_DONE_FAIL = `${name}/${SCHEDULED_CONFIRMED_DONE(UPDATE_FAIL)}`;


export const ACTION_STOP_LOADING = `${name}/${STOP_LOADING}`;
