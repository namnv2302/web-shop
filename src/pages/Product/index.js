import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { addDocument, updateDocument } from '~/utils/manageData';
import { useAuth, useProducts } from '~/hooks';

function Product() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { productsChoosed } = useProducts();

    const handleAddCart = () => {
        if (Object.keys(user).length) {
            const choosedItem = productsChoosed.find((item) => item.id === state.id);
            if (choosedItem) {
                updateDocument('cart', `${choosedItem.id}`, { count: choosedItem.count + 1 });
                toast.success('Add to cart successfully!');
            } else {
                addDocument('cart', {
                    ...state,
                    count: 1,
                    uid: user.uid,
                });
                toast.success('Add to cart successfully!');
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="mt-[80px]">
            <div className="h-[34px] bg-[#f3f4f6] text-center leading-[34px]">Home / Product</div>
            <div className="w-[1200px] max-w-[100%] flex justify-center my-[30px] mx-auto">
                <div className="container flex justify-between">
                    <div className="w-[28%]">
                        <ToastContainer autoClose={1000} />
                        <img src={state.imageURL} alt={state.name} className="w-full block object-cover" />
                    </div>
                    <div className="w-[72%] ml-[20px] bg-[#f3f4f6] p-[40px] cursor-default">
                        <h4 className="text-[20px] font-semibold text-[#333]">{state.name}</h4>
                        <div className="flex items-center mt-[18px]">
                            <span className="underline text-[red]">5.0</span>
                            <span className="flex items-end ml-[8px] pr-[10px] border-r-[1px] border-[#ccc]">
                                <FontAwesomeIcon icon={faStar} className="text-[14px] text-[#ee4d2d]" />
                                <FontAwesomeIcon icon={faStar} className="text-[14px] text-[#ee4d2d]" />
                                <FontAwesomeIcon icon={faStar} className="text-[14px] text-[#ee4d2d]" />
                                <FontAwesomeIcon icon={faStar} className="text-[14px] text-[#ee4d2d]" />
                                <FontAwesomeIcon icon={faStar} className="text-[14px] text-[#ee4d2d]" />
                            </span>
                            <span className="ml-[20px] underline">
                                1,1k <span className="text-[#767676]">Vote</span>
                            </span>
                            <span className="ml-[20px]">
                                {state.numberSold} <span className="text-[#767676]">Sold</span>
                            </span>
                        </div>
                        <span className="flex items-center mt-[20px]">
                            <span className="text-[20px] text-[#767676] font-medium">Price:</span>
                            <p className="text-[20px] text-[#F7442E] font-semibold ml-[14px]">{state.price}đ</p>
                            <span className="ml-[30px] text-[20px]">
                                <span className="text-[#767676] font-medium">Brand:</span>
                                <span className="font-semibold text-[14px] ml-[10px] text-[#fff] bg-[#f0f07c] p-[4px] rounded-[4px]">
                                    {state.brand}
                                </span>
                            </span>
                        </span>
                        {/* <div className="flex items-center mt-[20px]">
                            <span className="">Taste</span>
                            <div className="flex ml-[20px]">
                                <span
                                    onClick={() => setChooseTaste('Bò')}
                                    className="cursor-pointer hover:opacity-[0.6] text-[16px] p-[4px] border-[1px] mx-[10px]"
                                >
                                    Bò
                                </span>
                                <span
                                    onClick={() => setChooseTaste('Gà')}
                                    className="cursor-pointer hover:opacity-[0.6] text-[16px] p-[4px] border-[1px] mx-[10px]"
                                >
                                    Gà
                                </span>
                                <span
                                    onClick={() => setChooseTaste('Cá')}
                                    className="cursor-pointer hover:opacity-[0.6] text-[16px] p-[4px] border-[1px] mx-[10px]"
                                >
                                    Cá
                                </span>
                                <span
                                    onClick={() => setChooseTaste('Phô Mai')}
                                    className="cursor-pointer hover:opacity-[0.6] text-[16px] p-[4px] border-[1px] mx-[10px]"
                                >
                                    Phô Mai
                                </span>
                            </div>
                            <span className="ml-[20px] text-[#767676] text-[14px]">
                                {state.numberStill} sản phẩm có sẵn
                            </span>
                        </div>
                        <span>Please select a size</span> */}
                        {/* <div className="flex items-center mt-[20px]">
                            <span>Số lượng</span>
                            <div className="flex items-center ml-[20px] border-[1px]">
                                <div
                                    onClick={() => setCount((prev) => prev - 1)}
                                    className="flex items-center justify-center text-[18px] w-[32px] h-[32px] cursor-pointer border-r-[1px] hover:opacity-[0.6]"
                                >
                                    -
                                </div>
                                <div className="flex items-center justify-center text-[18px] w-[40px] h-[32px]">
                                    {count}
                                </div>
                                <div
                                    onClick={() => setCount((prev) => prev + 1)}
                                    className="flex items-center justify-center text-[18px] w-[32px] h-[32px] cursor-pointer border-l-[1px] hover:opacity-[0.6]"
                                >
                                    +
                                </div>
                            </div>
                            <span className="ml-[20px] text-[#767676] text-[14px]">
                                {state.numberStill} sản phẩm có sẵn
                            </span>
                        </div> */}
                        <div className="inline-flex items-center mt-[20px] p-[8px] border-[#F7442E] border-[1px] text-[#F7442E] bg-[#FFEEE8] rounded-[2px] cursor-pointer">
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span onClick={handleAddCart} className="ml-[10px]">
                                Add to Cart
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
