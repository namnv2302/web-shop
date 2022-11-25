import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { deleteDocument } from '~/utils/manageData';

function ProductItem({ product }) {
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

    const handleDelete = (id) => {
        deleteDocument('products', id);
        setIsOpenModalDelete(false);
    };

    return (
        <Fragment>
            <tr className="border border-[#ebebeb] h-[68px]">
                <td className="text-[12px] w-[138px] font-bold border border-[#ebebeb] p-[8px]">
                    <img src={product.imageURL} alt="" className="w-[40%] mx-auto" />
                </td>
                <td className="text-[12px] text-[#3e5569] text-center w-[138px] font-bold border border-[#ebebeb] p-[8px]">
                    {product.pet}
                </td>
                <td className="text-[12px] text-[#3e5569] text-center w-[138px] font-bold border border-[#ebebeb] p-[8px]">
                    {product.brand}
                </td>
                <td className="text-[12px] text-[#3e5569] text-center w-[138px] font-bold border border-[#ebebeb] p-[8px]">
                    ${product.price}
                </td>
                <td className="text-[12px] text-[#3e5569] text-center w-[138px] font-bold border border-[#ebebeb] p-[8px]">
                    {product.quantity}
                </td>
                <td className="text-[12px] text-[#3e5569] text-center w-[324px] font-bold border border-[#ebebeb] p-[8px]">
                    {product.timeStamp[0]}
                </td>
                <td className="text-[12px] text-[#3e5569] text-center w-[180px] font-bold border border-[#ebebeb] p-[8px]">
                    <span className="flex items-center justify-center">
                        <FontAwesomeIcon icon={faPenNib} className="p-[5px] text-[18px] mr-[16px] cursor-pointer" />
                        <FontAwesomeIcon
                            onClick={() => setIsOpenModalDelete(true)}
                            icon={faTrashCan}
                            className="p-[5px] text-[18px] cursor-pointer"
                        />
                    </span>
                </td>
            </tr>
            {isOpenModalDelete && (
                <div className="fixed top-0 right-0 left-0 flex items-center justify-center bottom-0 bg-rgba-1">
                    <div className="w-[30%] min-h-[198px] p-[16px] rounded-[10px] bg-[#fff] shadow-[0_0_10px_rgba(0,0,0,0.01)]">
                        <h3 className="text-[22px] font-bold text-[#555] mt-[8px]">Confirm</h3>
                        <p className="text-[18px] font-semibold text-[#555] mt-[20px]">Are you sure want delete?</p>
                        <div className="flex items-center justify-end mt-[32px]">
                            <button
                                onClick={() => setIsOpenModalDelete(false)}
                                className="rounded-[4px] px-[12px] py-[4px] text-[16px] text-[#fff] bg-[#333]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="rounded-[4px] px-[12px] py-[4px] text-[16px] text-[#fff] bg-[#D9534F] ml-[8px]"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default ProductItem;
