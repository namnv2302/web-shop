import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';
import { CartIcon } from '~/components/Icons';
import { useProducts, useAuth } from '~/hooks';
import CartItem from '~/components/CartItem';
import OrderPlaced from '~/components/OrderPlaced';
import { UserIcon } from '~/components/Icons';
import { addDocument, deleteFieldsDoc, updateDocument } from '~/utils/manageData';
import TotalTable from '~/components/TotalTable';

function Cart() {
    const { t } = useTranslation(['Cart', 'Common']);
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
        addDocument('orders', {
            id: v4(),
            uid: user.uid,
            items: orderList,
            total: total,
        });
        orderList.forEach((item) => {
            deleteFieldsDoc('carts', `${item.id}`, 'uid');
        });
        setIsOrderPlaced(true);
        toast.success(t('Success.Order'));

        orderList.forEach((product) => {
            updateDocument('products', `${product.id}`, {
                sold: product.sold + product.count,
                isSoldOut: product.count + product.sold >= product.quantity ? true : false,
            });
        });
    };

    return (
        <div className="mt-[80px]">
            <div className="h-[46px] bg-[#f3f4f6] text-center leading-[46px]">{t('Breadcrumb')}</div>

            {!isOrderPlaced ? (
                Object.keys(user).length ? (
                    productsChoosed.length > 0 ? (
                        <div className="mt-[80px]">
                            <div className="flex justify-center">
                                <div className="container px-[16px]">
                                    <table className="w-[100%]">
                                        <thead>
                                            <tr className="border border-[#ebebeb] h-[53px]">
                                                <th className="text-[15px] w-[138px] font-bold border border-[#ebebeb]">
                                                    {t('Table.Image')}
                                                </th>
                                                <th className="text-[15px] w-[324px] font-bold border border-[#ebebeb]">
                                                    {t('Table.Product')}
                                                </th>
                                                <th className="text-[15px] w-[162px] font-bold border border-[#ebebeb]">
                                                    {t('Table.Price')}
                                                </th>
                                                <th className="text-[15px] w-[216px] font-bold border border-[#ebebeb]">
                                                    {t('Table.Quantity')}
                                                </th>
                                                <th className="text-[15px] w-[144px] font-bold border border-[#ebebeb]">
                                                    {t('Table.Total')}
                                                </th>
                                                <th className="text-[15px] w-[180px] font-bold border border-[#ebebeb]">
                                                    {t('Table.Delete')}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productsChoosed.length &&
                                                productsChoosed.map((product) => (
                                                    <CartItem key={product.id} product={product} />
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex justify-center mt-[30px]">
                                <div className="container flex justify-end px-[16px]">
                                    <TotalTable total={total} onOrder={handleOrder} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center my-[240px] font-medium">
                            <div className="flex items-center justify-center w-[74px] h-[74px] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.05)] border">
                                <CartIcon />
                            </div>
                            <span className="mt-[10px]">{t('Empty')}</span>
                        </div>
                    )
                ) : (
                    <div className="flex flex-col justify-center items-center mt-[160px] font-medium">
                        <div className="flex items-center justify-center w-[74px] h-[74px] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.05)] border">
                            <UserIcon />
                        </div>
                        <span className="text-[24px] text-[#333] font-semibold mt-[24px]">
                            {t('RequireLogin.Title')}
                        </span>
                        <span className="mt-[10px]">{t('RequireLogin.Description')}</span>
                        <div
                            onClick={() => navigate('/login')}
                            className="flex items-center justify-center mt-[30px] text-[#fff] bg-[#F6AB49] w-[136px] h-[48px] rounded-[10px] shadow-[0_0_12px_rgba(0,0,0,0.24)] cursor-pointer"
                        >
                            {t('RequireLogin.Login')}
                        </div>
                    </div>
                )
            ) : (
                <OrderPlaced />
            )}
        </div>
    );
}

export default Cart;
