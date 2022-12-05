function SortOptions({ active, handleSort }) {
    const sortOptions = [
        {
            id: 1,
            content: 'Default sorting',
        },
        {
            id: 2,
            content: 'Sort by price',
        },
        {
            id: 3,
            content: 'Sort by time',
        },
        {
            id: 4,
            content: 'Sort by quantity',
        },
        {
            id: 5,
            content: 'Sort by sold',
        },
    ];
    return (
        <div className="absolute top-[calc(100%+8px)] z-10 right-0 min-w-[200px] p-[10px] bg-[#fff] rounded-[5px] shadow-[0_0_10px_rgba(0,0,0,0.01)]">
            <ul>
                {sortOptions.map((sortOption) => (
                    <li
                        onClick={() => handleSort(sortOption.id)}
                        key={sortOption.id}
                        className={
                            active === sortOption.id
                                ? 'text-[14px] text-[#414755] font-semibold text-left py-[5px] px-[10px] active'
                                : 'text-[14px] text-[#414755] font-semibold text-left py-[5px] px-[10px]'
                        }
                    >
                        {sortOption.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SortOptions;
