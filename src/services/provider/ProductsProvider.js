import { useEffect, useState, useMemo, createContext } from 'react';
import { getAllDocuments } from '~/utils/manageData';
import { useFirestore, useAuth } from '~/hooks';

const ProductsContext = createContext();

function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [productsChoosed, setProductsChoosed] = useState([]);
    const [listFilterAnimals, setListFilterAnimals] = useState([]);
    const [listFilterBrands, setListFilterBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        setIsLoading(true);
        getAllDocuments('products')
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch(() => {
                console.error('Fetch data error!');
            });
    }, []);

    useEffect(() => {
        getAllDocuments('filter-animals')
            .then((data) => {
                setListFilterAnimals(data);
            })
            .catch(() => {
                console.error('Fetch data error!');
            });
    }, []);

    useEffect(() => {
        getAllDocuments('filter-brands')
            .then((data) => {
                setListFilterBrands(data);
            })
            .catch(() => {
                console.error('Fetch data error!');
            });
    }, []);

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
                listFilterAnimals,
                listFilterBrands,
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
