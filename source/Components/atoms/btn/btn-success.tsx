
import cn from 'classnames'
import { BtnProps } from './types'


const BtnSuccess = ({ onClick, label = 'Sucesso', className, link = false, children, disabled, ...rest }: BtnProps) => {

	return (
		<button
			className={cn(
				'next btn', 
				{
					'btn-primary': !link,
					'btn-link': link,
				}
			)}
			type="button"
			onClick={onClick}
			disabled={disabled}
			{...rest}
		>
			{children || label}
		</button>
	)
}

export default BtnSuccess