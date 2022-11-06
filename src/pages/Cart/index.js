import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';
import { CartIcon } from '~/components/Icons';
import { useProducts, useAuth } from '~/hooks';
import CartItem from '~/components/CartItem';
import OrderPlaced from '~/components/OrderPlaced';
import { UserIcon } from '~/components/Icons';
import { addDocument, deleteFieldsDoc } from '~/utils/manageData';

function Cart() {
    const { productsChoosed } = useProducts();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const total = useMemo(() => {
        const result = productsChoosed.reduce((result, item) => {
            return result + item.price * item.count;
        }, 0);
        return result;
    }, [productsChoosed]);

    const handleOrder = () => {
        const orderList = [...productsChoosed];
        addDocument('order', {
            id: v4(),
            items: orderList,
            total: total,
        });
        orderList.forEach((item) => {
            deleteFieldsDoc('cart', `${item.id}`, 'uid');
        });
        setIsOrderPlaced(true);
        toast.success('Order placed successfully');
    };

    return (
        <div className="mt-[80px]">
            <div className="h-[34px] bg-[#f3f4f6] text-center leading-[34px]">Home / Cart</div>

            {!isOrderPlaced ? (
                Object.keys(user).length ? (
                    productsChoosed.length > 0 ? (
                        <div className="flex justify-center mt-[16px]">
                            <div className="w-[482px] p-[16px]">
                                <p className="text-[16px] font-normal mb-[10px]">
                                    <span className="text-[18px] font-medium">Cart</span> ({productsChoosed.length}{' '}
                                    items)
                                </p>
                                {productsChoosed.length &&
                                    productsChoosed.map((product) => <CartItem key={product.id} product={product} />)}
                            </div>
                            <div className="w-[280px] p-[16px]">
                                <p className="text-[18px] font-medium mb-[10px]">Price details</p>
                                <p className="flex items-center justify-between text-[16px] mt-[8px]">
                                    <span>Price</span>
                                    <span>{total}</span>
                                </p>
                                <p className="flex items-center justify-between text-[16px] mt-[8px]">
                                    <span>Discount</span>
                                    <span>0</span>
                                </p>
                                <p className="flex items-center justify-between text-[16px] mt-[8px] pb-[12px] border-b border-solid">
                                    <span>Shipping</span>
                                    <span>FREE</span>
                                </p>
                                <p className="flex items-center justify-between text-[18px] font-semibold mt-[8px]">
                                    <span className="">Total</span>
                                    <span>{total}</span>
                                </p>
                                <button
                                    onClick={handleOrder}
                                    className="w-[100%] h-[42px] rounded-[6px] bg-[#000] text-[#fff] mt-[28px]"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center mt-[240px] font-medium">
                            <div className="flex items-center justify-center w-[74px] h-[74px] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.05)] border">
                                <CartIcon />
                            </div>
                            <span className="mt-[10px]">Your cart is empty</span>
                        </div>
                    )
                ) : (
                    <div className="flex flex-col justify-center items-center mt-[160px] font-medium">
                        <div className="flex items-center justify-center w-[74px] h-[74px] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.05)] border">
                            <UserIcon />
                        </div>
                        <span className="text-[24px] text-[#333] font-semibold mt-[24px]">Please Sign In</span>
                        <span className="mt-[10px]">Sign In to view items in your cart</span>
                        <div
                            onClick={() => navigate('/login')}
                            className="flex items-center justify-center mt-[30px] text-[#fff] bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] w-[136px] h-[48px] rounded-[10px] shadow-[0_0_12px_rgba(0,0,0,0.24)] cursor-pointer"
                        >
                            Sign In
                        </div>
                    </div>
                )
            ) : (
                <OrderPlaced />
            )}
            <ToastContainer autoClose={1000} />
        </div>
    );
}

export default Cart;
