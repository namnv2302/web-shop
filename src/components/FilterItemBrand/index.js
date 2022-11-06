function FilterItemBrand({ data, checked, onCheck, onFilter }) {
    return (
        <div className="pretty p-default mb-[10px] p-smooth">
            <input
                type="checkbox"
                checked={checked.includes(data.id)}
                onChange={() => onCheck(data.id)}
                onClick={() => onFilter(data.id)}
            />
            <div className="state p-info">
                <label>{data.name}</label>
            </div>
        </div>
    );
}

export default FilterItemBrand;
