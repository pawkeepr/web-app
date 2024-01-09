import Image from 'next/image';
import Link from 'next/link';

type LogoSimpleMobileProps = {
    size?: number;
    href?: string;
    mb?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const LogoSimpleMobile = ({
    href = '/dashboard',
    mb = 'mb-4',
    size = 62,
    className,
    ...rest
}: LogoSimpleMobileProps) => {
    return (
        <div className={`${mb} ${className}`} {...rest}>
            <Link href={href} className="block">
                <Image
                    src="/logo-mobile-login.png"
                    alt="Logo Pawkeepr"
                    height={size}
                    width={size}
                    draggable="false"
                />
            </Link>
        </div>
    );
};

export default LogoSimpleMobile;
