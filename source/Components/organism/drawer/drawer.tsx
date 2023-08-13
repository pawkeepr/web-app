import logoDark from "~/assets/images/logo-dark.png";

import ArrowLeftCircleIcon from "@heroicons/react/20/solid/ArrowLeftCircleIcon";
import Cog8ToothIcon from "@heroicons/react/24/solid/Cog8ToothIcon";
import DashboardIcon from '@heroicons/react/24/solid/HomeIcon';
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { MdPets } from 'react-icons/md';

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

type DrawerProps = {
    closeDrawer: () => void;
    visibleDrawer: boolean;
    drawerWidth?: number;
};

const Drawer = ({ closeDrawer, visibleDrawer }: DrawerProps) => {


    return (
        <div
            className={cn(`
                top-0 bottom-0 left-0 fixed
                transition-all duration-500 ease-out
                z-[20] flex flex-col
                h-full
                px-4 py-8
                w-72
                overflow-y-auto bg-white dark:!bg-dark-500
                border-r rtl:border-r-0 rtl:border-l
            `, {
                '-translate-x-full': !visibleDrawer,
                'translate-x-0': visibleDrawer
            })}
        >
            <div className="flex justify-between">
                <a href="#">
                    {" "}
                    <Image
                        className="w-auto h-8"
                        src={logoDark}
                        alt=""
                    />{" "}
                </a>
                <XMarkIcon
                    onClick={closeDrawer}
                    className="cursor-pointer w-8 h-8"
                />
            </div>

            <div className="flex flex-col items-center mt-6 -mx-2">
                <h4 className="mx-2 mt-4 font-semibold">
                    Olá Veterinária
                </h4>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <Link
                        className="flex items-center px-4 py-2 rounded-lg mt-4"
                        href="/dashboard"
                    >
                        <DashboardIcon className="w-5 h-5" />

                        <span className="mx-4 font-medium">
                            Consultas
                        </span>
                    </Link>

                    <Link
                        className="flex items-center px-4 py-2 rounded-lg mt-4"
                        href="/dashboard/tutors"
                    >
                        <UserIcon className="w-5 h-5" />

                        <span className="mx-4 font-medium">
                            Tutores
                        </span>
                    </Link>

                    <Link
                        className="flex items-center px-4 py-2 mt-4"
                        href="/dashboard/pets"
                    >
                        <MdPets className="w-5 h-5" />

                        <span className="mx-4 font-medium">Pets</span>
                    </Link>

                    {/* <Link
                        className="flex items-center px-4 py-2 mt-4 "
                        href="/about"
                    >
                        <NewspaperIcon className="w-5 h-5" />

                        <span className="mx-4 font-medium">Sobre</span>
                    </Link> */}

                    <a
                        className="flex items-center px-4 py-2 mt-4 "
                        href="#"
                    >
                        <Cog8ToothIcon className="w-5 h-5" />

                        <span className="mx-4 font-medium">
                            Settings
                        </span>
                    </a>
                    <Link
                        className="flex text-gray-700 items-center px-4 py-2 mt-4 absolute bottom-0 w-full mb-4"
                        href="/logout"
                    >
                        <ArrowLeftCircleIcon
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                        />

                        <span className="mx-4 font-medium">
                            Sair
                        </span>
                    </Link>
                </nav>
            </div>

        </div>
    );
};

export default Drawer;
