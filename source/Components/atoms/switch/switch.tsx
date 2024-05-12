import { Switch } from '@headlessui/react'
import { useState } from 'react'

const ControlSwitch = () => {
    const [enabled, setEnabled] = useState<boolean>(false)

    const handleChange = () => {
        setEnabled((state) => {
            // onChange?.(!state)
            return !state
        })
    }

    return (
        <Switch className="" checked={enabled} onChange={handleChange}>
            <span aria-hidden="true" className="" />
        </Switch>
    )
}

export default ControlSwitch
