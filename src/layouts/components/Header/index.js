import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '~/components/Icons';
import { ToastContainer } from 'react-toastify';
import { useAuth, useProducts } from '~/hooks';
import images from '~/assets/images';
import icons from '~/assets/icons';
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
        <div className="fixed flex items-center justify-center top-0 left-0 right-0 z-10 bg-[#fff] border-b-[1px] divide-gray-100">
            <div className="container flex items-center">
                <div className="w-[100%] h-[80px] flex justify-between px-[16px] my-[0]">
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
                                className="block cursor-pointer text-[16px] text-[#555] font-medium px-[18px] py-[4px]"
                            >
                                Home
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => navigate('/shop')}
                                className="block cursor-pointer text-[16px] text-[#555] font-medium px-[18px] py-[4px]"
                            >
                                Shop
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => navigate('/')}
                                className="block cursor-pointer text-[16px] text-[#555] font-medium px-[18px] py-[4px]"
                            >
                                Pages
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => navigate('/')}
                                className="block cursor-pointer text-[16px] text-[#555] font-medium px-[18px] py-[4px]"
                            >
                                Blog
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => navigate('/')}
                                className="block cursor-pointer text-[16px] text-[#555] font-medium px-[18px] py-[4px]"
                            >
                                About
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => navigate('/')}
                                className="block cursor-pointer text-[16px] text-[#555] font-medium px-[18px] py-[4px]"
                            >
                                Contact
                            </div>
                        </li>
                    </ul>
                    <div className="flex items-center">
                        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                            <img src={icons.cart} alt="cart" className="w-[28px] h-[28px]" />
                            {productsChoosed.length > 0 && (
                                <span className="absolute top-[-8px] right-[-8px] flex items-center justify-center min-w-[18px] min-h-[18px] rounded-full bg-[#F6AB49] text-[#fff] text-[13px]">
                                    {countProduct}
                                </span>
                            )}
                        </div>
                        <div className="ml-[24px]">
                            <div
                                onClick={() => setIsOpenUserOption(!isOpenUserOption)}
                                className="block relative profile"
                            >
                                <div className="cursor-pointer">
                                    <img src={icons.user} alt="user" className="w-[28px] h-[28px]" />
                                </div>
                                {isOpenUserOption &&
                                    (Object.keys(user).length ? (
                                        <div className="absolute z-10 mt-[26px] shadow-md top-[100%] right-0 min-w-[250px] bg-[#fff] rounded-[4px] profile-children text-[14px] font-medium text-[#000] ">
                                            <div className="px-[16px] py-[14px] border-b border-[#eee]">
                                                <span className="absolute top-[-3px] right-0 block h-[3px] w-[40px] bg-[#F6AB49]"></span>
                                                <span className="block mb-[6px] font-semibold">Hello friend!</span>
                                                <span className="flex items-end">
                                                    <img
                                                        className="w-[28px] h-[28px] rounded-full object-cover"
                                                        src={
                                                            user.photoURL !== null
                                                                ? `${user.photoURL}`
                                                                : `${images.noImage}`
                                                        }
                                                        alt=""
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
                                                <span className="absolute top-[-3px] right-0 block h-[3px] w-[40px] bg-[#F6AB49]"></span>
                                                <span className="block mb-[2px] font-semibold">Welcome</span>
                                                <span className="block mb-[6px] font-medium">
                                                    To access wishlist or cart
                                                </span>
                                                <div
                                                    onClick={() => navigate('/login')}
                                                    className="inline-flex items-center justify-center cursor-pointer w-[70px] h-[26px] text-[#F6AB49] border border-solid border-[#F6AB49] rounded-[6px]"
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
        </div>
    );
}

export default Header;
