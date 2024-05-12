import { Switch } from '@headlessui/react'
import { useState, type ComponentProps } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

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
    onChange: (checked: boolean) => void
    checked: boolean
    label?: string
} & Omit<ComponentProps<'input'>, 'onChange'> &
    VariantProps<typeof switchStyled>

const ControlSwitch = ({
    className,
    checked = false,
    children,
    onChange,
    ...rest
}: SwitchProps) => {
    const [enabled, setEnabled] = useState<boolean>(checked)

    const handleChange = () => {
        setEnabled((state) => {
            onChange?.(!state)
            return !state
        })
    }

    return (
        <div className="w-full flex justify-center items-center gap-2">
            <Switch
                className={switchStyled({ className, enabled })}
                checked={enabled}
                onChange={handleChange}
            >
                <span
                    aria-hidden="true"
                    className={circleStyled({ enabled, className })}
                />
            </Switch>
            {children}
        </div>
    )
}

export default ControlSwitch
