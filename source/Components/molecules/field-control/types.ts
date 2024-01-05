import { FieldHookConfig } from "formik";
import { ObjPaths } from "~/types/helpers";

export type InputControlProps<T, Ctx = any> = FieldHookConfig<string> & T & {
    [key: string]: any
    endIcon?: React.ReactNode;
    label?: string;
    ctx?: Ctx;
    name: ObjPaths<Ctx>;
    input?: Omit<React.ElementType, 'name'> | 'input';
    startIcon?: React.ReactNode;
    required?: boolean;
    pattern?: string;
    mask?: string | Array<string | RegExp>;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    divClassName?: string;
};
