import {
    useFormikContext as useOriginalFormikContext,
    type FormikContextType,
    type FormikErrors,
} from 'formik'
import type { ArrayPaths, ObjPaths } from '~/types/helpers'

// Modify FormikContextTypeSafe to ensure setFieldValue uses keys from type T
type FormikContextTypeSafe<T = unknown> = Omit<
    FormikContextType<T>,
    'setFieldValue'
> & {
    setFieldValue: (
        field: ObjPaths<T> | ArrayPaths<T>,
        value: unknown,
        shouldValidate?: boolean | undefined,
    ) => Promise<unknown | FormikErrors<T>>
}

const useFormikContextSafe = <T,>(): FormikContextTypeSafe<T> => {
    const formikContext: FormikContextTypeSafe<T> = useOriginalFormikContext()
    return formikContext
}

export default useFormikContextSafe
