import React from 'react'

type JsxChild =
    | string
    | boolean
    | number
    | null
    | undefined
    | JSX.Element
    | React.ReactNode
type JsxChildren = JsxChild | JsxChild[]

type PropsFor<T> = {
    items: T[]
    children: (item: T, index: number) => JsxChildren
}

export function For<T>({ children, items }: PropsFor<T>) {
    return (
        <React.Fragment>
            {items.map((item, index) => {
                return children(item, index)
            })}
        </React.Fragment>
    )
}

type PropsIf = {
    condition: boolean
    children: JsxChildren
}

export function If({ condition, children }: PropsIf) {
    if (!condition) return null

    return <React.Fragment>{children}</React.Fragment>
}

type PropsChoose = {
    value: any
    children: React.ReactNode
}

export function Choose({ value, children }: PropsChoose) {
    return (
        <React.Fragment>
            {React.Children.map(children, (child: any) => {
                if (child.props.value === value) {
                    return child.props.children
                }
            })}
        </React.Fragment>
    )
}

type PropsWhen = {
    value: any
    children: JsxChildren
}

export function When({ value, children }: PropsWhen) {
    return <React.Fragment>{children}</React.Fragment>
}
