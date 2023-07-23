'use client'

import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

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
        leftSidebarImageType,
        headerSize,
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
        headerSize: state.Layout.headerSize,
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
    }, [
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftSideBarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        dispatch
    ]);

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
        <div id="mobile:gap-2 relative">
            <Header headerClass={headerClass} />
            {/* <Sidebar layoutType={layoutType} /> */}
            <div
                style={{
                    paddingTop: `${headerSize.height}px`
                }}
                className="mobile:mt-2 px-24 mobile:px-4 relative"
            >
                <button
                    onClick={() => console.log('clicou')}
                    className="
                        bg-primary-600 p-3 rounded-full 
                        shadow-2xl z-50 fixed bottom-4 right-4
                        transition duration-500 ease-in-out
                        opacity-40 hover:opacity-100
                        mobile:opacity-100 mobile:bottom-4 mobile:right-4
                    "
                >
                    <PlusIcon className="w-8 h-8 text-gray-50" />
                </button>
                {children}
                <Footer />
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default Layout;
