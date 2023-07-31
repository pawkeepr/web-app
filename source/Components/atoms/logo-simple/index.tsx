import Image from 'next/image';
import Link from 'next/link';
import logo from "~/assets/images/logo-sm.png";

type LogoSimpleProps = {
	size?: number
	href?: string
	mb?: string
} & React.HTMLAttributes<HTMLDivElement>

const LogoSimple = ({ href = '/dashboard', mb = 'mb-4', size = 62, className, ...rest }: LogoSimpleProps) => {

	return (
		<div className={`${mb} ${className}`} {...rest}>
			<Link href={href} className="d-block">
				<Image src={logo} alt="Logo Pawkeepr" height={size} draggable="false" />
			</Link>
		</div>
	)
}

export default LogoSimple