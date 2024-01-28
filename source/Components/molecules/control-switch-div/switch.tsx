import { Switch } from '@headlessui/react'
import { useField } from 'formik'
import { tv, type VariantProps } from 'tailwind-variants'
import type { ObjPaths } from '~/types/helpers'

type SwitchProps<Ctx = undefined> = {
    className?: string
    ctx?: Ctx extends undefined ? never : Ctx
    name: Ctx extends undefined ? string : ObjPaths<Ctx>
    children?: React.ReactNode
    label: string
    onClick?: () => void
    divClassName?: string
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
        },
        secondary: {
            true: 'bg-secondary-500',
            false: 'bg-primary-400',
        },
    },
    defaultVariants: {
        checked: false,
        primary: false,
        secondary: true,
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
}: SwitchProps<Ctx> & ControlSwitchTailwind) => {
    const [field, meta, helpers] = useField(name)

    return (
        <div className={divSwitch({ className: divClassName })}>
            <div className="flex justify-between items-center gap-2 mb-2">
                <span className="font-semibold text-gray-600">{label}</span>
                <div className="w-16 max-h-max">
                    <Switch
                        onClick={onClick}
                        checked={field.value}
                        onChange={(e) => {
                            helpers.setValue(e)
                        }}
                        className={controlSwitch({
                            checked: field.value as boolean,
                            className,
                        })}
                    >
                        <span className="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            className={`${
                                field.value ? 'translate-x-9' : 'translate-x-0'
                            }
              pointer-events-none inline-block lg:h-[24px] lg:w-[24px] h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                    </Switch>
                </div>
            </div>
            {field.value && children}
        </div>
    )
}

export default ControlSwitch
