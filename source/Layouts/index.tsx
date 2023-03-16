'use client'

import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';

//import Components
import Footer from './Footer';
import Header from './Header';

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
    changeTopbarTheme
} from "../store/layouts/slice";

//redux
import { layoutModeTypes } from "~/Components/constants/layout";
import { useAppDispatch, useAppSelector } from "~/store/hooks";


type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

    const dispatch = useAppDispatch();
    const {
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftSideBarSizeType,
        leftSidebarViewType,
        leftSidebarImageType
    } = useAppSelector(state => ({
        layoutType: state.Layout.layoutType,
        leftSidebarType: state.Layout.leftSidebarType,
        layoutModeType: state.Layout.layoutModeType,
        layoutWidthType: state.Layout.layoutWidthType,
        layoutPositionType: state.Layout.layoutPositionType,
        topbarThemeType: state.Layout.topbarThemeType,
        leftSideBarSizeType: state.Layout.leftSideBarSizeType,
        leftSidebarViewType: state.Layout.leftSidebarViewType,
        leftSidebarImageType: state.Layout.leftSidebarImageType,
    }));

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
            topbarThemeType ||
            leftSideBarSizeType ||
            leftSidebarViewType ||
            leftSidebarImageType
        ) {
            dispatch(changeSideBarView(leftSidebarViewType));
            dispatch(changeSideBarSizeType(leftSideBarSizeType));
            dispatch(changeSidebarTheme(leftSidebarType));
            dispatch(changeLayoutMode(layoutModeType));
            dispatch(changeLayoutWidth(layoutWidthType));
            dispatch(changeLayoutPosition(layoutPositionType));
            dispatch(changeTopbarTheme(topbarThemeType));
            dispatch(changeLayout(layoutType));
            dispatch(changeSidebarImageType(leftSidebarImageType))
        }
    }, [layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftSideBarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        dispatch]);
    /*
    call dark/light mode
    */
    const onChangeLayoutMode = (value: layoutModeTypes) => {
        if (changeLayoutMode) {
            dispatch(changeLayoutMode(value));
        }
    };

    const [headerClass, setHeaderClass] = useState("");
    // class add remove in header
    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    });
    function scrollNavigation() {
        const scrollUp = document.documentElement.scrollTop;
        if (scrollUp > 50) {
            setHeaderClass("topbar-shadow");
        } else {
            setHeaderClass("");
        }
    }

    return (
        <React.Fragment>
            <div id="layout-wrapper">
                <Header
                    headerClass={headerClass}
                    layoutModeType={layoutModeType}
                    onChangeLayoutMode={onChangeLayoutMode} />
                {/* <Sidebar layoutType={layoutType} /> */}
                <div className="main-content">
                    {children}
                    <Footer />
                </div>
            </div>

        </React.Fragment>

    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default Layout;
