
import cn from 'classnames'
import { BtnProps } from './types'


const BtnSuccess = ({ onClick, label = 'Sucesso', className, link = false, children, disabled, ...rest }: BtnProps) => {

	return (
		<button
			className={cn(
				'next btn',
				// {
				// 	'bg-primary-600 dark:!text-gray-50 text-gray-200': !link,
				// 	'text-primary-500 btn-link': link,
				// 	'hover:text-primary-600': !link && !disabled,
				// 	'dark:!text-gray-700': disabled,
				// }
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