import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import OrderItem from '../OrderItem';
import { useProducts } from '~/hooks';

function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item, index) => <OrderItem key={item.id} index={index + 1} data={item} />)}
        </>
    );
}

function OrderList({ itemsPerPage }) {
    const { productsOrdered } = useProducts();
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = productsOrdered.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(productsOrdered.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % productsOrdered.length;
        setItemOffset(newOffset);
    };

    return (
        <div>
            <table className="w-[100%]">
                <thead>
                    <tr className="border border-[#787676] h-[42px] bg-[#f8f8f8]">
                        <th className="text-[12px] text-[#3e5569] font-bold border border-[#ebebeb]">Order</th>
                        <th className="text-[12px] text-[#3e5569] font-bold border border-[#ebebeb]">Date</th>
                        <th className="text-[12px] text-[#3e5569] font-bold border border-[#ebebeb]">Status</th>
                        <th className="text-[12px] text-[#3e5569] font-bold border border-[#ebebeb]">Total</th>
                        {/* <th className="text-[12px] text-[#3e5569] font-bold border border-[#ebebeb]">Action</th> */}
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

export default OrderList;
