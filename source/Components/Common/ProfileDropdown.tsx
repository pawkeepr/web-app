import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';

//import images
import avatar1 from "~/assets/images/users/avatar-1.jpg";
import { useAppSelector } from '~/store/hooks';

const CustomToggle = ({ onClick }) => (
    <span className="btn d-flex align-items-center" onClick={onClick}>
        <Image className="rounded-circle header-profile-user" src={avatar1} alt="Header Avatar" />
        <span className="text-start ms-xl-2">
            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{"Admin"}</span>
        </span>
    </span>
)

const ProfileDropdown = () => {

    const { user } = useAppSelector(state => ({
        user: state.Profile.user,
    }));

    const [userName, setUserName] = useState("Admin");

    useEffect(() => {
        if (sessionStorage.getItem("authUser")) {
            const obj = JSON.parse(sessionStorage.getItem("authUser") || '');
            setUserName(user.first_name || obj.data.first_name || "Admin");
        }
    }, [userName, user]);


    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };

    const DropdownToggleButton = () => <CustomToggle onClick={toggleProfileDropdown} />;

    return (
        <React.Fragment>
            <Dropdown show={isProfileDropdown} onToggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle variant="link" id="dropdown-basic" className="btn" as={DropdownToggleButton} />

                <DropdownMenu className="dropdown-menu-end">

                    <h6 className="dropdown-header">Welcome {userName}!</h6>
                    <DropdownItem href="/profile"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle">Profile</span></DropdownItem>
                    {/* <DropdownItem href="/apps-chat"><i
                        className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Messages</span></DropdownItem>
                    <DropdownItem href="#"><i
                        className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Taskboard</span></DropdownItem>
                    <DropdownItem href="/pages-faqs"><i
                        className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Help</span></DropdownItem>
                    <div className="dropdown-divider"></div>
                    <DropdownItem href="/pages-profile"><i
                        className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Balance : <b>$5971.67</b></span></DropdownItem>
                    <DropdownItem href="/pages-profile-settings"><span
                        className="badge bg-soft-success text-success mt-1 float-end">New</span><i
                            className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle">Settings</span></DropdownItem>
                    <DropdownItem href="/auth-lockscreen-basic"><i
                        className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Lock screen</span></DropdownItem> */}
                    <DropdownItem href="/logout"><i
                        className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle" data-key="t-logout">Logout</span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;