import Link from 'next/link';


//import images
import logoDark from "~/assets/images/logo-dark.png";
import logoLight from "~/assets/images/logo-light.png";
import logoSm from "~/assets/images/logo-sm.png";

//import Components
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import ProfileDropdownTailwind from '~/Components/molecules/profile-dropdown/profile-dropdown';
import { changeHeaderSize } from '~/store/actions';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import FullScreenDropdown from '../Components/Common/FullScreenDropdown';
import LightDark from '../Components/Common/LightDark';

type HeaderProps = {
    headerClass: string;
}

const Header = ({ headerClass }: HeaderProps) => {

    const divRef = useRef<HTMLDivElement>(null);

    const { headerSize } = useAppSelector(state => state.Layout);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (divRef?.current) {
            dispatch(
                changeHeaderSize({
                    width: divRef.current.offsetWidth,
                    height: divRef.current.offsetHeight
                }));
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

    return (
        <header id="page-topbar" className={`dark:!bg-primary-700 !bg-primary-500 ${headerClass}`} ref={divRef}>
            <div className="layout-width">
                <div className="navbar-header">
                    <div className="d-flex">

                        <div className="navbar-brand-box horizontal-logo flex items-center">
                            <Link href="/" className="logo logo-dark">
                                <span className="logo-sm">
                                    <Image src={logoSm} alt="Logo Pawkeepr Mode Dark" height="44" />
                                </span>
                                <span className="logo-lg">
                                    <Image src={logoDark} alt="Logo Pawkeepr Mode Dark" height="34" />
                                </span>
                            </Link>

                            <Link href="/" className="logo logo-light">
                                <span className="logo-sm">
                                    <Image src={logoSm} alt="Logo Pawkeepr Mode Light" height="44" />
                                </span>
                                <span className="logo-lg">
                                    <Image src={logoLight} alt="Logo Pawkeepr Mode Light" height="34" />
                                </span>
                            </Link>
                        </div>

                        {/* <button
                            onClick={toggleMenuBtn}
                            type="button"
                            className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                            id="topnav-hamburger-icon">
                            <span className="hamburger-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button> */}


                        {/* <SearchOption /> */}
                    </div>

                    <div className="d-flex align-items-center">

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
                        <ProfileDropdownTailwind />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;