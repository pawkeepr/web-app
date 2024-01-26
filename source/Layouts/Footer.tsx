// Import Images
import Link from 'next/link'

import { FaInstagram } from 'react-icons/fa'
import { GrFacebookOption } from 'react-icons/gr'
import { RiLinkedinFill } from 'react-icons/ri'

const Footer = () => {
    return (
        <footer className="bg-transparent w-full my-2 mobile:hidden">
            <div className="flex items-center justify-between px-6 flex-row mobile:flex-col">
                <div>
                    <p className="text-xs text-gray-600 font-semibold">
                        {new Date().getFullYear()} © PawKeepr Sistema Inteligente
                        para Pets Inova Simples LTDA. 49.173.821/0001-19
                    </p>
                    <p className="text-xs mt-2 text-gray-600 font-semibold">
                        Rua Riachuelo, 1200, São José, 49015-160 Aracaju.
                    </p>
                </div>
                <div className="gap-2 p-2 h-full">
                    <Link
                        href="/privacy-policy"
                        className="text-xs text-gray-600 font-semibold mx-1"
                    >
                        Política de Privacidade
                    </Link>
                    {' - '}
                    <Link
                        href="/service-terms"
                        className="text-xs text-gray-600 font-semibold mx-1"
                    >
                        Termos de Uso
                    </Link>
                </div>
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
    )
}

export default Footer
