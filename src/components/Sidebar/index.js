import { useState, useEffect, useRef } from 'react';
import { useProducts } from '~/hooks';

function Sidebar() {
    const { setProducts, products } = useProducts();
    const [checked, setChecked] = useState();
    const oldProducts = useRef();

    useEffect(() => {
        oldProducts.current = products;
    }, []);

    // Kiểm tra check input filter animal
    const handleChoosed = (id) => {
        if (checked === id) {
            setChecked();
        } else {
            setChecked(id);
        }
        handleFilter(id);
    };

    const handleFilter = (id) => {
        if (checked === id) {
        } else {
        }
    };

    return (
        <div className="p-[20px] border border-solid">
            <h3 className="text-[20px] font-semibold mb-[22px]">Filter</h3>
            <div className="mb-[28px]">
                <h4 className="text-[18px] font-medium mb-[10px] text-[#000]">Brand</h4>
                <div className="pretty p-default mb-[10px] p-smooth">
                    <input type="checkbox" />
                    <div className="state p-info">
                        <label>Merrick</label>
                    </div>
                </div>
            </div>
            <div className="mb-[28px]">
                <h4 className="text-[18px] font-medium mb-[10px] text-[#000]">Pet</h4>
                <div className="pretty p-default mb-[10px] p-smooth">
                    <input type="checkbox" />
                    <div className="state p-info">
                        <label>Dog</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
