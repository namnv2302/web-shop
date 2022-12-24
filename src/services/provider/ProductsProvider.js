import { useEffect, useState, useMemo, createContext } from 'react';
import { useFirestore, useAuth } from '~/hooks';

const ProductsContext = createContext();

function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [productsChoosed, setProductsChoosed] = useState([]);
    const [productsOrdered, setProductsOrdered] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    // Lấy danh sách sản phẩm và lắng nghe sự thay đổi
    const arrayProducts = useFirestore('products');
    useEffect(() => {
        setIsLoading(true);
        if (arrayProducts.length > 0) {
            setProducts(arrayProducts);
            setIsLoading(false);
        }
    }, [arrayProducts]);

    // Lấy danh sách sản phẩm đã thêm vào giỏ hàng
    const cartsCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: `${user.uid}`,
        };
    }, [user.uid]);

    const listProductsChoosed = useFirestore('carts', cartsCondition);
    useEffect(() => {
        if (listProductsChoosed) {
            setProductsChoosed(listProductsChoosed);
        }
    }, [listProductsChoosed]);

    // Lấy danh sách sản phẩm đã được đặt
    const ordersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: `${user.uid}`,
        };
    }, [user.uid]);

    const listProductsOrdered = useFirestore('orders', ordersCondition);
    useEffect(() => {
        if (listProductsOrdered) {
            setProductsOrdered(listProductsOrdered);
        }
    }, [listProductsOrdered]);

    return (
        <ProductsContext.Provider
            value={{
                setProducts,
                products,
                setIsLoading,
                isLoading,
                listProductsChoosed,
                productsChoosed,
                setProductsChoosed,
                productsOrdered,
                setProductsOrdered,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}

export { ProductsContext };
export default ProductsProvider;
