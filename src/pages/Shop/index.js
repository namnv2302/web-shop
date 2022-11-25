import { Fragment, useEffect, useState, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronDown, faSliders } from '@fortawesome/free-solid-svg-icons';
import { auth } from '~/store/firebase';
import Card from '~/components/Card';
import Sidebar from '~/components/Sidebar';
import Loading from '~/components/Loading';
import { useProducts, useAuth } from '~/hooks';
import { sorting } from '~/utils/sorting';

function Shop() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { setProducts, products, isLoading } = useProducts();
    const [active, setActive] = useState(1);
    const [sortValue, setSortValue] = useState('Default sorting');
    const [isOpenSortOption, setIsOpenSortOption] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const oldProductsRef = useRef();

    useEffect(() => {
        oldProductsRef.current = products;
    }, []);

    const handleSorting = (id) => {
        setActive(id);
        setIsOpenSortOption(false);
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
                newProducts = sorting([...oldProductsRef.current], arrayPrice, 'price', (a, b) => b - a);

                setProducts(newProducts);
                break;
            case 3:
                setSortValue('Sort by time');
                const arraySec = [...oldProductsRef.current].map((item) => item.timeStamp[1]);
                newProducts = sorting([...oldProductsRef.current], arraySec, 'timeStamp[1]', (a, b) => b - a);

                break;
            case 4:
                setSortValue('Sort by remaining');
                const arrayRemain = [...oldProductsRef.current].map((item) => item.quantity);
                newProducts = sorting([...oldProductsRef.current], arrayRemain, 'quantity', (a, b) => b - a);

                setProducts(newProducts);
                break;
            case 5:
                setSortValue('Sort by sold');
                const arraySold = [...oldProductsRef.current].map((item) => item.sold);
                newProducts = sorting([...oldProductsRef.current], arraySold, 'sold', (a, b) => b - a);

                setProducts(newProducts);
                break;
            default:
                throw new Error('Invalid!');
        }
    };

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
                                        <button className="h-[100%] border-l-[1px] border-[rgb(243 244 246)] hover:bg-[#f1f1f1]">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className="px-[16px]" />
                                        </button>
                                    </div>
                                    <div
                                        onClick={() => setIsOpenSortOption(!isOpenSortOption)}
                                        className="relative flex items-center justify-between w-[228px] h-[40px] px-[16px] border border-solid cursor-pointer"
                                    >
                                        <span className="text-[16px] font-medium text-[#000]">{sortValue}</span>
                                        <FontAwesomeIcon className="text-[14px]" icon={faChevronDown} />

                                        {isOpenSortOption && (
                                            <ul className="absolute z-10 top-[118%] left-[-1px] right-[-1px] py-[6px] bg-[#fff] border border-solid">
                                                <li
                                                    onClick={() => handleSorting(1)}
                                                    className={
                                                        active === 1
                                                            ? 'flex items-center px-[16px] h-[32px] active'
                                                            : 'flex items-center px-[16px] h-[32px]'
                                                    }
                                                >
                                                    Default sorting
                                                </li>
                                                <li
                                                    onClick={() => handleSorting(2)}
                                                    className={
                                                        active === 2
                                                            ? 'flex items-center px-[16px] h-[32px] active'
                                                            : 'flex items-center px-[16px] h-[32px]'
                                                    }
                                                >
                                                    Sort by price
                                                </li>
                                                <li
                                                    onClick={() => handleSorting(3)}
                                                    className={
                                                        active === 3
                                                            ? 'flex items-center px-[16px] h-[32px] active'
                                                            : 'flex items-center px-[16px] h-[32px]'
                                                    }
                                                >
                                                    Sort by time
                                                </li>
                                                <li
                                                    onClick={() => handleSorting(4)}
                                                    className={
                                                        active === 4
                                                            ? 'flex items-center px-[16px] h-[32px] active'
                                                            : 'flex items-center px-[16px] h-[32px]'
                                                    }
                                                >
                                                    Sort by remaining
                                                </li>
                                                <li
                                                    onClick={() => handleSorting(5)}
                                                    className={
                                                        active === 5
                                                            ? 'flex items-center px-[16px] h-[32px] active'
                                                            : 'flex items-center px-[16px] h-[32px]'
                                                    }
                                                >
                                                    Sort by sold
                                                </li>
                                            </ul>
                                        )}
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
                                    <div>
                                        <div className="flex flex-wrap mx-[-10px] mt-[20px]">
                                            {products
                                                // .filter((item) =>
                                                //     item.name.toLowerCase().includes(searchValue.toLowerCase()),
                                                // )
                                                .map((product, index) => (
                                                    <Card key={index} product={product} />
                                                ))}
                                        </div>
                                        <div className="pagination flex items-center justify-center mt-[40px]">
                                            <span className="active flex items-center justify-center w-[40px] h-[40px] mx-[5px] cursor-pointer text-[18px] text-[#F6AB49] border border-[#F6AB49]">
                                                1
                                            </span>
                                            <span className="flex items-center justify-center w-[40px] h-[40px] mx-[5px] cursor-pointer text-[18px] text-[#F6AB49] border border-[#F6AB49]">
                                                2
                                            </span>
                                            <span className="flex items-center justify-center w-[40px] h-[40px] mx-[5px] cursor-pointer text-[18px] text-[#F6AB49] border border-[#F6AB49]">
                                                3
                                            </span>
                                            <span className="flex items-center justify-center w-[40px] h-[40px] mx-[5px] cursor-pointer text-[14px] text-[#F6AB49] border border-[#F6AB49]">
                                                >>
                                            </span>
                                        </div>
                                    </div>
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
