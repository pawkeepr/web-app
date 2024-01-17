import { XMarkIcon } from '@heroicons/react/24/solid'
import { FaSearch } from 'react-icons/fa'
import { create } from 'zustand'
import Input from '~/Components/atoms/input'

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

type KeySearch = 'appointments' | 'veterinary' | 'tutor' | 'pet' | 'historic'

export const useSearch = (name: KeySearch) => {
    const { search, onChangeSearch } = useZustandSearch()

    return {
        search: search[name] || '',
        onChangeSearch: (search: string) => onChangeSearch(search, name),
    }
}

const SearchInput = ({ name, ...rest }: SearchInputProps) => {
    const { onChangeSearch, search } = useSearch(name)

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeSearch(e.target.value)
    }

    return (
        <div className="w-full border border-secondary rounded-lg relative">
            <div className="absolute h-10 left-0 flex items-center justify-center w-10">
                <FaSearch className="text-gray-400" />
            </div>
            <Input
                type="text"
                className="px-8 rounded-lg"
                value={search}
                onChange={handleChangeSearch}
                {...rest}
            />
            <button
                type="button"
                onClick={() => onChangeSearch('')}
                className="absolute h-10 right-0 items-center justify-center w-10 "
            >
                <XMarkIcon className="text-red-300 w-6 h-6" />
            </button>
        </div>
    )
}

export default SearchInput
