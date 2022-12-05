import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from '~/components/Card';
import { useProducts } from '~/hooks';

function Items({ currentItems }) {
    return <>{currentItems && currentItems.map((item) => <Card key={item.id} product={item} />)}</>;
}

function CardList({ itemsPerPage }) {
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
            <div className="flex flex-wrap mx-[-10px] mt-[20px]">
                <Items currentItems={currentItems} />
            </div>
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

export default CardList;
