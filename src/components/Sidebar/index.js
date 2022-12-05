import { useState, useEffect, useRef } from 'react';
import { useProducts } from '~/hooks';
import { getAllDocuments } from '~/utils/manageData';

function Sidebar() {
    const filterBrandOptions = [
        {
            id: 1,
            content: 'Merrick',
        },
        {
            id: 2,
            content: "Hill's",
        },
        {
            id: 3,
            content: 'EveryYay',
        },
    ];
    const filterPetOptions = [
        {
            id: 1,
            content: 'Dog',
        },
        {
            id: 2,
            content: 'Cat',
        },
    ];
    const { setProducts, products } = useProducts();
    const [checkedBrand, setCheckedBrand] = useState([]);
    const [checkedPet, setCheckedPet] = useState([]);
    const oldProductsRef = useRef([]);

    useEffect(() => {
        getAllDocuments('products').then((result) => (oldProductsRef.current = result));
    }, []);

    useEffect(() => {
        if (checkedBrand.length === 0 && oldProductsRef.current.length > 0) {
            setProducts(oldProductsRef.current);
        }
    }, [checkedBrand, setProducts]);

    const handleFilterBrand = (id) => {
        if (checkedBrand.includes(id)) {
            setProducts((prev) => {
                switch (id) {
                    case 1:
                        return prev.filter((item) => item.brand !== 'Merrick');
                    case 2:
                        return prev.filter((item) => item.brand !== "Hill's");
                    case 3:
                        return prev.filter((item) => item.brand !== 'EveryYay');
                    default:
                        return prev;
                }
            });
        } else {
            if (!checkedBrand.length) {
                setProducts((prev) => {
                    switch (id) {
                        case 1:
                            return oldProductsRef.current.filter((item) => item.brand === 'Merrick');
                        case 2:
                            return oldProductsRef.current.filter((item) => item.brand === "Hill's");
                        case 3:
                            return oldProductsRef.current.filter((item) => item.brand === 'EveryYay');
                        default:
                            return prev;
                    }
                });
            } else {
                setProducts((prev) => {
                    switch (id) {
                        case 1:
                            return [...prev, ...oldProductsRef.current.filter((item) => item.brand === 'Merrick')];
                        case 2:
                            return [...prev, ...oldProductsRef.current.filter((item) => item.brand === "Hill's")];
                        case 3:
                            return [...prev, ...oldProductsRef.current.filter((item) => item.brand === 'EveryYay')];
                        default:
                            return prev;
                    }
                });
            }
        }
    };

    // Kiểm tra check input filter brand
    const handleChoosedBrand = (id) => {
        handleFilterBrand(id);
        if (checkedBrand.includes(id)) {
            setCheckedBrand((prev) => prev.filter((item) => item !== id));
        } else {
            setCheckedBrand((prev) => [...prev, id]);
        }
    };

    // Kiểm tra check input filter pet
    const handleChoosedPet = (id) => {
        if (checkedPet.includes(id)) {
            setCheckedPet((prev) => prev.filter((item) => item !== id));
        } else {
            setCheckedPet((prev) => [...prev, id]);
        }
    };

    return (
        <div className="p-[20px] border border-solid">
            <h3 className="text-[20px] font-semibold mb-[22px]">Filter</h3>
            <div className="mb-[28px]">
                <h4 className="text-[18px] font-medium mb-[10px] text-[#000]">Brand</h4>
                {filterBrandOptions.map((item) => (
                    <div key={item.id} className="pretty p-default mb-[10px] p-smooth">
                        <input
                            value={checkedBrand.includes(item.id)}
                            onChange={() => handleChoosedBrand(item.id)}
                            type="checkbox"
                        />
                        <div className="state p-info">
                            <label>{item.content}</label>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mb-[28px]">
                <h4 className="text-[18px] font-medium mb-[10px] text-[#000]">Pet</h4>
                {filterPetOptions.map((item) => (
                    <div key={item.id} className="pretty p-default mb-[10px] p-smooth">
                        <input
                            value={checkedPet.includes(item.id)}
                            onChange={() => handleChoosedPet(item.id)}
                            type="checkbox"
                        />
                        <div className="state p-info">
                            <label>{item.content}</label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
