import { StaticImageData } from 'next/image';
import React, { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';

//import images
import { useAppSelector } from '~/store/hooks';

import MyImage from '../atoms/my-image/my-image';

type CustomToggleProps = {
    onClick: () => void;
    name: string;
    avatar: string | StaticImageData;
}

const CustomToggle = ({ onClick, name, avatar }: CustomToggleProps) => (
    <div className="btn d-flex items-center" onClick={onClick}>

        <MyImage className="rounded-circle header-profile-user" src={avatar} alt="Header Avatar" height={48} width={48} />

        <span className="text-start ms-xl-2">
            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{name}</span>
        </span>
    </div>
)

const ProfileDropdown = () => {

    const profile = useAppSelector(state => state.Profile.user);

    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };

    const DropdownToggleButton = () => (
        <CustomToggle
            onClick={toggleProfileDropdown}
            name={profile?.firstName as any}
            avatar={profile?.avatar as any}
        />
    );

    return (
        <React.Fragment>
            <Dropdown show={isProfileDropdown} onToggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle variant="link" id="dropdown-basic" className="btn" as={DropdownToggleButton} />

                <DropdownMenu className="dropdown-menu-end">

                    <h6 className="dropdown-header">Bem Vindo, {profile?.firstName}!</h6>
                    <DropdownItem href="/profile"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle">Perfil</span>
                    </DropdownItem>
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