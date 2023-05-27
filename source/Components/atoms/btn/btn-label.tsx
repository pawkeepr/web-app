
import { BtnProps } from './types'


const BtnLabel = ({ onClick, label = 'Sucesso', className, children, disabled, ...rest }: BtnProps) => {

	return (
		<button
			className={`btn-label !max-w-fit-content ${className}`}
			type="button"
			onClick={onClick}
			disabled={disabled}
			{...rest}
		>{children || label}
		</button>
	)
}

export default BtnLabel