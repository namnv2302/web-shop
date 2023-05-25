import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { useAuth, useProducts } from '~/hooks';
import images from '~/assets/images';
import icons from '~/assets/icons';
import { logout } from '~/services/auth';
import { SUPPORTED_LOCALES, SupportedLocale } from '~/constants/locales';

function Header() {
    const { t, i18n } = useTranslation(['Shop', 'Common']);
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

    const handleChangeLang = (value) => {
        i18n.changeLanguage(value);
    };

    const currentLang = SUPPORTED_LOCALES.find(({ value }) => value === i18n.language);

    useEffect(() => {
        if (!currentLang) i18n.changeLanguage(SUPPORTED_LOCALES[0].value);
    }, [currentLang, i18n]);

    return (
        <div className="fixed flex items-center justify-center top-0 left-0 right-0 z-10 bg-[#fff] border-b-[1px] divide-gray-100">
            <div className="container flex items-center">
                <div className="w-[100%] h-[80px] flex justify-between px-[16px] my-[0]">
                    <div className="flex items-center w-[86px]">
                        <ToastContainer autoClose={1500} />
                        <div className="block cursor-pointer" onClick={() => navigate('/')}>
                            <img src={images.logo} alt="Logo" className="block w-full" />
                        </div>
                    </div>
                    <ul className="flex items-center">
                        <li>
                            <div
                                onClick={() => navigate('/')}
                                className="block cursor-pointer min-w-[110px] text-center text-[16px] text-[#555] font-medium px-[18px] py-[4px]"
                            >
                                {t('Navigation.Home')}
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => navigate('/shop')}
                                className="block cursor-pointer min-w-[110px] text-center text-[16px] text-[#555] font-medium px-[18px] py-[4px]"
                            >
                                {t('Navigation.Shop')}
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => navigate('/')}
                                className="block cursor-pointer min-w-[110px] text-center text-[16px] text-[#555] font-medium px-[18px] py-[4px]"
                            >
                                {t('Navigation.Pages')}
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => navigate('/')}
                                className="block cursor-pointer min-w-[110px] text-center text-[16px] text-[#555] font-medium px-[18px] py-[4px]"
                            >
                                {t('Navigation.Blog')}
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => navigate('/')}
                                className="block cursor-pointer min-w-[110px] text-center text-[16px] text-[#555] font-medium px-[18px] py-[4px]"
                            >
                                {t('Navigation.About')}
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => navigate('/')}
                                className="block cursor-pointer min-w-[110px] text-center text-[16px] text-[#555] font-medium px-[18px] py-[4px]"
                            >
                                {t('Navigation.Contact')}
                            </div>
                        </li>
                    </ul>
                    <div className="flex items-center">
                        <div className="flex items-center cursor-pointer">
                            {currentLang.value === SupportedLocale['en-US'] ? (
                                <img
                                    onClick={() => handleChangeLang(SupportedLocale['vi-VN'])}
                                    src={icons.unitedKingdomFlag}
                                    alt="united"
                                    z
                                    className="w-[28px] h-[28px] bg-transparent"
                                />
                            ) : (
                                <img
                                    onClick={() => handleChangeLang(SupportedLocale['en-US'])}
                                    src={icons.vietnamFlag}
                                    alt="vietnamese"
                                    className="w-[28px] h-[28px] bg-transparent"
                                />
                            )}
                        </div>
                        <div onClick={() => navigate('/cart')} className="relative cursor-pointer ml-[24px]">
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
                                            <div className="border-b border-[#eee]">
                                                <span className="absolute top-[-3px] right-0 block h-[3px] w-[40px] bg-[#F6AB49]"></span>
                                                <span className="block mt-[14px] mx-[16px] mb-[4px] font-semibold cursor-default">
                                                    {t('Logined.Welcome')}
                                                </span>
                                                <span
                                                    onClick={() => navigate('/profile')}
                                                    className="flex items-end py-[6px] px-[16px] mb-[10px] cursor-pointer hover:bg-[#f3f4f6]"
                                                >
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
                                                    className="block px-[16px] py-[6px] cursor-pointer hover:bg-[#f3f4f6]"
                                                >
                                                    {t('Logined.Collections')}
                                                </span>
                                                <span
                                                    onClick={() => navigate('/cart')}
                                                    className="block px-[16px] py-[6px] cursor-pointer hover:bg-[#f3f4f6]"
                                                >
                                                    {t('Logined.Cart')}
                                                </span>
                                                <span
                                                    onClick={handleLogout}
                                                    className="block px-[16px] py-[6px] cursor-pointer hover:bg-[#f3f4f6]"
                                                >
                                                    {t('Logined.Logout')}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="absolute z-10 mt-[26px] shadow-md top-[100%] right-0 min-w-[250px] bg-[#fff] rounded-[4px] profile-children text-[14px] font-medium text-[#000] ">
                                            <div className="px-[16px] py-[14px] border-b border-[#eee]">
                                                <span className="absolute top-[-3px] right-0 block h-[3px] w-[40px] bg-[#F6AB49]"></span>
                                                <span className="block mb-[2px] font-semibold">
                                                    {t('NoLogin.Welcome')}
                                                </span>
                                                <span className="block mb-[6px] font-medium">
                                                    {t('NoLogin.Require')}
                                                </span>
                                                <div
                                                    onClick={() => navigate('/login')}
                                                    className="inline-flex items-center justify-center cursor-pointer min-w-[70px] h-[26px] px-[6px] text-[#F6AB49] border border-solid border-[#F6AB49] rounded-[6px]"
                                                >
                                                    {t('NoLogin.Login')}
                                                </div>
                                            </div>

                                            <div className="my-[6px]">
                                                <span
                                                    onClick={() => navigate('/shop')}
                                                    className="block px-[16px] py-[6px] cursor-pointer"
                                                >
                                                    {t('NoLogin.Collections')}
                                                </span>
                                                <span
                                                    onClick={() => navigate('/cart')}
                                                    className="block px-[16px] py-[6px] cursor-pointer"
                                                >
                                                    {t('NoLogin.Cart')}
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
