import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

function Header() {
    return (
        <div className="h-[64px] px-[16px] bg-[#414755] flex items-center justify-between">
            <div className="w-[250px]">
                <span className="inline-block w-[86px] cursor-pointer">
                    <img src={images.logo} alt="" className="w-[100%]" />
                </span>
            </div>
            <div className="flex flex-1 items-center justify-between h-[100%]">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-[14px] h-[100%] px-[15px] text-[#fff]" />
                <span className="inline-block px-[15px] cursor-pointer">
                    <img src={images.headerLogo} alt="" className="w-[31px] h-[31px] rounded-full" />
                </span>
            </div>
        </div>
    );
}

export default Header;
