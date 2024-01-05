import { FormikContextType, FormikErrors, useFormikContext as useOriginalFormikContext } from 'formik';
import { ObjPaths } from '~/types/helpers';

// Modify FormikContextTypeSafe to ensure setFieldValue uses keys from type T
type FormikContextTypeSafe<T = unknown> = Omit<FormikContextType<T>, 'setFieldValue'> & {
    setFieldValue: (
        field: ObjPaths<T>,  // use ObjPaths to get the string paths of the object T
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<T>>;
}

const useFormikContextSafe = <T extends unknown>(): FormikContextTypeSafe<T> => {
    const formikContext: FormikContextTypeSafe<T> = useOriginalFormikContext()
    return formikContext
}

export default useFormikContextSafe
