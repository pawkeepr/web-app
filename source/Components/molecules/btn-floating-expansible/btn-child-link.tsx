import type { ComponentProps } from 'react'
import type { IconType } from 'react-icons'
import type { VariantProps } from 'tailwind-variants'
import { buttonFloatingExpansible } from './btn-floating-expansible'

export type BtnChildLinkProps = {
	title: string
	icon: IconType
} & VariantProps<typeof buttonFloatingExpansible.button> &
	ComponentProps<'a'>

export const ChildLink = ({
	title,
	href,
	onClick,
	icon: Icon,
	...props
}: BtnChildLinkProps) => {
	return (
		<a
			title={title}
			type="button"
			href={href}
			onClick={onClick}
			className={buttonFloatingExpansible.button({ ...props })}
		>
			<h6 className={buttonFloatingExpansible.title()}>{title}</h6>
			<div className={buttonFloatingExpansible.childrenContainerIcon()}>
				<Icon className={buttonFloatingExpansible.childrenIcon()} />
			</div>
		</a>
	)
}
