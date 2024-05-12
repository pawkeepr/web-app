import { Switch } from '@headlessui/react'
import { useState, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { ModeInput } from '~/Components/molecules/field-control/field-control'

const controlSwitch = tv({
    base: `
    relative inline-flex h-6 w-11 shrink-0 
    cursor-pointer rounded-full border-2 border-transparent 
    transition-colors duration-200 ease-in-out focus:outline-none 
    focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
    `,
    variants: {
        color: {
            primary: 'bg-primary-500',
            secondary: 'bg-secondary-500',
            null: 'bg-gray-400',
        },
        checked: {
            true: 'bg-opacity-100',
            false: 'bg-opacity-50',
        },
        mode: {
            [ModeInput.readonly]: 'hidden',
            [ModeInput.editable]: '',
        },
    },
    defaultVariants: {
        color: 'primary',
        mode: ModeInput.editable,
    },
})

const pointerSwitch = tv({
    base: `
        pointer-events-none inline-block size-4
        transform rounded-full 
        bg-white shadow-lg ring-0 transition duration-200 ease-in-out
    `,
    variants: {
        translateClass: {
            true: 'translate-x-9',
            false: 'translate-x-0',
            null: 'translate-x-[50%]',
        },
    },
})

export type SwitchProps = {
    onChange?: (enabled: boolean) => void
} & ComponentProps<'input'> &
    VariantProps<typeof controlSwitch> &
    VariantProps<typeof pointerSwitch>

const ControlSwitch = ({
    className,
    mode = ModeInput.editable,
    color,
    onChange,
}: SwitchProps) => {
    const [enabled, setEnabled] = useState<boolean>(true)

    const handleChange = () => {
        setEnabled((state) => {
            onChange?.(!state)
            return !state
        })
    }

    return (
        <Switch
            disabled={mode === ModeInput.readonly}
            onClick={() => handleChange()}
            checked={enabled}
            className={controlSwitch({
                mode,
                checked: enabled,
                color: color,
                className,
            })}
        >
            <span className="sr-only">Use setting</span>
            {/* Adjusted the translate class to center the circle */}
            <span
                aria-hidden="true"
                className={pointerSwitch({
                    translateClass: enabled,
                })}
            />
            {/* Text inside the switch */}
        </Switch>
    )
}

export default ControlSwitch
