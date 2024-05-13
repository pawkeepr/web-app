import type { FieldHookConfig } from 'formik'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { ObjPaths } from '~/types/helpers'

export type InputControlProps<T, Ctx = undefined> = FieldHookConfig<string> &
    T & {
        [key: string]: unknown
        endIcon?: React.ReactNode
        label?: string
        ctx?: Ctx extends undefined ? never : Ctx
        name: Ctx extends undefined ? string : ObjPaths<Ctx>
        input?: Omit<React.ElementType, 'name'> | 'input'
        mode?: 'editable' | 'readonly'
        startIcon?: React.ReactNode
        required?: boolean
        isValid?: boolean
        condition?: boolean
        isLoading?: boolean
        validateSync?: (value: unknown) => boolean
        visibleError?: boolean
        pattern?: string
        mask?: string | Array<string | RegExp>
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
        divClassName?: string
        div?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    }

export type OptionSelect = {
    value: string | number
    label: string
    [key: string]: unknown
}
