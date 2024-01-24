import Visibility from '@heroicons/react/24/outline/EyeIcon'
import VisibilityOff from '@heroicons/react/24/outline/EyeSlashIcon'
import { useState } from 'react'

import VpnKey from '@heroicons/react/24/outline/KeyIcon'
import FieldControl, {
    type InputControlProps,
} from '~/Components/molecules/field-control'

const InputPassword = <T,>({
    name = 'password',
    label = 'Senha',
    ...rest
}: InputControlProps<T>) => {
    const [visiblePassword, setVisiblePassword] = useState(false)

    return (
        <FieldControl
            name={name}
            label={label}
            startIcon={<VpnKey className="w-5 h-5 " />}
            type={visiblePassword ? 'text' : 'password'}
            position="right"
            endIcon={
                <button
                    type="button"
                    onClick={() => setVisiblePassword(!visiblePassword)}
                    aria-label="toggle password visibility"
                    className="flex items-center justify-center opacity-50"
                >
                    {visiblePassword ? (
                        <Visibility className="w-5 h-5" />
                    ) : (
                        <VisibilityOff className="w-5 h-5" />
                    )}
                </button>
            }
            {...rest}
        />
    )
}

export default InputPassword
