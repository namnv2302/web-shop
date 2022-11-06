import { useState, useEffect, useRef } from 'react';
import { useProducts } from '~/hooks';
import FilterItemAnimal from '~/components/FilterItemAnimal';
import FilterItemBrand from '~/components/FilterItemBrand';
import { filterListAnimals, filterListBrands } from '~/utils/filterList';

function Sidebar() {
    const { setProducts, products, listFilterAnimals, listFilterBrands } = useProducts();
    const [checkedAnimal, setCheckedAnimal] = useState([]);
    const [checkedBrand, setCheckedBrand] = useState([]);

    const oldProducts = useRef(products);

    useEffect(() => {
        if (!checkedAnimal.length && !checkedBrand.length) {
            setProducts(oldProducts.current);
        }
    }, [setProducts, checkedAnimal, checkedBrand]);

    // Kiểm tra check input filter animal
    const handleCheckAnimal = (id) => {
        const isCheckedAnimal = checkedAnimal.includes(id);
        if (isCheckedAnimal) {
            setCheckedAnimal((prev) => [...prev.filter((item) => item !== id)]);
        } else {
            setCheckedAnimal((prev) => [...prev, id]);
        }
    };

    // Xử lý filter theo animal
    const handleFilterAnimal = (id) => {
        const arrayProducts = oldProducts.current;

        if (checkedAnimal.includes(id)) {
            setProducts((prev) => {
                switch (id) {
                    case 1:
                        return prev.filter((item) => item.pet !== filterListAnimals.animal1);
                    case 2:
                        return prev.filter((item) => item.pet !== filterListAnimals.animal2);
                    case 3:
                        return prev.filter((item) => item.pet !== filterListAnimals.animal3);
                    default:
                        throw new Error('Invalid option!');
                }
            });
        } else {
            if (!checkedAnimal.length) {
                setProducts((prev) => {
                    switch (id) {
                        case 1:
                            return arrayProducts.filter((item) => item.pet === filterListAnimals.animal1);
                        case 2:
                            return arrayProducts.filter((item) => item.pet === filterListAnimals.animal2);
                        case 3:
                            return arrayProducts.filter((item) => item.pet === filterListAnimals.animal3);
                        default:
                            throw new Error('Invalid option!');
                    }
                });
            } else {
                setProducts((prev) => {
                    switch (id) {
                        case 1:
                            return [...prev, ...arrayProducts.filter((item) => item.pet === filterListAnimals.animal1)];
                        case 2:
                            return [...prev, ...arrayProducts.filter((item) => item.pet === filterListAnimals.animal2)];
                        case 3:
                            return [...prev, ...arrayProducts.filter((item) => item.pet === filterListAnimals.animal3)];
                        default:
                            throw new Error('Invalid option!');
                    }
                });
            }
        }
    };

    // Kiểm tra check input filter brand
    const handleCheckBrand = (id) => {
        const isCheckedBrand = checkedBrand.includes(id);
        if (isCheckedBrand) {
            setCheckedBrand((prev) => [...prev.filter((item) => item !== id)]);
        } else {
            setCheckedBrand((prev) => [...prev, id]);
        }
    };

    // Xử lý filter theo animal
    const handleFilterBrand = (id) => {
        const arrayProducts = oldProducts.current;

        if (!checkedBrand.includes(id)) {
            if (!checkedAnimal.length && !checkedBrand.length) {
                setProducts((prev) => {
                    switch (id) {
                        case 4:
                            return arrayProducts.filter((item) => item.brand === filterListBrands.brand1);
                        case 5:
                            return arrayProducts.filter((item) => item.brand === filterListBrands.brand2);
                        case 6:
                            return arrayProducts.filter((item) => item.brand === filterListBrands.brand3);
                        default:
                            throw new Error('Invalid option!');
                    }
                });
            } else if (!checkedAnimal.length && checkedBrand.length) {
                setProducts((prev) => {
                    switch (id) {
                        case 4:
                            return [...prev, ...arrayProducts.filter((item) => item.brand === filterListBrands.brand1)];
                        case 5:
                            return [...prev, ...arrayProducts.filter((item) => item.brand === filterListBrands.brand2)];
                        case 6:
                            return [...prev, ...arrayProducts.filter((item) => item.brand === filterListBrands.brand3)];
                        default:
                            throw new Error('Invalid option!');
                    }
                });
            } else if (checkedAnimal.length && !checkedBrand.length) {
                setProducts((prev) => {
                    switch (id) {
                        case 4:
                            return [...prev.filter((item) => item.brand === filterListBrands.brand1)];
                        case 5:
                            return [...prev.filter((item) => item.brand === filterListBrands.brand2)];
                        case 6:
                            return [...prev.filter((item) => item.brand === filterListBrands.brand3)];
                        default:
                            throw new Error('Invalid option!');
                    }
                });
            } else if (checkedAnimal.length && checkedBrand.length) {
                setProducts((prev) => {
                    switch (id) {
                        case 4:
                            return [...prev.filter((item) => item.brand === filterListBrands.brand1)];
                        case 5:
                            return [...prev.filter((item) => item.brand === filterListBrands.brand2)];
                        case 6:
                            return [...prev.filter((item) => item.brand === filterListBrands.brand3)];
                        default:
                            throw new Error('Invalid option!');
                    }
                });
            }
        }
    };

    // chưa check =>
    /* 
        nếu mảng Animal rỗng && mảng brand rỗng => lọc từ mảng ban đầu
                              && mảng brand không rỗng => loc, thêm vào                 
        nếu mảng Animal không rỗng && mảng brand rỗng => loc từ mảng animal
                                    && mảng brand có giá trị => loc từ mảng animal
    */

    return (
        <div className="p-[20px] border border-solid">
            <h3 className="text-[20px] font-semibold mb-[22px]">Filter</h3>
            <div className="mb-[28px]">
                <h4 className="text-[18px] font-medium mb-[10px] text-[#000]">Animals</h4>
                {listFilterAnimals.map((listFilterAnimal) => (
                    <FilterItemAnimal
                        key={listFilterAnimal.id}
                        data={listFilterAnimal}
                        checked={checkedAnimal}
                        onFilter={handleFilterAnimal}
                        onCheck={handleCheckAnimal}
                    />
                ))}
            </div>
            <div className="mb-[28px]">
                <h4 className="text-[18px] font-medium mb-[10px] text-[#000]">Brand</h4>
                {listFilterBrands.map((listFilterBrand) => (
                    <FilterItemBrand
                        key={listFilterBrand.id}
                        data={listFilterBrand}
                        checked={checkedBrand}
                        onCheck={handleCheckBrand}
                        onFilter={handleFilterBrand}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
