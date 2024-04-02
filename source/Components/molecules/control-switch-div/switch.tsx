import { Switch } from '@headlessui/react'
import cn from 'classnames'
import { useField } from 'formik'
import { type MouseEvent, useEffect } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'
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
    relative inline-flex h-full w-full shrink-0 
    cursor-pointer rounded-full border-2 border-transparent 
    transition-colors duration-200 ease-in-out focus:outline-none 
    focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75
    `,
    variants: {
        checked: {
            true: 'bg-opacity-100',
            false: 'bg-opacity-50',
        },
        primary: {
            true: 'bg-primary-500',
            false: 'bg-secondary-400',
            null: 'bg-gray-400',
        },
        secondary: {
            true: 'bg-secondary-500',
            false: 'bg-primary-400',
            null: 'bg-gray-400',
        },
        mode: {
            [ModeInput.readonly]: 'hidden',
            [ModeInput.editable]: '',
        },
    },
    defaultVariants: {
        checked: false,
        primary: false,
        secondary: true,
    },
})

const pointerSwitch = tv({
    base: `
        pointer-events-none inline-block lg:h-[24px] 
        lg:w-[24px] h-[20px] w-[20px] transform rounded-full 
        bg-white shadow-lg ring-0 transition duration-200 ease-in-out
    `,
    variants: {
        translateClass: {
            true: 'translate-x-9',
            false: 'translate-x-0',
            null: 'translate-x-[1.2rem]',
        },
    },
})

const divSwitch = tv({
    base: 'mb-2',
})

type ControlSwitchTailwind = VariantProps<typeof controlSwitch>

const ControlSwitch = <Ctx,>({
    className,
    children,
    label,
    name,
    divClassName,
    onClick,
    initialValue = false,
    legend = true,
    mode = ModeInput.editable,
    onChange = () => {},
}: SwitchProps<Ctx> & ControlSwitchTailwind) => {
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
        const switchRect = event.currentTarget.getBoundingClientRect()
        const clickPosition = event.clientX - switchRect.left
        const newValue = clickPosition > switchRect.width / 2
        handleChange(newValue)
        onClick?.()
    }

    const title = field.value === null ? 'Ind.' : field.value ? 'Sim' : 'Não'

    return (
        <div className={divSwitch({ className: divClassName })}>
            <div className="flex justify-between items-center gap-2 mb-2">
                <span className="font-semibold text-gray-600">{label}</span>
                <div className="flex items-center gap-2">
                    <div className="w-16 max-h-max relative">
                        <Switch
                            disabled={mode === ModeInput.readonly}
                            onClick={(e) => handleClick(e)}
                            checked={field.value === true}
                            className={controlSwitch({
                                mode,
                                checked: field.value as boolean,
                                primary:
                                    field.value === null ? 'null' : field.value,
                                secondary:
                                    field.value === null ? 'null' : !field.value,
                                className,
                            })}
                        >
                            <span className="sr-only">Use setting</span>
                            {/* Adjusted the translate class to center the circle */}
                            <span
                                aria-hidden="true"
                                className={pointerSwitch({
                                    translateClass:
                                        field.value === null ? 'null' : field.value,
                                })}
                            />
                            {/* Text inside the switch */}
                        </Switch>
                    </div>
                    {legend && <span className={cn('text-gray-400')}>{title}</span>}
                </div>
            </div>
            {field.value && children}
        </div>
    )
}

export default ControlSwitch
