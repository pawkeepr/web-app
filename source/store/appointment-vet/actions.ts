import { createAction } from '@reduxjs/toolkit';

import {
    ACTION_ADD_FAIL,
    ACTION_ADD_NEW,
    ACTION_ADD_SUCCESS,
    ACTION_DELETE,
    ACTION_DELETE_FAIL,
    ACTION_DELETE_SUCCESS,
    ACTION_GET_ALL,
    ACTION_GET_ALL_FAIL,
    ACTION_GET_ALL_INATIVES,
    ACTION_GET_ALL_INATIVES_FAIL,
    ACTION_GET_ALL_INATIVES_SUCCESS,
    ACTION_GET_ALL_SUCCESS,
    ACTION_STOP_LOADING,
    ACTION_UPDATE,
    ACTION_UPDATE_FAIL,
    ACTION_UPDATE_SUCCESS,
    Data
} from './types';

export const getAll = createAction(ACTION_GET_ALL);
export const getAllSuccess = createAction<Data[]>(ACTION_GET_ALL_SUCCESS)
export const getAllFail = createAction<string>(ACTION_GET_ALL_FAIL);

export const getAllInatives = createAction(ACTION_GET_ALL_INATIVES);
export const getAllInativesSuccess = createAction<Data[]>(ACTION_GET_ALL_INATIVES_SUCCESS)
export const getAllInativesFail = createAction<string>(ACTION_GET_ALL_INATIVES_FAIL);

export const update = createAction<{ id: string, data: Partial<Data> }>(ACTION_UPDATE);
export const updateSuccess = createAction<Data>(ACTION_UPDATE_SUCCESS);
export const updateFail = createAction<string>(ACTION_UPDATE_FAIL);

export const addNew = createAction<Data>(ACTION_ADD_NEW);
export const addSuccess = createAction<Data>(ACTION_ADD_SUCCESS);
export const addFail = createAction<string>(ACTION_ADD_FAIL);

export const deleteOnly = createAction<{ id: string }>(ACTION_DELETE);
export const deleteSuccess = createAction<{ id: string }>(ACTION_DELETE_SUCCESS);
export const deleteFail = createAction<string>(ACTION_DELETE_FAIL);

// export const toggleStatus = createAction<{ id: string, data: Pick<Data, 'active'> }>(ACTION_TOGGLE_STATUS);
// export const toggleStatusSuccess = createAction<Data>(ACTION_TOGGLE_STATUS_SUCCESS);
// export const toggleStatusFail = createAction<string>(ACTION_TOGGLE_STATUS_FAIL);

export const stopLoading = createAction(ACTION_STOP_LOADING);
