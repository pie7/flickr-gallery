const SearchIcon = () =>
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" /></svg>

const SearchBox = ({ searchKeyword = '', updateSearchInput, triggerSearch }: {
    searchKeyword?: string;
    updateSearchInput?: any;
    triggerSearch?: (searchKeyword: string) => void
}) => {
    return (
        <div className="flex mb-3 relative">
            <input
                type="text"
                className="search__input px-3 py-2 border border-gray-600 rounded-lg block w-full"
                placeholder="Search..."
                onChange={(e) => updateSearchInput && updateSearchInput(e)}
                onKeyDown={(e) => { e.key === 'Enter' && triggerSearch && triggerSearch(searchKeyword) }}
                value={searchKeyword}
            />
            <span
                className="cursor-pointer p-2 absolute right-0 top-0 bottom-0 flex items-center"
                onClick={() => { triggerSearch && triggerSearch(searchKeyword) }}
            >
                <SearchIcon />
            </span>
        </div>
    )
}
export default SearchBox