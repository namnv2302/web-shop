import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenNib, faX } from '@fortawesome/free-solid-svg-icons';
import { updateDocument, deleteDocument } from '~/utils/manageData';

function ProductItem({ product }) {
    const [imageURL, setImageURL] = useState(product.imageURL);
    const [name, setName] = useState(product.name);
    const [pet, setPet] = useState(product.pet);
    const [brand, setBrand] = useState(product.brand);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

    const handleDelete = (id) => {
        deleteDocument('products', id);
        setIsOpenModalDelete(false);
    };

    const handleUpdate = () => {
        setIsOpenModalUpdate(false);
        if (imageURL && name && pet && brand && price && quantity) {
            updateDocument('products', `${product.id}`, {
                imageURL,
                name,
                pet,
                price,
                brand,
                quantity,
            });
        }
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
                        <FontAwesomeIcon
                            onClick={() => setIsOpenModalUpdate(true)}
                            icon={faPenNib}
                            className="p-[5px] text-[18px] mr-[16px] cursor-pointer"
                        />
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
            {isOpenModalUpdate && (
                <div className="fixed z-10 top-0 left-0 right-0 bottom-0">
                    <div className="flex h-[100%] items-center justify-center">
                        <div className="relative w-[40%] p-[20px] border-[1px] border-solid border-[#ccc] bg-[#fff]">
                            <h3 className="text-[20px] font-semibold text-center mb-[14px]">Update product</h3>
                            <input
                                value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                                type="text"
                                required
                                autoComplete="off"
                                className="w-full px-[14px] py-[4px] mb-[12px] border-[1px] border-solid border-[#ccc] text-[16px] font-medium"
                                placeholder="Enter imageURL..."
                            />
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                required
                                autoComplete="off"
                                className="w-full px-[14px] py-[4px] mb-[12px] border-[1px] border-solid border-[#ccc] text-[16px] font-medium"
                                placeholder="Enter name..."
                            />
                            <input
                                value={pet}
                                onChange={(e) => setPet(e.target.value)}
                                type="text"
                                required
                                autoComplete="off"
                                className="w-full px-[14px] py-[4px] mb-[12px] border-[1px] border-solid border-[#ccc] text-[16px] font-medium"
                                placeholder="Enter pet..."
                            />
                            <input
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                type="text"
                                required
                                autoComplete="off"
                                className="w-full px-[14px] py-[4px] mb-[12px] border-[1px] border-solid border-[#ccc] text-[16px] font-medium"
                                placeholder="Enter brand..."
                            />
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type="text"
                                required
                                autoComplete="off"
                                className="w-full px-[14px] py-[4px] mb-[12px] border-[1px] border-solid border-[#ccc] text-[16px] font-medium"
                                placeholder="Enter price..."
                            />
                            <input
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                type="text"
                                required
                                autoComplete="off"
                                className="w-full px-[14px] py-[4px] mb-[12px] border-[1px] border-solid border-[#ccc] text-[16px] font-medium"
                                placeholder="Enter quantity..."
                            />
                            <div
                                onClick={handleUpdate}
                                className="cursor-pointer flex justify-center items-center text-[20px] font-medium w-full text-center h-[32px] mt-[12px] mb-[10px] border-[1px] border-solid border-[#16a3b7] hover:opacity-90"
                            >
                                Update
                            </div>
                            <div
                                onClick={() => setIsOpenModalUpdate(false)}
                                className="absolute top-[14px] right-[14px] cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faX} className="p-[4px]" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default ProductItem;
