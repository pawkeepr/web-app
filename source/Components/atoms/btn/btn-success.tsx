
import cn from 'classnames'
import { BtnProps } from './types'


const BtnSuccess = ({ onClick, label = 'Sucesso', className, link = false, children, disabled, ...rest }: BtnProps) => {

	return (
		<button
			className={cn(
				'py-2 rounded-lg w-40 m-1 next',
				{
					'bg-primary-500 hover:bg-primary-600 dark:!text-gray-50 dark:!bg-secondary-600 dark:hover:!bg-secondary-700': !link,
					'text-primary-500 border-0 bg-transparent': link,
					'text-gray-200': !link,
					'hover:text-primary-600': !link && !disabled,
					'dark:!text-gray-700': disabled,
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