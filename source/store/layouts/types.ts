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
    topbarThemeTypes
} from "../../Components/constants/layout";

export type LayoutState = {
    layoutType: layoutTypes;
    leftSidebarType: leftSidebarTypes;
    layoutModeType: layoutModeTypes;
    layoutWidthType: layoutWidthTypes;
    layoutPositionType: layoutPositionTypes;
    topbarThemeType: topbarThemeTypes;
    leftSideBarSizeType: leftSideBarSizeTypes;
    leftSidebarViewType: leftSidebarViewTypes;
    leftSidebarImageType: leftSidebarImageTypes;
    preloader: preloaderTypes;
};

export const name = 'layout';
