import { all, call, delay, fork, put, takeEvery } from "redux-saga/effects";

//Include Both Helper File with needed methods
import type { PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";
// Login Redux States
import {
    addFail,
    addSuccess,
    editProfileError,
    editProfileSuccess,
} from "./actions";
import {
    ACTION_ADD_NEW,
    ACTION_EDIT_PROFILE,
    ACTION_GET_PROFILE_SESSION,
} from "./types";

import cookies from "~/constants/cookies";
import type { AttributesCognito } from "~/helpers/get-server-side-props-pages-veterinary-privates";
import {
    createProfileTutor,
    createProfileVet,
    getTutorProfile,
    getVetProfile,
    updateProfileTutor,
    updateProfileVet,
} from "~/services/helpers";
import { updateHasProfile } from "~/services/helpers/auth";
import type { AttributesProfile } from "~/services/helpers/types";
import { errorToast, successToast } from "~/store/helpers/toast";
import type { IProfile } from "~/types/profile";
import { getCookie, setCookie } from "~/utils/cookies-utils";

function* onGetProfile({
    payload: { has_profile, type_profile },
}: PayloadAction<AttributesProfile>) {
    const link =
        type_profile === "1" ? "/veterinary/activation" : "/tutor/activation";

    try {
        if (has_profile === "no") {
            yield call([Router, Router.push], link);
        } else {
            const getVet =
                type_profile === "1" ? getVetProfile : getTutorProfile;
            const { data } = yield call(getVet);
            yield setCookie(cookies.profile.name, data);
            yield put(editProfileSuccess(data));
        }
    } catch (error) {
        if (!(typeof error === "object") || !error) return;
        if (!("response" in error)) return;
        if (!(typeof error.response === "object") || !error.response) return;
        if (!("status" in error.response) || !error.response.status) return;

        switch (error.response.status) {
        }
    }
}

function* onAddProfile({ payload: profile }: PayloadAction<IProfile>) {
    try {
        yield call(updateHasProfile, "yes");
        const path = window.location.pathname;
        const isVeterinary = /veterinary/.test(path);
        const createProfile = isVeterinary
            ? createProfileVet
            : createProfileTutor;
        const { data } = yield call(createProfile, profile);
        const attr = getCookie(
            cookies.cognito_profile.name
        ) as AttributesCognito;
        setCookie(
            cookies.cognito_profile.name,
            JSON.stringify({
                ...attr,
                "custom:has_profile": "yes",
            })
        );
        yield delay(1000);
        yield put(addSuccess(data));
        successToast("Perfil ativado com sucesso!");
        yield call([Router, Router.push], "/dashboard");
    } catch (error) {
        if (!(typeof error === "object") || !error) return;
        if (!("response" in error)) return;
        if (!(typeof error.response === "object") || !error.response) return;
        if (!("status" in error.response) || !error.response.status) return;

        switch (error.response.status) {
            case 409:
                errorToast(
                    "Já existe um usuário com este cpf/cnpj para este tipo de perfil"
                );
                yield call(updateHasProfile, "yes");
                yield call([Router, Router.push], "/logout");
                break;
            default:
                yield call(updateHasProfile, "no");
                if (!("message" in error) || !error.message) {
                    errorToast("Erro ao ativar perfil!");
                    return;
                }
                if (!(typeof error.message === "string") || !error.message)
                    return;

                errorToast(error.message);

                yield put(addFail());
        }
    }
}

export function* onUpdateProfile({ payload: user }: PayloadAction<IProfile>) {
    try {
        const path = window.location.pathname;
        const isVeterinary = /veterinary/.test(path);
        const updateProfile = isVeterinary
            ? updateProfileVet
            : updateProfileTutor;
        const { data } = yield call(updateProfile, user, user.id as string);

        yield call(updateHasProfile, "yes");
        yield put(editProfileSuccess(data));
        successToast("Perfil atualizado com sucesso!");
    } catch (error) {
        console.log(error);
        errorToast("Erro ao atualizar perfil!");
        yield put(editProfileError((error as any).message));
    }
}

export function* watchUpdateProfile() {
    yield takeEvery(ACTION_EDIT_PROFILE, onUpdateProfile);
}

export function* watchGetProfile() {
    yield takeEvery(ACTION_GET_PROFILE_SESSION, onGetProfile);
}

export function* watchAddProfile() {
    yield takeEvery(ACTION_ADD_NEW, onAddProfile);
}

function* ProfileSaga() {
    yield all([
        fork(watchUpdateProfile),
        fork(watchGetProfile),
        fork(watchAddProfile),
    ]);
}

export default ProfileSaga;
