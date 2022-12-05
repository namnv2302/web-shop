import { useEffect, useState, useMemo, createContext } from 'react';
import { useFirestore, useAuth } from '~/hooks';

const ProductsContext = createContext();

function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [productsChoosed, setProductsChoosed] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    const arrayProducts = useFirestore('products');
    useEffect(() => {
        setIsLoading(true);
        if (arrayProducts.length > 0) {
            setProducts(arrayProducts);
            setIsLoading(false);
        }
    }, [arrayProducts]);

    const condition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: `${user.uid}`,
        };
    }, [user.uid]);

    const listProductsChoosed = useFirestore('cart', condition);
    useEffect(() => {
        if (listProductsChoosed) {
            setProductsChoosed(listProductsChoosed);
        }
    }, [listProductsChoosed]);

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
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}

export { ProductsContext };
export default ProductsProvider;
