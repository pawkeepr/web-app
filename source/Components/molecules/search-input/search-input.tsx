
type SearchInputProps = {
    value?: string
} & React.HTMLAttributes<HTMLInputElement>

const SearchInput = ({ ...rest }: SearchInputProps) => {
    return (
        <div className="flex w-full">
            <div className="search-box me-2 w-full">
                <input type="text" {...rest} />
                <i className="ri-search-line search-icon"></i>
            </div>
        </div>
    )
}

export default SearchInput