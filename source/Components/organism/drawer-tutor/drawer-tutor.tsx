import ArrowLeftCircleIcon from "@heroicons/react/20/solid/ArrowLeftCircleIcon";
import HistoricIcon from "@heroicons/react/24/solid/ArchiveBoxXMarkIcon";
import DashboardIcon from "@heroicons/react/24/solid/HomeIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import Image from "next/image";
import { layoutModeTypes } from "~/constants/layout";
import useChangeLayoutMode from "~/hooks/use-change-layout-mode";

import darkLogo from "../../../../public/logo-dark.png";
import lightLogo from "../../../../public/logo-light.png";

import { button } from "~/Components/atoms/btn";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import MyImage from "~/Components/atoms/my-image";
import useResizeMobile from "~/hooks/use-resize-mobile";
import useProfile from "~/store/hooks/profile/use-profile";

type DrawerProps = {
    closeDrawer: () => void;
    visibleDrawer: boolean;
    drawerWidth?: number;
};

type Item = {
    name: string;
    visible: boolean;
    icon: React.ReactNode;
    href: string;
    disabled?: boolean;
};

const items: Item[] = [
    {
        name: "Perfil",
        visible: false,
        disabled: true,
        icon: <UserCircleIcon className="w-5 h-5" />,
        href: "/tutor/profile",
    },
    {
        name: "Início",
        visible: true,
        icon: <DashboardIcon className="w-5 h-5" />,
        href: "/tutor/dashboard",
    },
    {
        name: "Histórico",
        visible: true,
        icon: <HistoricIcon className="w-5 h-5" />,
        href: "/tutor/dashboard/historic",
    },
    {
        href: "/logout",
        icon: (
            <ArrowLeftCircleIcon className="w-5 h-5 mt-1" viewBox="0 0 24 24" />
        ),
        name: "Sair",
        visible: true,
    },
];

const Drawer = ({ closeDrawer, visibleDrawer }: DrawerProps) => {
    const pathname = usePathname();
    const { mode } = useChangeLayoutMode();
    const isLightMode = mode === layoutModeTypes.LIGHT_MODE;
    const { isMobile } = useResizeMobile();
    const { data: profile } = useProfile();
    const buttonStyled = twMerge(
        button({ link: true }),
        "flex justify-start items-center",
        "px-4 py-2 w-full mt-4",
        "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-600",
        "hover:bg-gray-200 dark:hover:bg-dark-600 rounded-none"
    );

    const options = useMemo(
        () =>
            items.filter((item) => {
                return isMobile || item.visible;
            }),
        [isMobile]
    );

    return (
        <div
            className={cn(
                `
                top-0 bottom-0 left-0 fixed
                transition-all duration-500 ease-out
                z-[20] flex flex-col
                mobile:!z-50
                h-full  
                py-8 border-r-2 border-gray-200 dark:border-dark-600
                w-72
                overflow-y-auto bg-white dark:!bg-dark-500
                overflow-x-hidden
            `,
                {
                    "-translate-x-full": !visibleDrawer,
                    "translate-x-0": visibleDrawer,
                }
            )}
        >
            <div className="flex justify-between px-4">
                <Link href="/">
                    <Image
                        src={isLightMode ? lightLogo : darkLogo}
                        alt="Logo Pawkeepr Mode Light"
                        className="w-auto h-8"
                        height={120}
                        width={120}
                    />
                </Link>
                <XMarkIcon
                    onClick={closeDrawer}
                    className="cursor-pointer w-8 h-8 hover:text-gray-500 dark:hover:text-gray-400"
                />
            </div>

            <div className="flex flex-col items-center mt-6 -mx-2">
                {
                    <div className="flex flex-1 self-center items-center justify-center">
                        <MyImage
                            className="rounded-full self-center"
                            src={profile?.user_information?.url_img || ""}
                            alt="Header Avatar"
                            height={120}
                            width={120}
                        />
                    </div>
                }
                <h6 className="text-md text-center p-1 m-1 font-semibold font-sans">
                    Bem Vindo, {profile?.user_information?.first_name}!
                </h6>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="gap-1">
                    {options.map((item, index) => (
                        <Link
                            key={index.toString()}
                            className={cn(buttonStyled, {
                                "bg-gray-200 dark:bg-dark-600":
                                    pathname === item.href,
                                "!text-gray-400 hover:text-gray-400":
                                    item.disabled,
                                "hover:bg-transparent hover:cursor-default":
                                    item.disabled,
                            })}
                            href={item.disabled ? "#" : item.href}
                        >
                            {item.icon}

                            <span className="mx-4 font-medium">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                    {isMobile && (
                        <div className="absolute w-full bottom-0">
                            <Link className={buttonStyled} href="/logout">
                                <ArrowLeftCircleIcon
                                    className="w-5 h-5 mt-1"
                                    viewBox="0 0 24 24"
                                />
                                <span className="mx-4 font-medium">Sair</span>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default memo(Drawer);
