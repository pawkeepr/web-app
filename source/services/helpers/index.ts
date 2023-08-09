
import { Profile } from '~/store/auth/profile/types';
import { api } from '../api';

import * as urls from './urls';

export const updateProfile = async (data: Profile) => api.post(urls.UPDATE_PROFILE(), data);

export const getConsults = async () => api.get(urls.GET_ALL_APPOINTMENT_VET());
export const getUserProfile = async (email: String) => api.get(urls.GET_USER_PROFILE(email));
