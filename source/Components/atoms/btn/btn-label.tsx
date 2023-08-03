
import { BtnProps } from './types'


const BtnLabel = ({ onClick, label = 'Sucesso', className, children, disabled, ...rest }: BtnProps) => {

	return (
		<button
			className={`btn-label border-x border-y mobile:p-4 md:p-2 rounded-md pl-2 border-secondary-600 !max-w-fit-content ${className}`}
			type="button"
			onClick={onClick}
			disabled={disabled}
			{...rest}
		>{children || label}
		</button>
	)
}

export default BtnLabel