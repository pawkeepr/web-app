// path/filename: src/hoc/withCompose.tsx

import type { ComponentType } from 'react'
import type { KeysLoading } from '../organism/loader'
import withControl from './with-control'
import withLoading from './with-loading'

// Defining the ControlProps as previously mentioned
export type ControlProps = {
    condition?: boolean | string | number | null | undefined
    isLoading?: boolean
    typeLoading?: KeysLoading
}

/**
 * A more flexible HOC type to accommodate various prop additions.
 */
type HOC = <T extends {}>(
    component: ComponentType<T>,
) => ComponentType<T & ControlProps & { [key: string]: any }>

/**
 * Composes multiple higher-order components (HOCs) into a single HOC.
 * @param hocs - The array of HOCs to compose.
 * @returns A function that takes a component and returns it enhanced by the provided HOCs.
 */
const withCompose =
    (...hocs: HOC[]) =>
    <T extends {}>(
        WrappedComponent: ComponentType<T>,
    ): ComponentType<T & ControlProps & { [key: string]: any }> => {
        return hocs.reduceRight(
            (acc, hoc) => hoc(acc),
            WrappedComponent,
        ) as ComponentType<T & ControlProps & { [key: string]: any }>
    }

export default withCompose(withControl, withLoading)
