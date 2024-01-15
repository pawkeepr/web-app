import { FaSearch } from 'react-icons/fa'
import Input from '~/Components/atoms/input'

type SearchInputProps = {
    value?: string
    placeholder?: string
} & React.HTMLAttributes<HTMLInputElement>

const SearchInput = ({ ...rest }: SearchInputProps) => {
    return (
        <div className="w-full border border-secondary rounded-lg relative">
            <div className="absolute h-10 left-0 flex items-center justify-center w-10">
                <FaSearch className="text-gray-400" />
            </div>
            <Input type="text" className="px-8 rounded-lg" {...rest} />
        </div>
    )
}

export default SearchInput
