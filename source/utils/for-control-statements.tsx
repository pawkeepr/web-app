/* eslint-disable react/display-name */
import type { ComponentType } from 'react'
import type { ObjPaths } from '~/types/helpers'

// Estas são as props que o HOC irá adicionar
type ControlForProps<T = unknown> = T &
    (
        | {
              repeat: T[]
              name: T extends unknown ? string : ObjPaths<T>
          }
        | {
              repeat?: never
              name?: string | number
              item: T
          }
    )

export function withFor<T>(WrappedComponent: ComponentType<T>) {
    return (props: T & ControlForProps) => {
        const items = props.repeat as T[] | never

        if (!items || !items?.length) return <WrappedComponent {...props} />

        const key = props.name as ObjPaths<T> // Change the type of 'key' to 'keyof T'

        return (
            <>
                {items.map((item: T, index) => {
                    return (
                        <WrappedComponent
                            key={`${props[key]}.${index}`}
                            {...props}
                            item={item}
                        />
                    )
                })}
            </>
        )
    }
}
