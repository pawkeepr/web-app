
import cn from 'classnames'
import { BtnProps } from './types'


const BtnLabel = ({ onClick, label = 'Sucesso', className, children, disabled, ...rest }: BtnProps) => {

	return (
		<button
			className='btn btn-link'
			type="button"
			onClick={onClick}
			disabled={true}
			{...rest}
		>
			{children || label}
		</button>
	)
}

export default BtnLabel