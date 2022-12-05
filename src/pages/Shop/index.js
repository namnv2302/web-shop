import { Fragment, useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronDown, faSliders } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '~/components/Sidebar';
import Loading from '~/components/Loading';
import { useProducts } from '~/hooks';
import { sorting } from '~/utils/sorting';
import CardList from '~/components/CardList';
import { getAllDocuments } from '~/utils/manageData';
import SortOptions from '~/components/SortOptions';

function Shop() {
    const { setProducts, products, isLoading } = useProducts();
    const [active, setActive] = useState(1);
    const [isChoosed, setIsChoosed] = useState(false);
    const [sortValue, setSortValue] = useState('Default sorting');
    const [isOpenSortOption, setIsOpenSortOption] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const oldProductsRef = useRef();

    useEffect(() => {
        getAllDocuments('products').then((result) => (oldProductsRef.current = result));
    }, []);

    const handleSorting = (id) => {
        setActive(id);
        setIsOpenSortOption(false);
        setIsChoosed(!isChoosed);
        let newProducts = [];
        switch (id) {
            case 1:
                setSortValue('Default sorting');
                newProducts = [...oldProductsRef.current];

                setProducts(newProducts);
                break;
            case 2:
                setSortValue('Sort by price');
                const arrayPrice = [...oldProductsRef.current].map((item) => item.price);
                if (isChoosed) {
                    newProducts = sorting([...oldProductsRef.current], arrayPrice, 'price', (a, b) => a - b);
                } else {
                    newProducts = sorting([...oldProductsRef.current], arrayPrice, 'price', (a, b) => b - a);
                }

                setProducts(newProducts);
                break;
            case 3:
                const arrayResult = [];
                setSortValue('Sort by time');
                const arraySec = [...oldProductsRef.current].map((item) => item.timeStamp[1]);
                if (isChoosed) {
                    arraySec.sort((a, b) => a - b);
                    arraySec.forEach((element) => {
                        const findItem = [...oldProductsRef.current].find((item) => item.timeStamp[1] === element);
                        arrayResult.push(findItem);
                    });
                } else {
                    arraySec.sort((a, b) => b - a);
                    arraySec.forEach((element) => {
                        const findItem = [...oldProductsRef.current].find((item) => item.timeStamp[1] === element);
                        arrayResult.push(findItem);
                    });
                }
                setProducts(arrayResult);
                break;
            case 4:
                setSortValue('Sort by quantity');
                const arrayRemain = [...oldProductsRef.current].map((item) => item.quantity);
                if (isChoosed) {
                    newProducts = sorting([...oldProductsRef.current], arrayRemain, 'quantity', (a, b) => a - b);
                } else {
                    newProducts = sorting([...oldProductsRef.current], arrayRemain, 'quantity', (a, b) => b - a);
                }

                setProducts(newProducts);
                break;
            case 5:
                setSortValue('Sort by sold');
                const arraySold = [...oldProductsRef.current].map((item) => item.sold);
                if (isChoosed) {
                    newProducts = sorting([...oldProductsRef.current], arraySold, 'sold', (a, b) => a - b);
                } else {
                    newProducts = sorting([...oldProductsRef.current], arraySold, 'sold', (a, b) => b - a);
                }

                setProducts(newProducts);
                break;
            default:
                throw new Error('Invalid!');
        }
    };

    const handleSearch = () => {
        if (searchValue.trim()) {
            const result = oldProductsRef.current.filter((product) =>
                product.name.toLowerCase().includes(searchValue.toLowerCase()),
            );
            setProducts(result);
        } else {
            setProducts(oldProductsRef.current);
        }
    };

    useEffect(() => {
        if (!searchValue.trim() && oldProductsRef.current) {
            setProducts(oldProductsRef.current);
        }
    }, [searchValue, setProducts]);

    return (
        <Fragment>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="mt-[80px]">
                    <div className="h-[46px] bg-[#f3f4f6] text-center leading-[46px]">Home / Shop</div>
                    <div className="flex justify-center mt-[60px]">
                        <div className="container flex justify-between px-[16px]">
                            <div className="w-[18%]">
                                <Sidebar />
                            </div>
                            <div className="w-[82%] ml-[20px]">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[20px] font-semibold">Product</h3>
                                    <div className="flex items-center h-[40px] w-[360px] border border-[rgb(243 244 246)] border-solid">
                                        <input
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            value={searchValue}
                                            className="flex-1 px-[16px] h-[100%] text-[14px] text-[#333] outline-none font-medium"
                                            type="text"
                                            placeholder="Search product ..."
                                        />
                                        <button
                                            onClick={handleSearch}
                                            className="h-[100%] border-l-[1px] border-[rgb(243 244 246)] hover:bg-[#f1f1f1]"
                                        >
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className="px-[16px]" />
                                        </button>
                                    </div>
                                    <div
                                        onClick={() => setIsOpenSortOption(!isOpenSortOption)}
                                        className="relative flex items-center justify-between w-[228px] h-[40px] px-[16px] border border-solid cursor-pointer"
                                    >
                                        <span className="text-[16px] font-medium text-[#000]">{sortValue}</span>
                                        <FontAwesomeIcon className="text-[14px]" icon={faChevronDown} />

                                        {isOpenSortOption && <SortOptions active={active} onSorting={handleSorting} />}
                                    </div>
                                </div>

                                {!products.length ? (
                                    <div className="relative my-[180px] flex flex-col justify-center items-center font-semibold">
                                        <div className="flex items-center justify-center w-[80px] h-[80px] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.05)] border">
                                            <FontAwesomeIcon className="text-[28px]" icon={faSliders} />
                                        </div>
                                        <span className="mt-[10px]">No results found</span>
                                    </div>
                                ) : (
                                    <CardList itemsPerPage={8} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default Shop;
