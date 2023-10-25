'use client'

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import image from "../../styles/assets/images/landing/bg-pattern.png";

import cookies from '~/constants/cookies';

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
    changeTopBarTheme,
} from "../store/slices/layouts/slice";

//redux
import cn from 'classnames';
import FieldDocumentAppointment from "~/Components/molecules/field-document-appointment";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { getCookie } from '~/utils/cookies-utils';

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
        topBarThemeType,
        leftSideBarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        headerSize,
    } = useAppSelector(state => state.Layout);

    useEffect(() => {
        const mode = getCookie(cookies.layoutMode.name)
        dispatch(changeLayoutMode(mode))
    }, []);

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
            dispatch(changeSideBarView(leftSidebarViewType));
            dispatch(changeSideBarSizeType(leftSideBarSizeType));
            dispatch(changeSidebarTheme(leftSidebarType));
            dispatch(changeLayoutMode(layoutModeType));
            dispatch(changeLayoutWidth(layoutWidthType));
            dispatch(changeLayoutPosition(layoutPositionType));
            dispatch(changeTopBarTheme(topBarThemeType));
            dispatch(changeLayout(layoutType));
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
            setHeaderClass("topBar-shadow");
        } else {
            setHeaderClass("");
        }
    }


    return (
        <div id="relative">
            <Header headerClass={headerClass} />
            {/* <Sidebar layoutType={layoutType} /> */}

            <div
                className={cn(
                    "px-24 mobile:px-4 relative",
                    "mobile:pt-20",
                    // 'bg-cover bg-no-repeat bg-fixed',
                )}
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                {children}
                <FieldDocumentAppointment selectedTabInitial={0}>
                    {
                        ({ onChangeOpen }) => (
                            <button
                                onClick={() => onChangeOpen(true)}
                                className="
                                bg-primary-600 p-3 rounded-full 
                                shadow-2xl z-50 fixed bottom-4 right-4
                                transition duration-500 ease-in-out
                                opacity-40 hover:opacity-100 
                                mobile:opacity-100 mobile:bottom-4 mobile:right-4
                                md:block  xl:hidden lg:hidden
                            "
                            >
                                <PlusIcon className="w-8 h-8 text-gray-50" />
                            </button>
                        )
                    }
                </FieldDocumentAppointment>

                <Footer />
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default Layout;
