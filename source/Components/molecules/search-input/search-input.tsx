
type SearchInputProps = {

} & React.HTMLAttributes<HTMLInputElement>

const SearchInput = ({ ...rest }: SearchInputProps) => {
    return (
        <div className="d-flex">
            <div className="search-box me-2">
                <input type="text" {...rest} />
                <i className="ri-search-line search-icon"></i>
            </div>
        </div>
    )
}

export default SearchInput