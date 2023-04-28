import { FormikContextType, useFormikContext as useOriginalFormikContext } from 'formik'

function useFormikContextSafe<T>(): FormikContextType<T> {
    try {
        const formikContext = useOriginalFormikContext<T>()
        return formikContext
    } catch (error) {
        console.info('Context not found, using default context')
    }

    const defaultContext = {
        values: {} as T,
        errors: {},
        touched: {},
        handleChange: () => { },
        handleBlur: () => { },
        setFieldValue: (name: string, value: string) => { },
        dirty: false,
        isValid: false,
        initialValues: {} as T,
    }
    return defaultContext
}

export default useFormikContextSafe
