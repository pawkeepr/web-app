/* eslint-disable react/display-name */
import type { ComponentType } from 'react'

// Estas são as props que o HOC irá adicionar
type ControlProps = {
    condition?: boolean | string | number | null | undefined
}

function withIf<T>(WrappedComponent: ComponentType<T & ControlProps>) {
    return (props: T & ControlProps) => {
        // A propriedade 'condition' agora é verificada dentro do HOC withIf
        const { condition = true, ...restProps } = props
        if (!condition) {
            return <div />
        }

        // Passando todas as props, incluindo 'ctx', para o WrappedComponent
        return <WrappedComponent {...(restProps as T)} condition={condition} />
    }
}

const withControl = <T,>(WrappedComponent: ComponentType<T & ControlProps>) => {
    // E este é o novo componente.
    return (props: T & ControlProps) => {
        // withIf é aplicado aqui
        return withIf(WrappedComponent)(props)
    }
}

export default withControl
