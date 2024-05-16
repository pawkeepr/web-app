import type * as Yup from 'yup'

export type Tabs = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type StepProps = {
    toggleTab: (tab: Tabs) => void
    activeTab: number
    isPending?: boolean
    tutorExist?: boolean
}

export type Nullable<T> = {
    [P in keyof T]: T[P] | null
}

export type ObjPaths<T, Prefix extends string = ''> = T extends object
    ? T extends Array<infer U>
        ? `${Prefix}${Prefix extends '' ? '' : '.'}${number}${ObjPaths<U> extends ''
              ? ''
              : `.${ObjPaths<U>}`}`
        : {
              [K in keyof T]-?: K extends string
                  ? `${Prefix}${K}${ObjPaths<T[K]> extends ''
                        ? ''
                        : `.${ObjPaths<T[K], ''>}`}`
                  : never
          }[keyof T]
    : ''

export type ArrayPaths<T, Prefix extends string = ''> = T extends object
    ? {
          [K in keyof T]-?: T[K] extends Array<any>
              ? `${Prefix}${K}`
              : ArrayPaths<T[K], `${Prefix}${K}.`>
      }[keyof T]
    : ''

type NullableSchema<T> = T extends null | undefined
    ? Yup.MixedSchema<T>
    : Yup.Schema<T> | Yup.StringSchema | Yup.AnySchema

export type RecordsShapeYup<Ctx> = {
    [K in keyof Ctx]: NullableSchema<Required<Ctx[K]>>
}

export type GenericObject = {
    [key: string]: unknown
    value: unknown
    label: string
}

export const PAYMENTS_OPTIONS = [
    {
        label: 'Cartão de Crédito',
        value: 'credit_card',
    },
    {
        label: 'Cartão de Débito',
        value: 'debit_card',
    },
    {
        label: 'Pix',
        value: 'pix',
    },
    {
        label: 'Dinheiro',
        value: 'cash',
    },
    {
        label: 'Transferência',
        value: 'transfer',
    },
]

export const PAYMENTS_OPTIONS_INSTALLMENTS = [
    {
        label: '1x',
        value: 1,
    },
    {
        label: '2x',
        value: 2,
    },
    {
        label: '3x',
        value: 3,
    },
    {
        label: '4x',
        value: 4,
    },
    {
        label: '5x',
        value: 5,
    },
    {
        label: '6x',
        value: 6,
    },
    {
        label: '7x',
        value: 7,
    },
    {
        label: '8x',
        value: 8,
    },
    {
        label: '9x',
        value: 9,
    },
    {
        label: '10x',
        value: 10,
    },
    {
        label: '11x',
        value: 11,
    },
    {
        label: '12x',
        value: 12,
    },
]
