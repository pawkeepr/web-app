/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
//import logo
import logoDark from "~/assets/images/logo-dark.png";
import logoLight from "~/assets/images/logo-light.png";
import logoSm from "~/assets/images/logo-sm.png";

//Import Components
import { Container } from "reactstrap";
import { layoutTypes } from "~/Components/constants/layout";
import HorizontalLayout from "./HorizontalLayout";
import TwoColumnLayout from "./TwoColumnLayout";
import VerticalLayout from "./VerticalLayouts/index";

type SidebarProps = {
    layoutType: layoutTypes
}

const Sidebar = ({ layoutType }: SidebarProps) => {

    useEffect(() => {
        var verticalOverlay = document.getElementsByClassName("vertical-overlay");
        if (verticalOverlay) {
            verticalOverlay[0].addEventListener("click", function () {
                document.body.classList.remove("vertical-sidebar-enable");
            });
        }
    });

    const addEventListenerOnSmHoverMenu = () => {
        // add listener Sidebar Hover icon on change layout from setting
        if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover') {
            document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active');
        } else if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover-active') {
            document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
        } else {
            document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
        }
    };

    return (
        <React.Fragment>
            <div className="app-menu navbar-menu">
                <div className="navbar-brand-box">
                    <Link href="/" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src={logoSm} alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src={logoDark} alt="" height="17" />
                        </span>
                    </Link>

                    <Link href="/" className="logo logo-light">
                        <span className="logo-sm">
                            <img src={logoSm} alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src={logoLight} alt="" height="17" />
                        </span>
                    </Link>
                    <button
                        onClick={addEventListenerOnSmHoverMenu}
                        type="button"
                        className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
                        id="vertical-hover"
                    >
                        <i className="ri-record-circle-line"></i>
                    </button>
                </div>

                {layoutType === layoutTypes.HORIZONTAL && (
                    <div id="scrollbar">
                        <Container fluid>
                            <div id="two-column-menu"></div>
                            <ul className="navbar-nav" id="navbar-nav">
                                <HorizontalLayout />
                            </ul>
                        </Container>
                    </div>
                )}

                {layoutType === layoutTypes.TWO_COLUMN && (
                    <React.Fragment>
                        <TwoColumnLayout layoutType={layoutType} />
                        <div className="sidebar-background"></div>
                    </React.Fragment>
                )}

                {
                    layoutType === layoutTypes.VERTICAL && (
                        <React.Fragment>
                            <SimpleBar id="scrollbar" className="h-100">
                                <Container fluid>
                                    <div id="two-column-menu"></div>
                                    <ul className="navbar-nav" id="navbar-nav">
                                        <VerticalLayout layoutType={layoutType} />
                                    </ul>
                                </Container>
                            </SimpleBar>
                            <div className="sidebar-background"></div>
                        </React.Fragment>
                    )}
            </div>
            <div className="vertical-overlay"></div>
        </React.Fragment>
    );
};

export default Sidebar;
