function FilterOptions({ active, handleFilter }) {
    const filterOptions = [
        {
            id: 1,
            content: 'Default filter',
        },
        {
            id: 2,
            content: 'Filter by brand - Merrick',
        },
        {
            id: 3,
            content: "Filter by brand - Hill's",
        },
        {
            id: 4,
            content: 'Filter by brand - EveryYay',
        },
        {
            id: 5,
            content: 'Filter by pet - Dog',
        },
        {
            id: 6,
            content: 'Filter by pet - Cat',
        },
    ];

    return (
        <div className="absolute top-[calc(100%+8px)] z-10 right-0 min-w-[220px] p-[10px] bg-[#fff] rounded-[5px] shadow-[0_0_10px_rgba(0,0,0,0.01)]">
            <ul>
                {filterOptions.map((filterOption) => (
                    <li
                        onClick={() => handleFilter(filterOption.id)}
                        key={filterOption.id}
                        className={
                            active === filterOption.id
                                ? 'text-[14px] text-[#414755] font-semibold text-left py-[5px] px-[10px] active'
                                : 'text-[14px] text-[#414755] font-semibold text-left py-[5px] px-[10px]'
                        }
                    >
                        {filterOption.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FilterOptions;
