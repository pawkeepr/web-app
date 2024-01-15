import {
    useField as useOriginalField,
    type FieldHelperProps,
    type FieldInputProps,
    type FieldMetaProps,
} from 'formik'

function useFieldSafe<T = string>(
    fieldName: string,
): [FieldInputProps<T>, FieldMetaProps<T>, FieldHelperProps<T>] {
    try {
        // Tenta usar o hook useField do Formik
        const field = useOriginalField(fieldName)
        return field
    } catch (_) {
        const defaultField: [
            FieldInputProps<T>,
            FieldMetaProps<T>,
            FieldHelperProps<T>,
        ] = [
            {
                value: '' as T,
                onChange: () => {},
                onBlur: () => {},
                name: fieldName,
                checked: false,
                multiple: false,
            },
            {
                touched: false,
                error: undefined,
                initialTouched: false,
                value: '' as T,
            },
            {
                setValue: () => Promise.resolve(),
                setTouched: () => Promise.resolve(),
                setError: () => {},
            },
        ] as const

        return defaultField
    }
}

export default useFieldSafe
