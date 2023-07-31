import { LOADING } from "~/types/constants";
import {
  ADD_FAIL, ADD_NEW, ADD_SUCCESS,
  DELETE, DELETE_FAIL, DELETE_SUCCESS,
  GET_ALL, GET_ALL_FAIL,
  GET_ALL_INACTIVES, GET_ALL_INACTIVES_FAIL, GET_ALL_INACTIVES_SUCCESS,
  GET_ALL_SUCCESS,
  STOP_LOADING,
  TOGGLE_STATUS, TOGGLE_STATUS_FAIL, TOGGLE_STATUS_SUCCESS,
  UPDATE, UPDATE_FAIL, UPDATE_SUCCESS
} from "../helpers/constants";


export interface ISecs {
  _id: string
  name: string
  email: string
  password: string
  celphone: string
  document: string
  specialty: string
  board: string
  record: string
  profession: string
  occupation_code: string
  type: 'sec'
  avatar: string
  due_date: string
  schedule_obs: string
  show_lack: boolean
  genrer: 'M' | 'F' | 'O' | 'NB'
  active: boolean
  unity_id: string
  permissions?: string[]
  screens?: string[]
  reports?: string[]
  blackListPermissions?: string[]
  blackListScreens?: string[]
  blackListReports?: string[]
  created_at?: Date
  updated_at?: Date
}

export interface Data extends ISecs { }

export type InitialState = {
  data: Data[];
  isLoading: LOADING;
  isLoadingOnlyOne: LOADING;
  error: string | null;
  inactives: Data[];
};

export const name = 'secs';

export const ACTION_GET_ALL = `${name}/${GET_ALL}`;
export const ACTION_GET_ALL_SUCCESS = `${name}/${GET_ALL_SUCCESS}`;
export const ACTION_GET_ALL_FAIL = `${name}/${GET_ALL_FAIL}`;
export const ACTION_GET_ALL_INACTIVES = `${name}/${GET_ALL_INACTIVES}`;
export const ACTION_GET_ALL_INACTIVES_SUCCESS = `${name}/${GET_ALL_INACTIVES_SUCCESS}`;
export const ACTION_GET_ALL_INACTIVES_FAIL = `${name}/${GET_ALL_INACTIVES_FAIL}`;
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
