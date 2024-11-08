import { useId } from 'react'
import withControl from '~/Components/helpers/with-control'
import Switch, { type SwitchToggleProps } from '../switch'

const SwitchControl = ({ children, ...props }: SwitchToggleProps) => {
    const createId = useId()
    const id = props?.id || createId
    return (
        <div className="flex items-center justify-center w-full gap-2">
            <Switch {...props} id={id} />
            <label htmlFor={id}>{children}</label>
        </div>
    )
}

export default withControl(SwitchControl)
