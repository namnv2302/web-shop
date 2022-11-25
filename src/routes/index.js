import Home from '~/pages/Home';
import Shop from '~/pages/Shop';
import Product from '~/pages/Product';
import Cart from '~/pages/Cart';
import Admin from '~/pages/Admin';
import Login from '~/auth/pages/Login';
import Register from '~/auth/pages/Register';
import Logout from '~/auth/pages/Logout';

const publicRoutes = [
    { path: '/shop', component: Shop },
    { path: '/product/:id', component: Product },
    { path: '/cart', component: Cart },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/logout', component: Logout, layout: null },
    { path: '/admin', component: Admin, layout: null },
    { path: '/', component: Home },
];

export { publicRoutes };
