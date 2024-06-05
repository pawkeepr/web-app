import { useCallback, useEffect, useMemo } from 'react'
import type { Props } from 'react-select'
import Label from '~/Components/atoms/label'
import Select from '~/Components/atoms/select'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { useTranslations } from '~/hooks/use-translations'
import type { ObjPaths } from '~/types/helpers'
import type { InputControlProps, OptionSelect } from './types'

export type FieldSelectControl<Ctx> = Omit<
    InputControlProps<Props, Ctx>,
    'value' | 'disabled'
> & {
    ctx?: Ctx extends undefined ? never : Ctx
    name: Ctx extends undefined ? string : ObjPaths<Ctx>
    deps?: unknown[]
    onChangeValue?: (item: unknown) => void
    options?: OptionSelect[]
    value?: OptionSelect | null
    required?: boolean
    label: string
    isDisabled?: boolean
    divClassName?: string
}

const FieldControlSelect = <Ctx,>({
    label,
    required = false,
    name,
    divClassName,
    options = [],
    onChangeValue = () => {},
    ...props
}: FieldSelectControl<Ctx>) => {
    const { values: defaultValues, setFieldValue } = useFormikContextSafe<Ctx>()
    const { t } = useTranslations('common')
    const values = defaultValues as Ctx & { [key: string]: unknown }

    useEffect(() => {
        const item = options.find((option) => option.value === values[name])

        if (!item) return

        setFieldValue(name, item)
    }, [values[name]])

    const onChange = useCallback(
        (option: unknown | OptionSelect) => {
            onChangeValue?.(option)
            setFieldValue(name as ObjPaths<Ctx>, option, true)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setFieldValue],
    )

    const value = useMemo(() => {
        if (props.value)
            return {
                ...props.value,
                label: t(props.value.label),
            }

        if (!values?.[name]) return null

        if (typeof values?.[name] === 'string') {
            return options.find((option) => option.value === values?.[name])
        }

        const item = values?.[name] as unknown

        if (typeof item !== 'object' || !item) return null
        if (!item) return null
        if (!('label' in item)) return null

        const label = item?.label as string

        return {
            ...item,
            label: t(label),
        }
    }, [props.value, values?.[name]])

    return (
        <div className={divClassName}>
            <Label label={label} required={required} id={name} separator={':'} />
            <Select
                {...props}
                id={name}
                required={required}
                className={required ? 'border-secondary-500' : ''}
                options={options.map((option) => ({
                    ...option,
                    label: t(option.label),
                }))}
                name={name}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default FieldControlSelect
