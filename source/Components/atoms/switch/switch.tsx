import { Switch } from '@headlessui/react'
import { useState, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { ModeInput } from '~/Components/molecules/field-control/field-control'

const toggle = tv({
    base: `
    group inline-flex h-6 w-11 
    items-center rounded-full 
    bg-gray-200 transition 
    `,
    variants: {
        color: {
            primary: 'bg-primary-500',
            secondary: 'bg-secondary-500',
            null: 'bg-gray-400',
        },
        size: {
            sm: 'h-6 w-12',
            md: 'h-8 w-14',
            lg: 'h-10 w-16',
            xl: 'h-12 w-20',
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
        size: 'md',
    },
})

const pointer = tv({
    base: `
        translate-x-1 rounded-full bg-white transition 
    `,
    variants: {
        size: {
            sm: 'size-4',
            md: 'size-6',
            lg: 'size-8',
            xl: 'size-10',
        },
        translateClass: {
            true: 'translate-x-7',
            false: 'translate-x-1',
        },
    },
    compoundVariants: [
        {
            size: 'sm',
            translateClass: true,
            className: 'translate-x-7',
        },
        {
            size: 'lg',
            translateClass: true,
            className: 'translate-x-7',
        },
        {
            size: 'xl',
            translateClass: true,
            className: 'translate-x-9',
        },
    ],
    defaultVariants: {
        size: 'md',
    },
})

export type SwitchToggleProps = {
    onChange?: (enabled: boolean) => void
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
} & Omit<ComponentProps<'input'>, 'onChange' | 'size'> &
    VariantProps<typeof toggle> &
    VariantProps<typeof pointer>

const SwitchToggle = ({
    className,
    mode = ModeInput.editable,
    size = 'md',
    color,
    onChange,
}: SwitchToggleProps) => {
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
            className={toggle({
                mode,
                checked: enabled,
                color: color,
                className,
                size,
            })}
        >
            <span className="sr-only">Use setting</span>
            {/* Adjusted the translate class to center the circle */}
            <span
                aria-hidden="true"
                className={pointer({
                    translateClass: enabled,
                    size,
                })}
            />
            {/* Text inside the switch */}
        </Switch>
    )
}

export default SwitchToggle
