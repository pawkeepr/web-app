import { InputControlProps } from '../field-control';

/**
 * Field Text Area
 * Este componente é usado para criar uma área de texto com controles de entrada personalizados.
 * Ele é genérico e pode ser utilizado em diferentes contextos, aceitando parâmetros genéricos T e Ctx.
 *
 * @param {InputControlProps<T, Ctx>} params - Os parâmetros passados para o componente FieldTextArea.
 * Este parâmetro deve seguir a interface InputControlProps que inclui todas as propriedades necessárias
 * para o funcionamento do campo de texto.
 *
 * @returns {JSX.Element} - Retorna um elemento JSX que representa a área de texto com os devidos controles.
 *
 * Exemplo de uso:
 *
 * ```jsx
 * <FieldTextArea<string, any>
 *    value="Texto inicial"
 *    onChange={handleChange}
 *    {...otherProps}
 * />
 * ```
 *
 * Certifique-se de substituir `string` e `any` pelos tipos adequados necessários para o seu caso de uso específico.
 *
 **/

export { default } from './field-text-area';
