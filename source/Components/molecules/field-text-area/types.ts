import { FieldHookConfig } from "formik";

export type FieldTextAreaProps<T> = FieldHookConfig<string> & T & {
    [key: string]: any
    endIcon?: React.ReactNode;
    label?: string;
    name: string;
    input?: Omit<React.ElementType, 'name'> | 'input';
    startIcon?: React.ReactNode;
    required?: boolean;
    pattern?: string;
    mask?: string | Array<string | RegExp>;
    div?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
};