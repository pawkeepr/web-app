
import { BtnProps } from './btn-cancel'

const BtnSuccess = ({ onCLick, label = 'Cancelar', className, ...rest }: BtnProps) => {
	return (
		<button
			className={`btn btn-success bg-green-600 w-40 m-1 next ${className}`}
			type="button"
			onClick={onCLick}
			{...rest}
		>
			{label}
		</button>
	)
}

export default BtnSuccess