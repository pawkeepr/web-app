// @flow
import { all, call, fork, takeEvery } from "redux-saga/effects";

import {
    changeLayoutMode as actionChangeLayoutMode,
    changeLayoutPosition as actionChangeLayoutPosition,
    changeLayoutWidth as actionChangeLayoutWidth,
    changePreloader as actionChangePreloader,
    changeSidebarImageType as actionChangeSidebarImageType,
    changeTopBarTheme as actionChangeTopBarTheme,
    changeHeaderSize,
    changeLayout,
    changeSidebarSizeType,
    changeSidebarTheme,
    changeSidebarView,
} from './actions';

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
    topBarThemeTypes
} from "../../../Components/constants/layout";
import { DivSize } from "./types";

/**
 * Changes the body attribute
 */
function changeHTMLAttribute(attribute: any, value: any) {
    if (document.documentElement) document.documentElement.setAttribute(attribute, value);
    return true;
}

function changeModeHTMLAttribute(value: any) {
    if (document.documentElement) {
        const root = document.documentElement;
        if (value === layoutModeTypes.DARK_MODE) root.classList.add("dark");
        else root.classList.remove("dark");
    }
    return true;
}

interface GenericPayload<T> {
    payload: T;
}

/**
 * Changes the layout type
 * @param {*} param0
 */
function* changeLayoutTheme({ payload: layout }: GenericPayload<layoutTypes>) {
    try {
        if (layout === "two_column") {
            document.documentElement.removeAttribute("data-layout-width");
        } else if (layout === "horizontal") {
            document.documentElement.removeAttribute("data-sidebar-size");
        }
        yield call(changeHTMLAttribute, "data-layout", layout);
    } catch (error) {
        // console.log(error);
    }
}


/**
 * Changes the layout mode
 * @param {*} param0
 */
function* changeLayoutMode({ payload: mode }: GenericPayload<layoutModeTypes>) {
    try {
        yield call(changeHTMLAttribute, "data-layout-mode", mode);
        yield call(changeModeHTMLAttribute, mode);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
function* changeLeftSidebarTheme({ payload: theme }: GenericPayload<leftSidebarTypes>) {
    try {
        yield call(changeHTMLAttribute, "data-sidebar", theme);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the layout width
 * @param {*} param0
 */
function* changeLayoutWidth({ payload: layoutWidth }: GenericPayload<layoutWidthTypes>) {
    try {
        if (layoutWidth === 'lg') {
            yield call(changeHTMLAttribute, "data-layout-width", "fluid");
        } else {
            yield call(changeHTMLAttribute, "data-layout-width", "boxed");
        }
        // yield call(changeHTMLAttribute, "data-sidebar-size", layoutWidth);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the layout position
 * @param {*} param0
 */
function* changeLayoutPosition({ payload: layoutPosition }: GenericPayload<layoutPositionTypes>) {
    try {
        yield call(changeHTMLAttribute, "data-layout-position", layoutPosition);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the topBar themes
 * @param {*} param0
 */
function* changeTopBarTheme({ payload: topBarTheme }: GenericPayload<topBarThemeTypes>) {
    try {
        yield call(changeHTMLAttribute, "data-top-bar", topBarTheme);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the topBar themes
 * @param {*} param0
 */
function* changeSidebarImageType({ payload: leftSideBarImageType }: GenericPayload<leftSidebarImageTypes>) {
    try {
        yield call(changeHTMLAttribute, "data-sidebar-image", leftSideBarImageType);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the Preloader
 * @param {*} param0
 */
function* changePreloader({ payload: preloaderTypes }: GenericPayload<preloaderTypes>) {
    try {
        yield call(changeHTMLAttribute, "data-preloader", preloaderTypes);
    } catch (error) {
        // console.log(error);
    }
}

function* changeHeaderSizeSaga({ payload: headerSize }: GenericPayload<DivSize>) {
    try {
        yield call(changeHeaderSize, headerSize);
    } catch (error) {
        // console.log(error);
    }
}


/**
 * Changes the topBar themes
 * @param {*} param0
 */
function* changeLeftSideBarSizeType({ payload: leftSideBarSizeType }: GenericPayload<leftSideBarSizeTypes>) {
    try {
        switch (leftSideBarSizeType) {
            case 'lg':
                yield call(changeHTMLAttribute, "data-sidebar-size", "lg");
                break;
            case 'md':
                yield call(changeHTMLAttribute, "data-sidebar-size", "md");
                break;
            case "sm":
                yield call(changeHTMLAttribute, "data-sidebar-size", "sm");
                break;
            case "sm-hover":
                yield call(changeHTMLAttribute, "data-sidebar-size", "sm-hover");
                break;
            default:
                yield call(changeHTMLAttribute, "data-sidebar-size", "lg");
        }
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the topBar themes
 * @param {*} param0
 */
function* changeLeftSidebarViewType({ payload: leftSideBarViewType }: GenericPayload<leftSidebarViewTypes>) {
    try {
        yield call(changeHTMLAttribute, "data-layout-style", leftSideBarViewType);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Watchers
 */
export function* watchChangeLayoutType() {
    yield takeEvery(changeLayout, changeLayoutTheme);
}
export function* watchChangeLayoutMode() {
    yield takeEvery(actionChangeLayoutMode, changeLayoutMode);
}
export function* watchChangeLeftSidebarTheme() {
    yield takeEvery(changeSidebarTheme, changeLeftSidebarTheme);
}
export function* watchChangeLayoutWidth() {
    yield takeEvery(actionChangeLayoutWidth, changeLayoutWidth);
}
export function* watchChangeLayoutPosition() {
    yield takeEvery(actionChangeLayoutPosition, changeLayoutPosition);
}
export function* watchChangeTopBarTheme() {
    yield takeEvery(actionChangeTopBarTheme, changeTopBarTheme);
}
export function* watchChangeLeftSideBarSizeType() {
    yield takeEvery(changeSidebarSizeType, changeLeftSideBarSizeType);
}
export function* watchChangeLeftSidebarViewType() {
    yield takeEvery(changeSidebarView, changeLeftSidebarViewType);
}
export function* watchChangeSidebarImageType() {
    yield takeEvery(actionChangeSidebarImageType, changeSidebarImageType);
}
export function* watchChangePreloader() {
    yield takeEvery(actionChangePreloader, changePreloader);
}

export function* watchChangeHeaderSize() {
    yield takeEvery(changeHeaderSize, changeHeaderSizeSaga);
}


function* LayoutSaga() {
    yield all([
        fork(watchChangeLayoutType),
        fork(watchChangeLeftSidebarTheme),
        fork(watchChangeLayoutMode),
        fork(watchChangeLayoutWidth),
        fork(watchChangeLayoutPosition),
        fork(watchChangeTopBarTheme),
        fork(watchChangeLeftSideBarSizeType),
        fork(watchChangeLeftSidebarViewType),
        fork(watchChangeSidebarImageType),
        fork(watchChangePreloader),
        fork(watchChangeHeaderSize)
    ]);
}

export default LayoutSaga;