import cn from 'classnames'
import { useField } from 'formik'
import { tv } from 'tailwind-variants'
import Switch from '~/Components/atoms/switch'
import type { ObjPaths } from '~/types/helpers'
import { ModeInput } from '../field-control/field-control'

export type ToggleProps<Ctx = undefined> = {
    className?: string
    ctx?: Ctx extends undefined ? never : Ctx
    name: Ctx extends undefined ? string : ObjPaths<Ctx>
    children?: React.ReactNode
    label: string
    onClick?: () => void
    initialValue?: boolean
    onChange?: (e: boolean) => void
    divClassName?: string
    legend?: boolean
    mode?: ModeInput
}

const divSwitch = tv({
    base: 'mb-2 mobile:my-6',
})

const ControlToggle = <Ctx,>({
    children,
    label,
    name,
    divClassName,
    legend = true,
    mode = ModeInput.editable,
    onChange = () => {},
}: ToggleProps<Ctx>) => {
    const [field, _meta, helpers] = useField(name)

    const handleChange = (e: boolean) => {
        helpers.setValue(e)
        onChange(e)
    }

    const toggleStatus = () => {
        handleChange(!field.value)
    }

    const title = field.value ? 'Sim' : 'Não'
    const hasTitle = mode === ModeInput.readonly
    return (
        <div className={divSwitch({ className: divClassName })}>
            <div className="flex items-center justify-between gap-2">
                <span
                    className={cn('font-semibold ', {
                        'text-gray-600': field.value,
                        'text-gray-400': !field.value,
                    })}
                >
                    {label}
                </span>
                <div className="flex items-center gap-1">
                    <span
                        className={cn('text-gray-400 text-xs', {
                            hidden: !legend,
                        })}
                    >
                        Não
                    </span>
                    <Switch
                        onChange={() => toggleStatus()}
                        checked={field.value}
                        size="md"
                    />
                    <span
                        className={cn('text-gray-400 text-xs', {
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

export default ControlToggle
