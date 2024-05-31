import cn from 'classnames'
import { useField } from 'formik'
import { useEffect, useState } from 'react'
import { GrDown } from 'react-icons/gr'
import Switch from '~/Components/atoms/switch'
import type { ObjPaths } from '~/types/helpers'
import { ModeInput } from '../field-control/field-control'

export type ToggleProps<Ctx = undefined> = {
    className?: string
    ctx?: Ctx extends undefined ? never : Ctx
    name: Ctx extends undefined ? string : ObjPaths<Ctx>
    children?: React.ReactNode
    content?: React.ReactNode
    label: string
    onClick?: () => void
    onChange?: (e: boolean) => void
    divClassName?: string
    legend?: boolean
    mode?: ModeInput
}

const ControlToggle = <Ctx,>({
    children,
    label,
    name,
    content,
    mode = ModeInput.editable,
    onChange = () => {},
}: ToggleProps<Ctx>) => {
    const [field, _meta, helpers] = useField(name)
    const [openAccordion, setOpenAccordion] = useState(false)

    useEffect(() => {
        if (field.value) {
            setOpenAccordion(true)
        }

        if (!field.value) {
            setOpenAccordion(false)
        }
    }, [field.value])

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
        <div
            // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
            tabIndex={0}
            className={cn('w-full', {
                collapse: !!content,
                '!no-underline': !content,
                'collapse-open': openAccordion,
                'collapse-close': !openAccordion,
            })}
        >
            <summary
                style={{ listStyle: 'none' }}
                className={cn('w-full !py-0 px-1 mb-0', {
                    'collapse-title': !!content,
                })}
            >
                <div className="flex items-center justify-between gap-2">
                    <h1
                        onKeyDown={() => {}}
                        onClick={() => setOpenAccordion((state) => !state)}
                        className={cn('font-semibold flex flex-row gap-1 w-fit', {
                            'text-gray-600': field.value,
                            'text-gray-400': !field.value,
                        })}
                    >
                        {label}
                        {content && (
                            <GrDown
                                className={cn(
                                    'ml-4 w-4 h-4 transform transition-transform',
                                    {
                                        'rotate-180': openAccordion,
                                        'rotate-0': !openAccordion,
                                    },
                                )}
                            />
                        )}
                    </h1>

                    <Switch
                        onChange={() => toggleStatus()}
                        checked={field.value}
                        size="md"
                    />

                    {hasTitle && (
                        <span className={cn('text-gray-400')}>{title}</span>
                    )}
                </div>
                {field.value && children}
            </summary>
            {content && (
                <div className={cn('px-1 collapse-content py-0 mt-0')}>
                    {content}
                </div>
            )}
        </div>
    )
}

export default ControlToggle
