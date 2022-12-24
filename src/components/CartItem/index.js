import { useState, useLayoutEffect, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { updateDocument, deleteFieldsDoc } from '~/utils/manageData';
import { useProducts } from '~/hooks';

function CartItem({ product }) {
    const { productsChoosed } = useProducts();
    const [count, setCount] = useState(product.count);

    const total = useMemo(() => {
        return Math.round(product.count * product.price * 100) / 100;
    }, [product]);

    useLayoutEffect(() => {
        if (count <= 0) {
            setCount(1);
        }
    }, [count, setCount]);
    useEffect(() => {
        const currentItem = productsChoosed.find((item) => item.id === product.id);
        updateDocument('carts', `${currentItem.id}`, { count: count });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const handleDelete = (id) => {
        deleteFieldsDoc('carts', id, 'uid');
    };

    return (
        <tr className="border border-[#ebebeb] h-[138px]">
            <td className="text-[15px] w-[138px] font-bold border border-[#ebebeb] p-[8px]">
                <img src={product.imageURL} alt={product.brand} className="w-[100%]" />
            </td>
            <td className="text-[14px] w-[138px] font-normal leading-[26px] border border-[#ebebeb] p-[8px]">
                <span>{product.name}</span>
            </td>
            <td className="text-[20px] w-[138px] font-normal leading-[26px] border border-[#ebebeb] p-[8px]">
                <span className="block text-center w-[100%]">{product.price}</span>
            </td>
            <td className="text-[20px] w-[138px] font-normal leading-[26px] border border-[#ebebeb] p-[8px]">
                <p className="flex items-center justify-center py-[1px]">
                    <FontAwesomeIcon
                        onClick={() => setCount((prev) => prev - 1)}
                        className="p-[8px] bg-[#eee] text-[12px] cursor-pointer"
                        icon={faMinus}
                    />{' '}
                    <span className="mx-[10px] text-[16px]">{product.count}</span>{' '}
                    <FontAwesomeIcon
                        onClick={() => setCount((prev) => prev + 1)}
                        className="p-[8px] bg-[#eee] text-[12px] cursor-pointer"
                        icon={faPlus}
                    />
                </p>
            </td>
            <td className="text-[20px] w-[138px] font-normal leading-[26px] border border-[#ebebeb] p-[8px]">
                <span className="block text-center w-[100%]">{total}</span>
            </td>
            <td className="text-[20px] w-[138px] text-center font-normal leading-[26px] border border-[#ebebeb] p-[8px]">
                <FontAwesomeIcon
                    onClick={() => handleDelete(product.id)}
                    className="p-[4px] text-[18px] cursor-pointer"
                    icon={faTrashCan}
                />
            </td>
        </tr>
    );
}

export default CartItem;
