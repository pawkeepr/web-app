import { Switch } from '@headlessui/react'
import { ComponentProps, useState } from 'react'

import { VariantProps, tv } from 'tailwind-variants'

const switchStyled = tv({
    base: `
       relative inline-flex h-5 w-9
       shrink-0 cursor-pointer rounded-full border-2
       border-transparent transition-colors duration-200 ease-in-out
       focus:outline-none focus-visible:ring-2  focus-visible:ring-white
       focus-visible:ring-opacity-75
    `,
    variants: {
        enabled: {
            true: 'bg-primary-600',
            false: 'bg-secondary-600',
        },
    },
})

const circleStyled = tv({
    base: `
        pointer-events-none inline-block
        h-4 w-4 transform rounded-full
        bg-white shadow-lg ring-0 
        transition duration-200 ease-in-out
    `,
    variants: {
        enabled: {
            true: 'translate-x-4',
            false: 'translate-x-0',
        },
    },
})

type SwitchProps = {
    onChange?: (checked: boolean) => void
    label?: string
} & Omit<ComponentProps<'input'>, 'onChange'> &
    VariantProps<typeof switchStyled>

const ControlSwitch = ({ className, children, onChange, ...rest }: SwitchProps) => {
    const [enabled, setEnabled] = useState<boolean>(false)

    const handleChange = () => {
        setEnabled((state) => {
            onChange?.(!state)
            return !state
        })
    }

    return (
        <div className="w-full flex justify-center items-center gap-2">
            <Switch
                checked={enabled}
                onChange={handleChange}
                className={switchStyled({ className, enabled })}
            >
                <span aria-hidden="true" className={circleStyled({ enabled })} />
            </Switch>
            {children}
        </div>
    )
}

export default ControlSwitch
