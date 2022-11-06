import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartIcon, UserIcon } from '~/components/Icons';
import { ToastContainer } from 'react-toastify';
import { useAuth, useProducts } from '~/hooks';
import images from '~/assets/images';
import { logout } from '~/services/auth';

function Header() {
    const [isOpenUserOption, setIsOpenUserOption] = useState(false);
    const { setUser, user } = useAuth();
    const { productsChoosed } = useProducts();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/logout');
        logout();
        setUser({});
    };

    const countProduct = useMemo(() => {
        const result = productsChoosed.reduce((result, item) => {
            return result + item.count;
        }, 0);
        return result;
    }, [productsChoosed]);

    return (
        <div className="fixed top-0 left-0 right-0 z-10 bg-[#fff] border-b-[1px] divide-gray-100">
            <div className="w-[1200px] max-w-[100%] h-[80px] flex justify-between mx-auto my-[0]">
                <div className="flex items-center w-[86px]">
                    <ToastContainer autoClose={1000} />
                    <div className="block cursor-pointer" onClick={() => navigate('/')}>
                        <img src={images.logo} alt="Logo" className="block w-full" />
                    </div>
                </div>
                <ul className="flex items-center">
                    <li>
                        <div
                            onClick={() => navigate('/')}
                            className="block cursor-pointer text-[20px] font-semibold px-[18px] py-[4px]"
                        >
                            Home
                        </div>
                    </li>
                    <li>
                        <div
                            onClick={() => navigate('/shop')}
                            className="block cursor-pointer text-[20px] font-semibold px-[18px] py-[4px]"
                        >
                            Shop
                        </div>
                    </li>
                    <li>
                        <div
                            onClick={() => navigate('/')}
                            className="block cursor-pointer text-[20px] font-semibold px-[18px] py-[4px]"
                        >
                            Pages
                        </div>
                    </li>
                </ul>
                <div className="flex items-center">
                    <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                        <CartIcon />
                        {productsChoosed.length > 0 && (
                            <span className="absolute top-[-6px] right-[-6px] flex items-center justify-center min-w-[18px] min-h-[18px] rounded-full bg-[#000] text-[#fff] text-[13px]">
                                {countProduct}
                            </span>
                        )}
                    </div>
                    <div className="ml-[24px]">
                        <div onClick={() => setIsOpenUserOption(!isOpenUserOption)} className="block relative profile">
                            <div className="cursor-pointer">
                                <UserIcon />
                            </div>
                            {isOpenUserOption &&
                                (Object.keys(user).length ? (
                                    <div className="absolute z-10 mt-[26px] shadow-md top-[100%] right-0 min-w-[250px] bg-[#fff] rounded-[4px] profile-children text-[14px] font-medium text-[#000] ">
                                        <div className="px-[16px] py-[14px] border-b border-[#eee]">
                                            <span className="absolute top-[-3px] right-0 block h-[3px] w-[40px] bg-[#000]"></span>
                                            <span className="block mb-[6px] font-semibold">Hello friend!</span>
                                            <span className="flex items-end">
                                                <img
                                                    className="w-[28px] h-[28px] rounded-full object-cover"
                                                    src={`${user.photoURL}` || `${images.noImage}`}
                                                    alt={`${user.displayName}`}
                                                />
                                                <span className="ml-[10px]">{user.displayName}</span>
                                            </span>
                                        </div>

                                        <div className="my-[6px]">
                                            <span
                                                onClick={() => navigate('/shop')}
                                                className="block px-[16px] py-[6px] cursor-pointer"
                                            >
                                                Collections
                                            </span>
                                            <span
                                                onClick={() => navigate('/cart')}
                                                className="block px-[16px] py-[6px] cursor-pointer"
                                            >
                                                Cart
                                            </span>
                                            <span
                                                onClick={handleLogout}
                                                className="block px-[16px] py-[6px] cursor-pointer"
                                            >
                                                Logout
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute z-10 mt-[26px] shadow-md top-[100%] right-0 min-w-[250px] bg-[#fff] rounded-[4px] profile-children text-[14px] font-medium text-[#000] ">
                                        <div className="px-[16px] py-[14px] border-b border-[#eee]">
                                            <span className="absolute top-[-3px] right-0 block h-[3px] w-[40px] bg-[#000]"></span>
                                            <span className="block mb-[2px] font-semibold">Welcome</span>
                                            <span className="block mb-[6px] font-medium">
                                                To access wishlist or cart
                                            </span>
                                            <div
                                                onClick={() => navigate('/login')}
                                                className="inline-flex items-center justify-center cursor-pointer w-[70px] h-[26px] text-[#4a00e0] border border-solid border-[#4a00e0] rounded-[6px]"
                                            >
                                                Sign In
                                            </div>
                                        </div>

                                        <div className="my-[6px]">
                                            <span
                                                onClick={() => navigate('/shop')}
                                                className="block px-[16px] py-[6px] cursor-pointer"
                                            >
                                                Collections
                                            </span>
                                            <span
                                                onClick={() => navigate('/cart')}
                                                className="block px-[16px] py-[6px] cursor-pointer"
                                            >
                                                Cart
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
