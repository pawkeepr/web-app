import { FormikContextType, useFormikContext as useOriginalFormikContext } from 'formik'

function useFormikContextSafe<T>(): FormikContextType<T> {
    try {
        const formikContext = useOriginalFormikContext<T>()
        return formikContext
    } catch (error) {
        const defaultContext = {
            values: {},
            errors: {},
            touched: {},
            handleChange: () => { },
            handleBlur: () => { },
            setFieldValue: () => { },
        } as unknown as FormikContextType<T>
        return defaultContext
    }
}

export default useFormikContextSafe
