import { Switch } from '@headlessui/react'
import cn from 'classnames'
import { useField } from 'formik'
import { useEffect, type MouseEvent } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { pointer } from '~/Components/atoms/switch'
import type { ObjPaths } from '~/types/helpers'
import { ModeInput } from '../field-control/field-control'

type SwitchProps<Ctx = undefined> = {
    className?: string
    ctx?: Ctx extends undefined ? never : Ctx
    name: Ctx extends undefined ? string : ObjPaths<Ctx>
    children?: React.ReactNode
    label: string
    onClick?: () => void
    initialValue?: boolean | null
    onChange?: (e: boolean) => void
    divClassName?: string
    legend?: boolean
    mode?: ModeInput
}

const controlSwitch = tv({
    base: `
        group inline-flex h-6 w-11 
        items-center rounded-full 
        transition 
    `,
    variants: {
        size: {
            sm: 'h-6 w-12',
            md: 'h-8 w-14',
            lg: 'h-10 w-16',
            xl: 'h-12 w-20',
        },
        color: {
            primary: 'bg-primary-500',
            secondary: 'bg-secondary-500',
        },
        checked: {
            true: 'bg-opacity-100',
            false: 'bg-opacity-50',
            null: 'bg-gray-400 bg-opacity-50',
        },
        mode: {
            [ModeInput.readonly]: 'hidden',
            [ModeInput.editable]: '',
        },
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
            checked: 'null',
            color: 'primary',
            className: 'bg-gray-400',
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
        {
            checked: 'null',
            color: 'secondary',
            className: 'bg-gray-400',
        },
    ],
    defaultVariants: {
        color: 'primary',
        checked: false,
        mode: 'editable',
        size: 'md',
    },
})

export type ControlToggle3StatesProps<Ctx> = SwitchProps<Ctx> &
    VariantProps<typeof controlSwitch>

const ControlToggle3States = <Ctx,>({
    className,
    children,
    label,
    name,
    divClassName,
    onClick,
    initialValue = false,
    legend = true,
    size = 'md',
    mode = ModeInput.editable,
    onChange = () => {},
}: ControlToggle3StatesProps<Ctx>) => {
    const [field, _meta, helpers] = useField(name)

    useEffect(() => {
        helpers.setValue(initialValue)
    }, [])

    const handleChange = (e: boolean) => {
        helpers.setValue(e)
        onChange(e)
    }

    const handleClick = (
        event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    ) => {
        if (mode === ModeInput.readonly) return
        if (field.value !== null && field.value !== undefined) {
            handleChange(!field.value)
            return
        }

        const switchRect = event.currentTarget.getBoundingClientRect()
        const clickPosition = event.clientX - switchRect.left
        const newValue = clickPosition > switchRect.width / 2
        handleChange(!!newValue)
        onClick?.()
    }

    const hasInd = field.value === null || field.value === undefined
    const title = hasInd ? 'Ind.' : field.value ? 'Sim' : 'Não'
    const hasTitle = mode === ModeInput.readonly

    return (
        <div className={divClassName}>
            <div className="flex items-center justify-between gap-2 mb-2">
                <span
                    className={cn('font-semibold ', {
                        'text-gray-600': field.value,
                        'text-gray-400': !field.value,
                    })}
                >
                    {label}
                </span>
                <div className="flex items-center gap-2">
                    <span
                        className={cn('text-gray-400', {
                            hidden: !legend,
                        })}
                    >
                        Não
                    </span>
                    <Switch
                        disabled={mode === ModeInput.readonly}
                        onClick={(e) => handleClick(e)}
                        checked={field.value === true}
                        className={controlSwitch({
                            mode,
                            color: 'primary',
                            checked: hasInd ? 'null' : field.value,
                            className,
                            size,
                        })}
                    >
                        <span className="sr-only">Use setting</span>
                        {/* Adjusted the translate class to center the circle */}
                        <span
                            aria-hidden="true"
                            className={pointer({
                                size,
                                translateClass: hasInd ? 'null' : field.value,
                            })}
                        />
                        {/* Text inside the switch */}
                    </Switch>
                    <span
                        className={cn('text-gray-400', {
                            hidden: !legend,
                        })}
                    >
                        Sim
                    </span>
                </div>
                {hasTitle && <span className={cn('text-gray-400')}>{title}</span>}
            </div>
            {field.value && children}
        </div>
    )
}

export default ControlToggle3States
