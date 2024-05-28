/* eslint-disable react/display-name */
import type { ComponentType } from 'react'
import Loading, { type KeysLoading } from '~/Components/organism/loader'

// Estas são as props que o HOC irá adicionar
export type LoadingControlProps = {
    isLoading?: boolean
    typeLoading?: KeysLoading
    sizeLoading?: number
    messageLoading?: string
}

function withLoading<T extends { [key: string]: any }>(
    WrappedComponent: ComponentType<T & LoadingControlProps>,
) {
    // E este é o novo componente.
    return ({
        isLoading = false,
        typeLoading = 'ThreeDots',
        messageLoading,
        sizeLoading,
        ...props
    }: T & LoadingControlProps) => {
        // Verifica a prop "if".
        if (isLoading) {
            return (
                <Loading
                    type={typeLoading}
                    size={sizeLoading}
                    message={messageLoading}
                />
            )
        }

        // Adiciona uma prop "condition".
        return <WrappedComponent {...(props as T)} isLoading={isLoading} />
    }
}

export default withLoading
