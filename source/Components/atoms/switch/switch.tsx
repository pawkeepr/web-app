import { Switch } from '@headlessui/react'
import { useState } from 'react'
import { VariantProps, tv } from 'tailwind-variants'
import { ModeInput } from '~/Components/molecules/field-control/field-control'

const toggle = tv({
    base: `
    group inline-flex relative
    items-center rounded-full 
    disabled:cursor-not-allowed disabled:opacity-50
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
    compoundVariants: [
        {
            checked: true,
            color: 'primary',
            className: 'bg-primary-500',
        },
        {
            checked: false,
            color: 'primary',
            className: 'bg-secondary-500',
        },
        {
            checked: true,
            color: 'secondary',
            className: 'bg-secondary-500',
        },
        {
            checked: false,
            color: 'secondary',
            className: 'bg-primary-500',
        },
    ],
})

export const pointer = tv({
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
            null: 'translate-x-4',
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
    checked?: boolean
} & Omit<ComponentProps<'input'>, 'onChange' | 'size'> &
    VariantProps<typeof toggle> &
    VariantProps<typeof pointer>

const SwitchToggle = ({
    className,
    mode = ModeInput.editable,
    size = 'md',
    color = 'primary',
    checked = false,
    onChange,
    ...props
}: SwitchToggleProps) => {
    const [enabled, setEnabled] = useState<boolean>(checked)

    const handleChange = () => {
        setEnabled((state) => {
            onChange?.(!state)
            return !state
        })
    }

    return (
        <Switch
            {...(props as any)}
            disabled={mode === ModeInput.readonly || props.disabled}
            onClick={() => handleChange()}
            checked={enabled}
            role="switch"
            className={toggle({
                mode,
                checked: enabled,
                color: color,
                className,
                size,
            })}
        >
            {!enabled && (
                <span className="absolute font-sans text-[10px] text-gray-500 capitalize right-2">
                    Não
                </span>
            )}
            {enabled && (
                <span className="absolute font-sans text-[10px] text-gray-100 capitalize left-2">
                    Sim
                </span>
            )}

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
