
import cn from 'classnames'
import { BtnProps } from './types'


const BtnSuccess = ({
	onClick,
	label = 'Sucesso',
	className,
	link = false,
	children,
	type,
	disabled,
	...rest
}: BtnProps) => {

	return (
		<button
			className={cn(
				'next btn',
				{
					'btn-primary': !link,
					'btn-link': link,
				},
				className
			)}
			type={type}
			onClick={onClick}
			disabled={disabled}
			{...rest}
		>
			{children || label}
		</button>
	)
}

export default BtnSuccess