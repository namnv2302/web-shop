import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import ProductItem from '../ProductItem';
import { useProducts } from '~/hooks';

function Items({ currentItems }) {
    return <>{currentItems && currentItems.map((item) => <ProductItem key={item.id} product={item} />)}</>;
}

function TableProduct({ itemsPerPage }) {
    const { products } = useProducts();
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    return (
        <div>
            <table className="w-[100%]">
                <thead>
                    <tr className="border border-[#787676] h-[53px]">
                        <th className="text-[12px] text-[#3e5569] w-[138px] font-bold border border-[#ebebeb]">
                            IMAGE
                        </th>
                        <th className="text-[12px] text-[#3e5569] w-[138px] font-bold border border-[#ebebeb]">PET</th>
                        <th className="text-[12px] text-[#3e5569] w-[138px] font-bold border border-[#ebebeb]">
                            BRAND
                        </th>
                        <th className="text-[12px] text-[#3e5569] w-[138px] font-bold border border-[#ebebeb]">
                            PRICE
                        </th>
                        <th className="text-[12px] text-[#3e5569] w-[138px] font-bold border border-[#ebebeb]">
                            QUANTITY
                        </th>
                        <th className="text-[12px] text-[#3e5569] w-[324px] font-bold border border-[#ebebeb]">Date</th>
                        <th className="text-[12px] text-[#3e5569] w-[180px] font-bold border border-[#ebebeb]">
                            ACTION
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <Items currentItems={currentItems} />
                </tbody>
            </table>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
                nextClassName="next-button"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                pageClassName="number"
                previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
                previousClassName="previous-button"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
            />
        </div>
    );
}

export default TableProduct;
