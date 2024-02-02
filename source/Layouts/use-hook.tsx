import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '~/store/hooks'

import cookies from '~/constants/cookies'

//import actions
import {
    changeLayout,
    changeLayoutMode,
    changeLayoutPosition,
    changeLayoutWidth,
    changeSideBarSizeType,
    changeSideBarView,
    changeSidebarImageType,
    changeSidebarTheme,
    changeTopBarTheme,
} from '../store/slices/layouts/slice'

import { getCookie } from '~/utils/cookies-utils'

const useHookLayout = () => {
    const dispatch = useAppDispatch()
    const {
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topBarThemeType,
        leftSideBarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
    } = useAppSelector((state) => state.Layout)

    useEffect(() => {
        const mode = getCookie(cookies.layoutMode.name)
        dispatch(changeLayoutMode(mode))
    }, [])

    /*
    layout settings
    */
    useEffect(() => {
        if (
            layoutType ||
            leftSidebarType ||
            layoutModeType ||
            layoutWidthType ||
            layoutPositionType ||
            topBarThemeType ||
            leftSideBarSizeType ||
            leftSidebarViewType ||
            leftSidebarImageType
        ) {
            dispatch(changeSideBarView(leftSidebarViewType))
            dispatch(changeSideBarSizeType(leftSideBarSizeType))
            dispatch(changeSidebarTheme(leftSidebarType))
            dispatch(changeLayoutMode(layoutModeType))
            dispatch(changeLayoutWidth(layoutWidthType))
            dispatch(changeLayoutPosition(layoutPositionType))
            dispatch(changeTopBarTheme(topBarThemeType))
            dispatch(changeLayout(layoutType))
            dispatch(changeSidebarImageType(leftSidebarImageType))
        }
    }, [
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topBarThemeType,
        leftSideBarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        dispatch,
    ])
}

export default useHookLayout
