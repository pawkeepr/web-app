
import { BtnProps } from './types'

const BtnSuccess = ({ onClick, label = 'Sucesso', className, link = false, children, ...rest }: BtnProps) => {

	const bgColorClass = link ? '' : 'btn-success bg-primary-500 hover:bg-primary-600'
	const textColorClass = link ? 'text-primary-500 hover:text-primary-600 border-0' : 'text-white'

	return (
		<button
			className={`btn ${bgColorClass} ${textColorClass} w-40 m-1 next dark:text-emerald-500 ${className}`}
			type="button"
			onClick={onClick}
			{...rest}
		>
			{children || label}
		</button>
	)
}

export default BtnSuccess