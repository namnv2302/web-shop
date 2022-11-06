import { useContext } from 'react';
import { ProductsContext } from '~/services/provider/ProductsProvider';

function useProducts() {
    return useContext(ProductsContext);
}

export default useProducts;
