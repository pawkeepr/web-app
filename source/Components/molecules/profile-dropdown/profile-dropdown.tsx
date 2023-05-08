import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import MyImage from "~/Components/atoms/my-image/my-image";
import { useAppSelector } from "~/store/hooks";

import cn from 'classnames';
import { StaticImageData } from "next/image";
import useChangeLayoutMode from "~/hooks/use-change-layout-mode";

type CustomToggleProps = {
    onClick: () => void;
    name: string;
    avatar: string | StaticImageData;
    color?: string
}

const CustomToggle = ({ onClick, name, avatar }: CustomToggleProps) => (
    <div className="btn d-flex items-center" onClick={onClick}>

        <MyImage className="rounded-circle header-profile-user" src={avatar} alt="Header Avatar" height={48} width={48} />

        <span className="text-start ms-xl-2">
            <span className={`d-none d-xl-inline-block ms-1 fw-medium text-white dark:!text-gray-200`}>{name}</span>
        </span>
    </div>
)

const options = [
    {
        label: 'Perfil',
        href: '/profile',
        icon: (active: boolean) => <i className={cn(
            "mdi mdi-account-circle text-muted fs-16 align-middle mx-2",
            {
                '!text-white': active,
            }
        )} />,
        dataKey: 'profile'
    },
    {
        href: '/logout',
        icon: (active: boolean) => <i className={
            cn(
                "mdi mdi-logout text-muted fs-16 align-middle mx-2", {
                '!text-white': active,
            }
            )} />,
        label: 'Logout',
        dataKey: 'logout'
    }
]

const ProfileDropdownTailwind = () => {
    const profile = useAppSelector(state => state.Profile.user);
    const { onHandleChangeLayout } = useChangeLayoutMode()

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="
                    inline-flex 
                    w-full 
                    justify-center 
                    rounded-md 
                    bg-opacity-20 
                    px-4 py-2 text-sm 
                    font-medium 
                    text-white 
                    hover:bg-opacity-30 
                    focus:outline-none 
                    focus-visible:ring-2 
                    focus-visible:ring-white 
                    focus-visible:ring-opacity-75
                ">
                    <CustomToggle onClick={() => { }} name={profile?.firstName as any} avatar={profile?.avatar as any} />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="
                    border-[1px] 
                    border-gray-300
                    dark:!border-gray-700
                    absolute 
                    right-0 
                    m-2
                    py-2 
                    w-44
                    origin-top-right 
                    rounded-md 
                    bg-gray-200
                    dark:!bg-dark-500
                    shadow-lg 
                    ring-1 
                    ring-black 
                    ring-opacity-5 
                    focus:outline-none">
                    <div className="flex items-center justify-center">
                        <MyImage className="rounded-circle" src={profile?.avatar as any} alt="Header Avatar" height={62} width={62} />
                    </div>
                    <h6 className="text-xs text-center p-1 m-1">Bem Vindo, {profile?.firstName} aaaa!</h6>

                    <Menu.Item as={Fragment}>
                        {
                            ({ active }) => (

                                <button
                                    onClick={onHandleChangeLayout}
                                    type="button"
                                    className={
                                        cn(
                                            "hidden mobile:flex",
                                            "group w-full items-center justify-center rounded-md px-2 py-2 text-sm gap-2",
                                            {
                                                "bg-primary-500 dark:!bg-primary-600 text-white": active,
                                            },
                                            "light-dark-mode"
                                        )}>

                                    <i className='bx bx-moon fs-16'></i>
                                    <span className="align-middle">Modo</span>

                                </button>
                            )
                        }
                    </Menu.Item>

                    <div className="px-1 py-1 ">
                        {
                            options.map((item, index) => (
                                <Menu.Item key={item.href} as={Fragment}>
                                    {
                                        ({ active }) => (
                                            <Link href={item.href} className={
                                                cn(
                                                    "group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2",
                                                    {
                                                        "bg-primary-500 dark:!bg-primary-600 text-white": active,
                                                    }
                                                )}>
                                                {item.icon(active)}
                                                <span className="align-middle">{item.label}</span>
                                            </Link>
                                        )
                                    }
                                </Menu.Item>
                            ))
                        }
                    </div>

                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default ProfileDropdownTailwind


// Outros Items
{/* 
<DropdownItem href="/apps-chat"><i
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