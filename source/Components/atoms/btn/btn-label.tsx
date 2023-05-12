
import cn from 'classnames'
import { BtnProps } from './types'


const BtnLabel = ({ onClick, label = 'Sucesso', className, children, disabled, ...rest }: BtnProps) => {

	return (
		<button
			className={cn(
				`
				btn 
				text-gray-700 
				dark:!text-gray-200 
				hover:!bg-gray-100
				bg-transparent
				`,
				{
					'hover:text-gray-300': !disabled,
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

export default BtnLabel