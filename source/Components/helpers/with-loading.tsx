/* eslint-disable react/display-name */
import type { ComponentType } from 'react'
import Loading, { type KeysLoading } from '~/Components/organism/loader'

// Estas são as props que o HOC irá adicionar
type ControlProps = {
    isLoading?: boolean
    typeLoading?: KeysLoading
}

function withLoading<T extends { [key: string]: any }>(
    WrappedComponent: ComponentType<T & ControlProps>,
) {
    // E este é o novo componente.
    return ({
        isLoading = false,
        typeLoading = 'ThreeDots',
        ...props
    }: T & ControlProps) => {
        // Verifica a prop "if".
        if (isLoading) {
            return <Loading type={typeLoading} />
        }

        // Adiciona uma prop "condition".
        return <WrappedComponent {...(props as T)} isLoading={isLoading} />
    }
}

export default withLoading
