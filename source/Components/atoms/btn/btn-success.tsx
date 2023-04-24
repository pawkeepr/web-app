
import { BtnProps } from './btn-cancel'

const BtnSuccess = ({ onClick, label = 'Cancelar', className, ...rest }: BtnProps) => {
	return (
		<button
			className={`btn btn-success bg-primary-500 w-40 m-1 next ${className}`}
			type="button"
			onClick={onClick}
			{...rest}
		>
			{label}
		</button>
	)
}

export default BtnSuccess