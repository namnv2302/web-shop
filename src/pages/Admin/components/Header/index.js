import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks';
import { logout } from '~/services/auth';
import images from '~/assets/images';

function Header() {
    const navigate = useNavigate();
    const { setAdmin } = useAuth();

    const handleLogout = () => {
        navigate('/logout');
        logout();
        setAdmin({});
    };

    return (
        <div className="h-[64px] px-[16px] bg-[#414755] flex items-center justify-between">
            <div className="w-[250px]">
                <span className="inline-block w-[86px] cursor-pointer">
                    <img src={images.logo} alt="" className="w-[100%]" />
                </span>
            </div>
            <div className="flex flex-1 items-center justify-between h-[100%]">
                <div className="h-[100%] cursor-pointer">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="w-[14px] h-[100%] px-[15px] text-[#fff]" />
                    {/* <div className="fixed top-0 left-0 right-0 h-[64px] bg-[#fff]">
                        <input className="h-[100%]" />
                    </div> */}
                </div>
                <div className="flex items-center justify-center">
                    <button
                        onClick={handleLogout}
                        className="w-[100px] h-[32px] px-[10px] py-[4px] text-[14px] text-[#fff] rounded-[2px] border"
                    >
                        Logout
                    </button>
                    <span className="inline-block px-[15px] ml-[14px] cursor-pointer">
                        <img src={images.headerLogo} alt="" className="w-[31px] h-[31px] rounded-full" />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Header;
