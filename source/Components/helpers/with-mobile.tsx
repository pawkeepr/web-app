/* eslint-disable react/display-name */
import type { ComponentType } from 'react'
import Env from '~/env'

function withMobile<T>(WebComponent: ComponentType<T>, MobileComponent: ComponentType<T>) {
    return (props: T) => {
        const mobile = Env().get('WEBVIEW')

        if (mobile) {
            return <MobileComponent {...props as any} />
        }

        return <WebComponent {...(props as any)} />
    }
}

export default withMobile