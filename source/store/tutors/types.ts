import LOADING from "~/constants/loading";
import {
    ADD_FAIL, ADD_NEW, ADD_SUCCESS,
    DELETE, DELETE_FAIL, DELETE_SUCCESS,
    GET_ALL, GET_ALL_FAIL, GET_ALL_SUCCESS,
    STOP_LOADING,
    UPDATE, UPDATE_FAIL, UPDATE_SUCCESS,
} from "../helpers/constants";

export const name = "tutor"

export type ITutor = {
    id: string;
    name: string;
    email: string;
    document: string;
    created_at: string;
    updated_at: string;
    avatar: string;
    phone: string;
    address: {
        zipCode: string;
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string;
        state: string;
    }
}

export interface Data extends ITutor {

}

export type InitialState = {
    data: Data[];
    isLoading: LOADING;
    isLoadingOnlyOne: LOADING;
    error: string | null;
};

export const ACTION_GET_ALL = `${name}/${GET_ALL}`;
export const ACTION_GET_ALL_SUCCESS = `${name}/${GET_ALL_SUCCESS}`;
export const ACTION_GET_ALL_FAIL = `${name}/${GET_ALL_FAIL}`;

export const ACTION_UPDATE = `${name}/${UPDATE}`;
export const ACTION_UPDATE_SUCCESS = `${name}/${UPDATE_SUCCESS}`;
export const ACTION_UPDATE_FAIL = `${name}/${UPDATE_FAIL}`;

export const ACTION_ADD_NEW = `${name}/${ADD_NEW}`;
export const ACTION_ADD_SUCCESS = `${name}/${ADD_SUCCESS}`;
export const ACTION_ADD_FAIL = `${name}/${ADD_FAIL}`;

export const ACTION_DELETE = `${name}/${DELETE}`;
export const ACTION_DELETE_SUCCESS = `${name}/${DELETE_SUCCESS}`;
export const ACTION_DELETE_FAIL = `${name}/${DELETE_FAIL}`;

export const ACTION_STOP_LOADING = `${name}/${STOP_LOADING}`;