import { useState, useLayoutEffect, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { updateDocument, deleteFieldsDoc } from '~/utils/manageData';
import { useProducts } from '~/hooks';

function CartItem({ product }) {
    const { productsChoosed } = useProducts();
    const [count, setCount] = useState(product.count);

    useLayoutEffect(() => {
        if (count <= 0) {
            setCount(1);
        }
    }, [count]);
    useEffect(() => {
        const currentItem = productsChoosed.find((item) => item.id === product.id);
        updateDocument('cart', `${currentItem.id}`, { count: count });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const handleDelete = (id) => {
        deleteFieldsDoc('cart', id, 'uid');
    };

    return (
        <div className="relative flex border border-solid mb-[16px]">
            <img className="w-[113px] block object-cover" src={product.imageURL} alt={product.name} />
            <div className="p-[8px] pr-[30px] ml-[8px] cursor-default">
                <p className="text-[16px] text-[#000] font-medium">{product.brand}</p>
                <p className="cart-item text-[14px] text-[#777] mt-[8px] leading-[18px] max-h-[18px] overflow-hidden">
                    {product.name}
                </p>
                <div className="flex items-center text-[14px] my-[12px]">
                    <p className="flex items-center py-[1px]">
                        Count:{' '}
                        <FontAwesomeIcon
                            onClick={() => setCount((prev) => prev - 1)}
                            className="p-[4px] bg-[#eee] text-[12px] ml-[8px] cursor-pointer"
                            icon={faMinus}
                        />{' '}
                        <span className="mx-[10px] text-[16px]">{count}</span>{' '}
                        <FontAwesomeIcon
                            onClick={() => setCount((prev) => prev + 1)}
                            className="p-[4px] bg-[#eee] text-[12px] cursor-pointer"
                            icon={faPlus}
                        />
                    </p>
                </div>
                <p className="text-[#000]">
                    {count} <FontAwesomeIcon className="text-[10px] ml-[4px] mr-[8px]" icon={faXmark} />
                    {product.price}
                </p>
            </div>
            <FontAwesomeIcon
                onClick={() => handleDelete(product.id)}
                className="absolute top-[8px] right-[8px] p-[4px] text-[18px] cursor-pointer"
                icon={faXmark}
            />
        </div>
    );
}

export default CartItem;
