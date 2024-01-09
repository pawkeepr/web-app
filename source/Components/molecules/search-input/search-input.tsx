import Input from '~/Components/atoms/input';

type SearchInputProps = {
    value?: string;
} & React.HTMLAttributes<HTMLInputElement>;

const SearchInput = ({ ...rest }: SearchInputProps) => {
    return (
        <div className="flex w-full">
            <div className="search-box w-full">
                <Input type="text" {...rest} />
                <i className="ri-search-line search-icon"></i>
            </div>
        </div>
    );
};

export default SearchInput;
