import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

function SortOptions({ active, onSorting }) {
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
        <ul className="absolute z-10 top-[118%] left-[-1px] right-[-1px] py-[6px] bg-[#fff] border border-solid">
            {sortOptions.map((sortOption) => (
                <li
                    key={sortOption.id}
                    onClick={() => onSorting(sortOption.id)}
                    className={
                        active === sortOption.id
                            ? 'flex items-center px-[16px] justify-between h-[32px] active'
                            : 'flex items-center px-[16px] justify-between h-[32px]'
                    }
                >
                    {sortOption.content}
                    {(sortOption.id === 2 || sortOption.id === 3 || sortOption.id === 4 || sortOption.id === 5) && (
                        <span>
                            <FontAwesomeIcon icon={faSort} />
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default SortOptions;
