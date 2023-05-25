import { useState, useLayoutEffect, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { addDocument, updateDocument } from '~/utils/manageData';
import { useAuth, useProducts } from '~/hooks';
import icons from '~/assets/icons';

function Product() {
    const { t } = useTranslation(['Product', 'Common']);
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { productsChoosed } = useProducts();
    const [stateImage, setStateImage] = useState(() => ({
        backgroundImage: `url(${state.imageURL})`,
        backgroundPosition: '0% 0%',
    }));
    const [count, setCount] = useState(() => {
        const choosedItem = productsChoosed.find((item) => item.id === state.id);
        if (choosedItem) {
            return choosedItem.count;
        } else {
            return 1;
        }
    });

    useLayoutEffect(() => {
        if (count <= 0) {
            setCount(1);
        }
        if (count > state.quantity - state.sold) {
            toast.info(t('MaxQuantity'));
            const still = state.quantity - state.sold;
            setCount(still);
        }
    }, [count, setCount, state.quantity, state.sold, t]);

    useEffect(() => {
        const currentItem = productsChoosed.find((item) => item.id === state.id);
        if (currentItem) {
            updateDocument('carts', `${currentItem.id}`, { count: count });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [count, productsChoosed, state.id]);

    const handleAddCart = () => {
        if (Object.keys(user).length) {
            const choosedItem = productsChoosed.find((item) => item.id === state.id);
            if (choosedItem) {
                updateDocument('carts', `${choosedItem.id}`, { count: choosedItem.count + count });
                toast.success(t('Success.AddCart'));
            } else {
                addDocument('carts', {
                    ...state,
                    count: count,
                    uid: user.uid,
                });
                toast.success(t('Success.AddCart'));
            }
        } else {
            navigate('/login');
        }
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setStateImage({ backgroundImage: `url(${state.imageURL})`, backgroundPosition: `${x}% ${y}%` });
    };

    return (
        <div className="mt-[80px]">
            <div className="h-[46px] bg-[#f3f4f6] text-center leading-[46px]">{t('Breadcrumb')}</div>
            <div className="flex justify-center mt-[100px] mx-auto">
                <div className="container flex justify-between items-center px-[16px]">
                    <div className="w-[30%]">
                        <div className="border border-[#eeeded]">
                            <figure onMouseMove={(e) => handleMouseMove(e)} style={stateImage} className="image-parent">
                                <img
                                    src={state.imageURL}
                                    alt=""
                                    className="w-full block object-cover pointer-events-none"
                                />
                            </figure>
                        </div>
                    </div>
                    <div className="w-[70%] ml-[20px] py-[10px] pl-[40px] cursor-default">
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
                                1,1k <span className="text-[#767676]">{t('Vote')}</span>
                            </span>
                            <span className="ml-[20px]">
                                {state.sold} <span className="text-[#767676]">{t('Sold')}</span>
                            </span>
                        </div>
                        <span className="flex items-center mt-[20px]">
                            <span className="text-[20px] text-[#767676] font-medium">{t('Price')}:</span>
                            <p className="text-[20px] text-[#F7442E] font-semibold ml-[14px]">${state.price}</p>
                            <span className="ml-[30px] text-[20px]">
                                <span className="text-[#767676] font-medium">{t('Brand')}:</span>
                                <span className="font-semibold text-[14px] ml-[10px] text-[#fff] bg-[#f0f07c] p-[4px] rounded-[4px]">
                                    {state.brand}
                                </span>
                                <span className="text-[20px] text-[#767676] font-medium">{state.createdAt.toDate}</span>
                            </span>
                        </span>
                        <div className="flex items-center mt-[20px]">
                            <span>{t('Quantity')}</span>
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
                                {state.quantity - state.sold} {t('Still')}
                            </span>
                        </div>
                        <div className="inline-flex items-center mt-[20px] p-[8px] border-[#F7442E] border-[1px] text-[#F7442E] bg-[#FFEEE8] rounded-[2px] cursor-pointer">
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span onClick={handleAddCart} className="ml-[10px]">
                                {t('Add')}
                            </span>
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <span className="mr-[8px] p-[5px] cursor-pointer">
                                <img src={icons.facebook} alt="facebook" className="w-[16px] h-[16px]" />
                            </span>
                            <span className="mr-[8px] p-[5px] cursor-pointer">
                                <img src={icons.insta} alt="insta" className="w-[16px] h-[16px]" />
                            </span>
                            <span className="mr-[8px] p-[5px] cursor-pointer">
                                <img src={icons.skype} alt="skype" className="w-[16px] h-[16px]" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
