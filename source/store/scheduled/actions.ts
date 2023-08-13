import { createAction } from '@reduxjs/toolkit';

import {
    ACTION_GET_ALL_SCHEDULED,
    ACTION_GET_ALL_SCHEDULED_CANCELED,
    ACTION_GET_ALL_SCHEDULED_CANCELED_FAIL,
    ACTION_GET_ALL_SCHEDULED_CANCELED_SUCCESS,
    ACTION_GET_ALL_SCHEDULED_CONFIRMED,
    ACTION_GET_ALL_SCHEDULED_CONFIRMED_DONE,
    ACTION_GET_ALL_SCHEDULED_CONFIRMED_DONE_FAIL,
    ACTION_GET_ALL_SCHEDULED_CONFIRMED_DONE_SUCCESS,
    ACTION_GET_ALL_SCHEDULED_CONFIRMED_FAIL,
    ACTION_GET_ALL_SCHEDULED_CONFIRMED_SUCCESS,
    ACTION_GET_ALL_SCHEDULED_FAIL,
    ACTION_GET_ALL_SCHEDULED_SUCCESS,
    ACTION_STOP_LOADING,
    ACTION_UPDATE_SCHEDULED,
    ACTION_UPDATE_SCHEDULED_CANCELED,
    ACTION_UPDATE_SCHEDULED_CANCELED_FAIL,
    ACTION_UPDATE_SCHEDULED_CANCELED_SUCCESS,
    ACTION_UPDATE_SCHEDULED_CONFIRMED,
    ACTION_UPDATE_SCHEDULED_CONFIRMED_DONE,
    ACTION_UPDATE_SCHEDULED_CONFIRMED_DONE_FAIL,
    ACTION_UPDATE_SCHEDULED_CONFIRMED_DONE_SUCCESS,
    ACTION_UPDATE_SCHEDULED_CONFIRMED_FAIL,
    ACTION_UPDATE_SCHEDULED_CONFIRMED_SUCCESS,
    ACTION_UPDATE_SCHEDULED_FAIL,
    ACTION_UPDATE_SCHEDULED_SUCCESS,
    Data
} from './types';

export const getAllScheduled = createAction(ACTION_GET_ALL_SCHEDULED);
export const getAllScheduledSuccess = createAction<Data[]>(ACTION_GET_ALL_SCHEDULED_SUCCESS)
export const getAllScheduledFail = createAction<string>(ACTION_GET_ALL_SCHEDULED_FAIL);

export const getAllScheduledCanceled = createAction(ACTION_GET_ALL_SCHEDULED_CANCELED);
export const getAllScheduledCanceledSuccess = createAction<Data[]>(ACTION_GET_ALL_SCHEDULED_CANCELED_SUCCESS)
export const getAllScheduledCanceledFail = createAction<string>(ACTION_GET_ALL_SCHEDULED_CANCELED_FAIL);

export const getAllScheduledConfirmed = createAction(ACTION_GET_ALL_SCHEDULED_CONFIRMED);
export const getAllScheduledConfirmedSuccess = createAction<Data[]>(ACTION_GET_ALL_SCHEDULED_CONFIRMED_SUCCESS)
export const getAllScheduledConfirmedFail = createAction<string>(ACTION_GET_ALL_SCHEDULED_CONFIRMED_FAIL);

export const getAllScheduledConfirmedDone = createAction(ACTION_GET_ALL_SCHEDULED_CONFIRMED_DONE);
export const getAllScheduledConfirmedDoneSuccess = createAction<Data[]>(ACTION_GET_ALL_SCHEDULED_CONFIRMED_DONE_SUCCESS)
export const getAllScheduledConfirmedDoneFail = createAction<string>(ACTION_GET_ALL_SCHEDULED_CONFIRMED_DONE_FAIL);

export const updateScheduled = createAction<{ id: string, data: Partial<Data> }>(ACTION_UPDATE_SCHEDULED);
export const updateScheduledSuccess = createAction<Data>(ACTION_UPDATE_SCHEDULED_SUCCESS);
export const updateScheduledFail = createAction<string>(ACTION_UPDATE_SCHEDULED_FAIL);

export const updateScheduledCanceled = createAction<{ id: string, data: Partial<Data> }>(ACTION_UPDATE_SCHEDULED_CANCELED);
export const updateScheduledCanceledSuccess = createAction<Data>(ACTION_UPDATE_SCHEDULED_CANCELED_SUCCESS);
export const updateScheduledCanceledFail = createAction<string>(ACTION_UPDATE_SCHEDULED_CANCELED_FAIL);

export const updateScheduledConfirmed = createAction<{ id: string, data: Partial<Data> }>(ACTION_UPDATE_SCHEDULED_CONFIRMED);
export const updateScheduledConfirmedSuccess = createAction<Data>(ACTION_UPDATE_SCHEDULED_CONFIRMED_SUCCESS);
export const updateScheduledConfirmedFail = createAction<string>(ACTION_UPDATE_SCHEDULED_CONFIRMED_FAIL);


export const updateScheduledConfirmedDone = createAction<{ id: string, data: Partial<Data> }>(ACTION_UPDATE_SCHEDULED_CONFIRMED_DONE);
export const updateScheduledConfirmedDoneSuccess = createAction<Data>(ACTION_UPDATE_SCHEDULED_CONFIRMED_DONE_SUCCESS);
export const updateScheduledConfirmedDoneFail = createAction<string>(ACTION_UPDATE_SCHEDULED_CONFIRMED_DONE_FAIL);

export const stopLoading = createAction(ACTION_STOP_LOADING);
