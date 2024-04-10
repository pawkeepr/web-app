import { XMarkIcon } from '@heroicons/react/24/solid'
import { Formik } from 'formik'
import { FaSearch } from 'react-icons/fa'
import { create } from 'zustand'
import FieldControl from '../field-control'

type SearchInputProps = {
    value?: string
    placeholder?: string
    name: string
} & React.HTMLAttributes<HTMLInputElement>

type IHookUseSearch = {
    search: {
        [key: string]: string
    }
    onChangeSearch: (search: string, key: string) => void
}

export const useZustandSearch = create<IHookUseSearch>((set) => ({
    search: {},
    onChangeSearch: (search: string, name: string) =>
        set({
            search: {
                [name]: search,
            },
        }),
}))

const KeySearch = {
    veterinary: 'veterinary',
    tutor: 'tutor',
    pet: 'pet',
    appointment: 'appointment',
}
type KeySearch = typeof KeySearch[keyof typeof KeySearch]

export const useSearch = (name: KeySearch) => {
    const { search, onChangeSearch } = useZustandSearch()

    return {
        search: search[name] || '',
        onChangeSearch: (search: string) => onChangeSearch(search, name),
    }
}

const SearchInput = ({ name }: SearchInputProps) => {
    const { onChangeSearch } = useSearch(name)

    const handleSubmit = (values: { search: string }) => {
        onChangeSearch(values.search)
    }

    return (
        <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
            {({ values }) => {
                return (
                    <FieldControl
                        ctx={values}
                        name="search"
                        label="Pesquisar"
                        className="h-10 w-full"
                        startIcon={<FaSearch className="text-gray-400" />}
                        endIcon={
                            <button
                                type="button"
                                onClick={() => onChangeSearch('')}
                                className="flex items-center justify-center"
                            >
                                <XMarkIcon className="text-red-300 w-6 h-6" />
                            </button>
                        }
                    />
                )
            }}
        </Formik>
    )
}

export default SearchInput
