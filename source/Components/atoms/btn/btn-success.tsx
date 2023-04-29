
import { BtnProps } from './types'

const BtnSuccess = ({ onClick, label = 'Cancelar', className, link = false, ...rest }: BtnProps) => {

	const bgColorClass = link ? '' : 'btn-success bg-primary-500 hover:bg-primary-600'
	const textColorClass = link ? 'text-primary-500 hover:text-primary-600 border-0' : 'text-white'

	return (
		<button
			className={`btn ${bgColorClass} ${textColorClass} w-40 m-1 next ${className}`}
			type="button"
			onClick={onClick}
			{...rest}
		>
			{label}
		</button>
	)
}

export default BtnSuccess