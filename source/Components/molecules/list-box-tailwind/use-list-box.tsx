import { useFormikContext } from 'formik'
import { useEffect, useState, useTransition } from 'react'

export type Item = {
    value: string | number | any
    name: string
}

export type UseListBoxProps<T> = {
    placeholder: string
    option?: Item & T
    reset?: boolean
    name: string
    value?: string | null
    items: (Item & T)[]
    onChangeOption?: (item: Item & T) => void
}

const useListBox = <T,>({
    placeholder,
    option,
    reset,
    onChangeOption,
    name,
    value,
    items,
}: UseListBoxProps<T>) => {
    const [isPending, startTransition] = useTransition()

    const [placeholderState, setPlaceholderState] = useState(placeholder)
    const [selected, setSelected] = useState<Item & T>(option as Item & T)

    const { setFieldValue } = useFormikContext<{ [key in string]: any }>()

    useEffect(() => {
        if (!option) {
            return
        }

        setSelected(option)
    }, [option])

    useEffect(() => {
        if (!reset) {
            return
        }

        setSelected(() => ({ name: placeholder, value: null } as Item & T))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset])

    useEffect(() => {
        if (!selected?.name) {
            setPlaceholderState(placeholder)
            return
        }

        setPlaceholderState(selected?.name)

    }, [selected, placeholder])

    useEffect(() => {

        const item = items?.find(item => item.name === value)

        if (!item) {
            return
        }

        setSelected(item)

    }, [value, items])


    const onChangeValue = (item: Item & T) => {
        startTransition(() => {
            onChangeOption?.(item)
            setSelected(item)
            setFieldValue(name, item.name)
        })
    }

    return {
        isPending,
        placeholderState,
        selected,
        onChangeValue,
    }
}

export default useListBox