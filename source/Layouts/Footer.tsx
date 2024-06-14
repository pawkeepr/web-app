// Import Images
import Link from 'next/link'

import { FaInstagram } from 'react-icons/fa'
import { GrFacebookOption } from 'react-icons/gr'
import { RiLinkedinFill } from 'react-icons/ri'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'
import { BtnLink } from '~/Components/atoms/btn'
import withControl from '~/Components/helpers/with-control'
import useModeProfile from '~/hooks/use-mode'
import { ModeProfile } from '~/types/profile'

const footer = tv({
    base: 'w-full py-2 mobile:hidden z-50',
    variants: {
        bg: {
            transparent: 'bg-transparent',
            primary: 'bg-primary-500',
            secondary: 'bg-secondary-500',
        },
    },
    defaultVariants: {
        bg: 'transparent',
    },
})

type FooterProps = VariantProps<typeof footer>

const Footer = ({ bg = 'transparent' }: FooterProps) => {
    const { mode } = useModeProfile()

    const hrefPrivacyPolicy =
        mode === ModeProfile.tutor
            ? '/tutor/privacy-policy'
            : '/veterinary/privacy-policy'
    const hrefServiceTerms =
        mode === ModeProfile.tutor
            ? '/tutor/service-terms'
            : '/veterinary/service-terms'

    return (
        <footer className={footer({ bg })}>
            <div className="flex flex-row items-center justify-between px-6 mobile:flex-col">
                <div>
                    <p className="text-xs font-semibold text-gray-200">
                        {new Date().getFullYear()} © PawKeepr Sistema Inteligente
                        para Pets Inova Simples LTDA. 49.173.821/0001-19
                    </p>
                    <p className="mt-2 text-xs font-semibold text-gray-200">
                        Rua Riachuelo, 1200, São José, 49015-160 Aracaju.
                    </p>
                </div>
                <div className="flex flex-row h-full p-2">
                    <BtnLink
                        href={hrefPrivacyPolicy}
                        className="w-40 text-xs font-semibold text-gray-600 hover:text-secondary-500"
                    >
                        Política de Privacidade
                    </BtnLink>

                    <BtnLink
                        href={hrefServiceTerms}
                        className="w-40 text-xs font-semibold text-gray-600 hover:text-secondary-500"
                    >
                        Termos de Uso
                    </BtnLink>
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

export default withControl(Footer)
