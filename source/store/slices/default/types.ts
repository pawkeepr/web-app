import { LOADING } from '~/helpers/loading';
import {
    ADD_FAIL,
    ADD_NEW,
    ADD_SUCCESS,
    DELETE,
    DELETE_FAIL,
    DELETE_SUCCESS,
    GET_ALL,
    GET_ALL_ATIVES,
    GET_ALL_ATIVES_FAIL,
    GET_ALL_ATIVES_SUCCESS,
    GET_ALL_FAIL,
    GET_ALL_INATIVES,
    GET_ALL_INATIVES_FAIL,
    GET_ALL_INATIVES_SUCCESS,
    GET_ALL_SUCCESS,
    STOP_LOADING,
    TOGGLE_STATUS,
    TOGGLE_STATUS_FAIL,
    TOGGLE_STATUS_SUCCESS,
    UPDATE,
    UPDATE_FAIL,
    UPDATE_SUCCESS,
} from '~/store/helpers/constants';

export interface IDefault {
    _id: string;
    active: boolean;
}

export type Data = IDefault;

export type InitialState = {
    data: Data[];
    inatives: Data[];
    isLoading: LOADING;
    isLoadingOnlyOne: LOADING;
    error: string | null;
};

export const name = 'default';

export const ACTION_GET_ALL = `${name}/${GET_ALL}`;
export const ACTION_GET_ALL_SUCCESS = `${name}/${GET_ALL_SUCCESS}`;
export const ACTION_GET_ALL_FAIL = `${name}/${GET_ALL_FAIL}`;

export const ACTION_GET_ALL_ATIVES = `${name}/${GET_ALL_ATIVES}`;
export const ACTION_GET_ALL_ATIVES_SUCCESS = `${name}/${GET_ALL_ATIVES_SUCCESS}`;
export const ACTION_GET_ALL_ATIVES_FAIL = `${name}/${GET_ALL_ATIVES_FAIL}`;

export const ACTION_GET_ALL_INATIVES = `${name}/${GET_ALL_INATIVES}`;
export const ACTION_GET_ALL_INATIVES_SUCCESS = `${name}/${GET_ALL_INATIVES_SUCCESS}`;
export const ACTION_GET_ALL_INATIVES_FAIL = `${name}/${GET_ALL_INATIVES_FAIL}`;

export const ACTION_UPDATE = `${name}/${UPDATE}`;
export const ACTION_UPDATE_SUCCESS = `${name}/${UPDATE_SUCCESS}`;
export const ACTION_UPDATE_FAIL = `${name}/${UPDATE_FAIL}`;

export const ACTION_ADD_NEW = `${name}/${ADD_NEW}`;
export const ACTION_ADD_SUCCESS = `${name}/${ADD_SUCCESS}`;
export const ACTION_ADD_FAIL = `${name}/${ADD_FAIL}`;

export const ACTION_DELETE = `${name}/${DELETE}`;
export const ACTION_DELETE_SUCCESS = `${name}/${DELETE_SUCCESS}`;
export const ACTION_DELETE_FAIL = `${name}/${DELETE_FAIL}`;

export const ACTION_TOGGLE_STATUS = `${name}/${TOGGLE_STATUS}`;
export const ACTION_TOGGLE_STATUS_SUCCESS = `${name}/${TOGGLE_STATUS_SUCCESS}`;
export const ACTION_TOGGLE_STATUS_FAIL = `${name}/${TOGGLE_STATUS_FAIL}`;

export const ACTION_STOP_LOADING = `${name}/${STOP_LOADING}`;
