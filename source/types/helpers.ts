
export type StepProps = {
    toggleTab: (tab: any) => void;
    activeTab: number;
    isPending: boolean;
    tutorExist: boolean;
}

export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
}

export type ObjPaths<T, Prefix extends string = ''> = T extends object
    ? {
        [K in keyof T]-?: K extends string
        ? `${Prefix}${K}` | ObjPaths<T[K], `${Prefix}${K}.`>
        : never;
    }[keyof T]
    : '';


