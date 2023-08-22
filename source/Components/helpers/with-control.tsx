/* eslint-disable react/display-name */
import { ComponentType } from 'react';

// Estas são as props que o HOC irá adicionar
export type ControlProps = {
    condition?: boolean | string | number | null | undefined
}

// Este é o nosso HOC. Ele aceita um componente e retorna um novo componente.
function withIf<T extends {}>(WrappedComponent: ComponentType<T & ControlProps>) {
    // E este é o novo componente.
    return ({ condition = true, ...props }: T & ControlProps) => {
        // Verifica a prop "if".
        if (!condition) {
            // Se a prop "if" é falsa, não renderiza o componente.
            return null;
        }

        // Adiciona uma prop "condition".
        return <WrappedComponent {...(props as T)} condition={condition} />;
    };
}

function withControl<T extends {}>(WrappedComponent: ComponentType<T & ControlProps>) {
    // E este é o novo componente.
    return (props: T & ControlProps) => {
        return withIf(WrappedComponent)(props)
    };
}

export default withControl