import Link from "next/link";

//import Components
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { changeHeaderSize } from "~/store/actions";
import { useAppDispatch } from "~/store/hooks";
import FullScreenDropdown from "../Components/Common/full-screen-dropdown";
import LightDark from "../Components/Common/light-dark";

import Bars3CenterLeftIcon from "@heroicons/react/24/solid/Bars3CenterLeftIcon";

import Drawer from "~/Components/organism/drawer";

type HeaderProps = {
    headerClass: string;
};

const Header = ({ headerClass }: HeaderProps) => {
    const [show, setShow] = useState<boolean>(false);

    const divRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (divRef?.current) {
            dispatch(
                changeHeaderSize({
                    width: divRef.current.offsetWidth,
                    height: divRef.current.offsetHeight,
                })
            );
        }
    }, [dispatch]);

    // const toggleMenuBtn = () => {
    //     var windowSize = document.documentElement.clientWidth;

    //     if (windowSize > 767)
    //         document.querySelector(".hamburger-icon").classList.toggle('open');

    //     //For collapse horizontal menu
    //     if (document.documentElement.getAttribute('data-layout') === "horizontal") {
    //         document.body.classList.contains("menu") ? document.body.classList.remove("menu") : document.body.classList.add("menu");
    //     }

    //     //For collapse vertical menu
    //     if (document.documentElement.getAttribute('data-layout') === "vertical") {
    //         if (windowSize < 1025 && windowSize > 767) {
    //             document.body.classList.remove('vertical-sidebar-enable');
    //             (document.documentElement.getAttribute('data-sidebar-size') === 'sm') ? document.documentElement.setAttribute('data-sidebar-size', '') : document.documentElement.setAttribute('data-sidebar-size', 'sm');
    //         } else if (windowSize > 1025) {
    //             document.body.classList.remove('vertical-sidebar-enable');
    //             (document.documentElement.getAttribute('data-sidebar-size') === 'lg') ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'lg');
    //         } else if (windowSize <= 767) {
    //             document.body.classList.add('vertical-sidebar-enable');
    //             document.documentElement.setAttribute('data-sidebar-size', 'lg');
    //         }
    //     }

    //     //Two column menu
    //     if (document.documentElement.getAttribute('data-layout') === "twocolumn") {
    //         document.body.classList.contains('twocolumn-panel') ? document.body.classList.remove('twocolumn-panel') : document.body.classList.add('twocolumn-panel');
    //     }
    // };

    const handleShow = () => setShow(!show);
    const handleClose = () => setShow(false);

    return (
        <header
            className={`dark:!bg-primary-700 mb-2 !bg-primary-500 mobile:fixed mobile:z-50 w-full `}
            ref={divRef}
        >
            <div className="flex w-full justify-between items-center px-4 mobile:px-2">
                <button
                    onClick={handleShow}
                    type="button"
                    className="px-2 header-item topnav-hamburger"
                    id="topnav-hamburger-icon"
                >
                    <Bars3CenterLeftIcon className="h-6 w-6 text-white " />
                </button>

                <Drawer
                    closeDrawer={handleClose}
                    visibleDrawer={show}
                />

                <div className="flex items-center justify-center">
                    <Link
                        href="/"
                        className="logo-light justify-centerblock"
                    >
                        <Image
                            src="/logo-light.png"
                            alt="Logo Pawkeepr Mode Light"
                            height="34"
                        />
                    </Link>
                </div>
                <div className="flex align-center">
                    {/* LanguageDropdown */}
                    {/* <LanguageDropdown /> */}

                    {/* WebAppsDropdown */}
                    {/* <WebAppsDropdown /> */}

                    {/* MyCartDropdwon */}
                    {/* <MyCartDropdown /> */}

                    {/* FullScreenDropdown */}
                    <FullScreenDropdown />

                    {/* Dark/Light Mode set */}
                    <LightDark />

                    {/* NotificationDropdown */}
                    {/* <NotificationDropdown /> */}
                    {/* <ProfileDropdownTailwind /> */}
                </div>

                {/* <SearchOption /> */}
            </div>
        </header>
    );
};

export default Header;
