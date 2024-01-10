import Image from 'next/image'
import Link from 'next/link'

type LogoSimpleProps = {
    size?: number
    href?: string
    mb?: string
} & React.HTMLAttributes<HTMLDivElement>

const LogoSimple = ({
    href = '/dashboard',
    mb = 'mb-4',
    size = 62,
    className,
    ...rest
}: LogoSimpleProps) => {
    return (
        <div className={`${mb} ${className}`} {...rest}>
            <Link href={href} className="block">
                <Image
                    src="/logo-sm.png"
                    alt="Logo Pawkeepr"
                    height={size}
                    width={size}
                    draggable="false"
                />
            </Link>
        </div>
    )
}

export default LogoSimple
