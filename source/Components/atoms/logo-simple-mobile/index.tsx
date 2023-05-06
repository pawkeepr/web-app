import Image from 'next/image';
import Link from 'next/link';
import logoMobile from "~/assets/images/logo-mobile-login.png";

type LogoSimpleMobileProps = {
	size?: number
	href?: string
} & React.HTMLAttributes<HTMLDivElement>

const LogoSimpleMobile = ({ href = '/dashboard', size = 62, className, ...rest }: LogoSimpleMobileProps) => {

	return (
		<div className={`mb-4 ${className}`} {...rest}>
			<Link href={href} className="d-block">
				<Image src={logoMobile} alt="Logo Pawkeepr" height={size} draggable="false"/>
			</Link>
		</div>
	)
}

export default LogoSimpleMobile