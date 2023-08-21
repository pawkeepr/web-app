import { createAction } from '@reduxjs/toolkit';

import { DivSize, name } from './types';

import {
    layoutModeTypes,
    layoutPositionTypes,
    layoutTypes,
    layoutWidthTypes,
    leftSideBarSizeTypes,
    leftSidebarImageTypes,
    leftSidebarTypes,
    leftSidebarViewTypes,
    preloaderTypes,
    topBarThemeTypes,
} from "../../Components/constants/layout";

export const changeLayout = createAction<layoutTypes>(`${name}/changeLayout`);
export const changeLayoutMode = createAction<layoutModeTypes>(`${name}/changeLayoutMode`);
export const changeSidebarTheme = createAction<leftSidebarTypes>(`${name}/changeSidebarTheme`);
export const changeLayoutWidth = createAction<layoutWidthTypes>(`${name}/changeLayoutWidth`);
export const changeLayoutPosition = createAction<layoutPositionTypes>(`${name}/changeLayoutPosition`);
export const changeTopBarTheme = createAction<topBarThemeTypes>(`${name}/changeTopBarTheme`);
export const changeSidebarSizeType = createAction<leftSideBarSizeTypes>(`${name}/changeSidebarSizeType`);
export const changeSidebarView = createAction<leftSidebarViewTypes>(`${name}/changeSidebarView`);
export const changeSidebarImageType = createAction<leftSidebarImageTypes>(`${name}/changeSidebarImageType`);
export const changePreloader = createAction<preloaderTypes>(`${name}/changePreloader`);
export const changeHeaderSize = createAction<DivSize>(`${name}/changeHeaderSize`);