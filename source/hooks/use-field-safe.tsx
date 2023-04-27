import { FieldHelperProps, FieldInputProps, FieldMetaProps, useField as useOriginalField } from 'formik'

function useFieldSafe(fieldName: string): [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] {
    try {
        // Tenta usar o hook useField do Formik
        const field = useOriginalField(fieldName)
        return field
    } catch (error) {
        console.info('Context not found, using default field')
        const defaultField: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = [
            {
                value: '',
                onChange: () => { },
                onBlur: () => { },
                name: fieldName,
                checked: false,
                multiple: false,
            },
            {
                touched: false,
                error: undefined,
                initialTouched: false,
                value: '',
            },
            {
                setValue: () => { },
                setTouched: () => { },
                setError: () => { },
            },
        ]
        return defaultField
    }
}

export default useFieldSafe
