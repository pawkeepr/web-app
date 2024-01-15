import { FaSearch } from 'react-icons/fa'
import Input from '~/Components/atoms/input'

type SearchInputProps = {
    value?: string
    placeholder?: string
} & React.HTMLAttributes<HTMLInputElement>

const SearchInput = ({ ...rest }: SearchInputProps) => {
    return (
        <div className="flex w-full">
            <div className="search-box w-full">
                <FaSearch className="search-icon" />
                <Input type="text" className="px-8" {...rest} />
            </div>
        </div>
    )
}

export default SearchInput
