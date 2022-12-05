import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSort, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth, useProducts } from '~/hooks';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TableProduct from './components/TableProduct';
import ModalAddProduct from './components/ModalAddProduct';
import { getAllDocuments } from '~/utils/manageData';
import { sorting } from '~/utils/sorting';
import FilterOptions from './components/FilterOptions';
import SortOptions from './components/SortOptions';

function Admin() {
    const { admin } = useAuth();
    const { setProducts, products } = useProducts();
    const navigate = useNavigate();
    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
    const [isOpenSortOptions, setIsOpenSortOptions] = useState(false);
    const [isOpenFilterOptions, setIsOpenFilterOptions] = useState(false);
    const [activeSort, setActiveSort] = useState(1);
    const [activeFilter, setActiveFilter] = useState(1);

    const oldProductsRef = useRef();

    useEffect(() => {
        getAllDocuments('products').then((result) => (oldProductsRef.current = result));
    }, []);

    useEffect(() => {
        if (!Object.keys(admin).length) {
            navigate('/');
        }
    }, [admin, navigate]);

    const handleSort = (id) => {
        setIsOpenSortOptions(false);
        setActiveSort(id);
        let newProducts = [];
        switch (id) {
            case 1:
                newProducts = [...oldProductsRef.current];

                setProducts(newProducts);
                break;
            case 2:
                const arrayPrice = [...oldProductsRef.current].map((item) => item.price);
                newProducts = sorting([...oldProductsRef.current], arrayPrice, 'price', (a, b) => b - a);

                setProducts(newProducts);
                break;
            case 3:
                const arrayResult = [];
                const arraySec = [...oldProductsRef.current].map((item) => item.timeStamp[1]);
                arraySec.sort((a, b) => b - a);
                arraySec.forEach((element) => {
                    const findItem = [...oldProductsRef.current].find((item) => item.timeStamp[1] === element);
                    arrayResult.push(findItem);
                });
                setProducts(arrayResult);
                break;
            case 4:
                const arrayRemain = [...oldProductsRef.current].map((item) => item.quantity);
                newProducts = sorting([...oldProductsRef.current], arrayRemain, 'quantity', (a, b) => b - a);

                setProducts(newProducts);
                break;
            case 5:
                const arraySold = [...oldProductsRef.current].map((item) => item.sold);
                newProducts = sorting([...oldProductsRef.current], arraySold, 'sold', (a, b) => b - a);

                setProducts(newProducts);
                break;
            default:
                throw new Error('Invalid!');
        }
    };

    const handleFilter = (id) => {
        setIsOpenFilterOptions(false);
        setActiveFilter(id);
        let newProducts = [];
        switch (id) {
            case 1:
                newProducts = [...oldProductsRef.current];

                setProducts(newProducts);
                break;
            case 2:
                newProducts = [...oldProductsRef.current].filter((item) => item.brand === 'Merrick');
                setProducts(newProducts);
                break;
            case 3:
                newProducts = [...oldProductsRef.current].filter((item) => item.brand === "Hill's");
                setProducts(newProducts);
                break;
            case 4:
                newProducts = [...oldProductsRef.current].filter((item) => item.brand === 'EveryYay');
                setProducts(newProducts);
                break;
            case 5:
                newProducts = [...oldProductsRef.current].filter((item) => item.pet === 'Dog');
                setProducts(newProducts);
                break;
            case 6:
                newProducts = [...oldProductsRef.current].filter((item) => item.pet === 'Cat');
                setProducts(newProducts);
                break;
            default:
                throw new Error('Invalid!');
        }
    };

    return (
        <div className="">
            <Header />
            <div className="flex justify-between">
                <div className="w-[250px] h-[calc(100vh-64px)] shadow-[1px_0_20px_rgba(0,0,0,0.08)]">
                    <Sidebar />
                </div>
                <div className="flex-1 pl-[20px] pr-[31px] pt-[20px] bg-[#eef5f9]">
                    <h4 className="text-[#3e5569] text-[18px] font-semibold mb-[30px]">Product</h4>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsOpenModalCreate(true)}
                            className="w-[180px] h-[40px] px-[10px] py-[4px] mb-[20px] text-[14px] text-[#000] rounded-[2px] border"
                        >
                            <FontAwesomeIcon icon={faSquarePlus} />
                            <span className="ml-[10px]">Create product</span>
                        </button>
                        <div className="flex items-center justify-center">
                            <button
                                onClick={() => setIsOpenFilterOptions(!isOpenFilterOptions)}
                                className="relative w-[90px] h-[40px] px-[10px] py-[4px] mb-[20px] text-[14px] text-[#000] rounded-[2px] border"
                            >
                                <span className="mr-[10px]">Filter</span>
                                <FontAwesomeIcon icon={faFilter} />
                                {isOpenFilterOptions && (
                                    <FilterOptions active={activeFilter} handleFilter={handleFilter} />
                                )}
                            </button>
                            <button
                                onClick={() => setIsOpenSortOptions(!isOpenSortOptions)}
                                className="relative w-[90px] h-[40px] px-[10px] py-[4px] mb-[20px] ml-[10px] text-[14px] text-[#000] rounded-[2px] border"
                            >
                                <span className="mr-[10px]">Sorting</span>
                                <FontAwesomeIcon icon={faSort} />
                                {isOpenSortOptions && <SortOptions active={activeSort} handleSort={handleSort} />}
                            </button>
                        </div>
                    </div>
                    <TableProduct itemsPerPage={5} />
                </div>
            </div>
            {isOpenModalCreate && <ModalAddProduct setIsOpenModalCreate={setIsOpenModalCreate} />}
        </div>
    );
}

export default Admin;
