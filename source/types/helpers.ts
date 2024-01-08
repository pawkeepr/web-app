import * as Yup from 'yup';

export type Tabs = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type StepProps = {
    toggleTab: (tab: Tabs) => void;
    activeTab: number;
    isPending?: boolean;
    tutorExist?: boolean;
};

export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

export type ObjPaths<T, Prefix extends string = ''> = T extends object
    ? {
          [K in keyof T]-?: K extends string
              ? `${Prefix}${K}` | ObjPaths<T[K], `${Prefix}${K}.`>
              : never;
      }[keyof T]
    : '';

type NullableSchema<T> = T extends null | undefined
    ? Yup.MixedSchema<T>
    : Yup.Schema<T> | Yup.StringSchema | Yup.AnySchema;

export type RecordsShapeYup<Ctx> = {
    [K in keyof Ctx]: NullableSchema<Required<Ctx[K]>>;
};
