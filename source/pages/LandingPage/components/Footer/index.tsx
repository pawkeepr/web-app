// Import Images
import Link from "next/link";

import { FaInstagram } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";
import { RiLinkedinFill } from "react-icons/ri";

const Footer = () => {
    return (
        <footer className="bg-gray-900 py-1">
            <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
                <p className="text-sm text-gray-100 font-light">
                    {new Date().getFullYear()} © PawKeepr Smartcare- Todos os
                    direitos reservados.
                </p>

                <div className="flex -mx-2 items-center">
                    <Link
                        href="#"
                        className="mx-2 text-gray-600 transition-colors duration-300 hover:text-white"
                        aria-label="Instagram"
                    >
                        <FaInstagram size={20} />
                    </Link>

                    <Link
                        href="#"
                        className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-white"
                        aria-label="Facebook"
                    >
                        <GrFacebookOption size={20} />
                    </Link>

                    <Link
                        href="#"
                        className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-white"
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
