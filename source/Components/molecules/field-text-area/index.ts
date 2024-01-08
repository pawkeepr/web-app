import { InputControlProps } from '../field-control';
import FieldTextArea from './field-text-area';

type FieldTextAreaAssign = <T, Ctx>(
    props: InputControlProps<T, Ctx>,
) => JSX.Element;

export default FieldTextArea as FieldTextAreaAssign;
