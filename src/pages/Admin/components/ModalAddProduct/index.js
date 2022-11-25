import { useState } from 'react';
import { v4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { addDocument } from '~/utils/manageData';

function ModalAddProduct({ setIsOpenModalCreate }) {
    const [imageURL, setImageURL] = useState('');
    const [name, setName] = useState('');
    const [pet, setPet] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleCreateProduct = () => {
        if (imageURL.trim() && name.trim() && pet.trim() && brand.trim() && price.trim() && quantity.trim()) {
            addDocument('products', {
                id: v4(),
                name: name,
                pet: pet,
                brand: brand,
                imageURL: imageURL,
                price: Number(price),
                quantity: Number(quantity),
                sold: 0,
                vote: 5,
                isSoldOut: false,
            });
            setIsOpenModalCreate(false);
        }
    };

    return (
        <div className="fixed z-10 top-0 left-0 right-0 bottom-0">
            <div className="flex h-[100%] items-center justify-center">
                <div className="relative w-[40%] p-[20px] border-[1px] border-solid border-[#ccc] bg-[#fff]">
                    <h3 className="text-[20px] font-semibold text-center mb-[14px]">New product</h3>
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
                        onClick={handleCreateProduct}
                        className="cursor-pointer flex justify-center items-center text-[20px] font-medium w-full text-center h-[32px] mt-[12px] mb-[10px] border-[1px] border-solid border-[#16a3b7] hover:opacity-90"
                    >
                        Create
                    </div>
                    <div
                        onClick={() => setIsOpenModalCreate(false)}
                        className="absolute top-[14px] right-[14px] cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faX} className="p-[4px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAddProduct;
