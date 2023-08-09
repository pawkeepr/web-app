import { FieldHookConfig } from "formik"

export type InputControlProps = FieldHookConfig<string> & {
    [key: string]: any
    name: string
    label?: string
    initialFocus?: boolean
    separator?: string
    required?: boolean
    disabledError?: boolean
    component?: JSX.Element
    startChildren?: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[]
    children?: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[]
    mask?: string
    divClassName?: string
}
