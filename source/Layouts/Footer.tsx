// Import Images
import Link from "next/link";

import { FaInstagram } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";
import { RiLinkedinFill } from "react-icons/ri";

const Footer = () => {
    return (
        <footer className="bg-transparent w-full my-2 mobile:hidden">
            <div className="flex items-center justify-between px-6 flex-row mobile:flex-col">
                <p className="text-sm text-gray-600 font-semibold">
                    {new Date().getFullYear()} © PawKeepr SmartCare - Todos os
                    direitos reservados.
                </p>

                <div className="flex items-center">
                    <Link
                        href="#"
                        className="mx-2 text-gray-600 transition-colors duration-300 hover:text-primary-600"
                        aria-label="Instagram"
                    >
                        <FaInstagram size={20} />
                    </Link>

                    <Link
                        href="#"
                        className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-primary-600"
                        aria-label="Facebook"
                    >
                        <GrFacebookOption size={20} />
                    </Link>

                    <Link
                        href="#"
                        className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-primary-600"
                        aria-label="Github"
                    >
                        <RiLinkedinFill size={20} />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
