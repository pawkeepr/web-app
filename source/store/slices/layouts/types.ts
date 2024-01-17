import type {
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
} from '~/constants/layout'

export type DivSize = {
    height: number
    width: number
}

export type LayoutState = {
    layoutType: layoutTypes
    leftSidebarType: leftSidebarTypes
    layoutModeType: layoutModeTypes
    layoutWidthType: layoutWidthTypes
    layoutPositionType: layoutPositionTypes
    topBarThemeType: topBarThemeTypes
    leftSideBarSizeType: leftSideBarSizeTypes
    leftSidebarViewType: leftSidebarViewTypes
    leftSidebarImageType: leftSidebarImageTypes
    preloader: preloaderTypes
    headerSize: DivSize
}

export const name = 'layout'
