import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSquarePlus,
    faTableColumns,
    faUser,
    faTable,
    faFaceSmile,
    faBlackboard,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

function Sidebar() {
    return (
        <aside className="">
            <nav>
                <ul>
                    <li>
                        <div className="p-[15px] mt-[20px] flex items-center">
                            <span className="inline-block">
                                <img
                                    src={images.headerLogo}
                                    alt=""
                                    className="w-[40px] h-[40px] rounded-full object-cover"
                                />
                            </span>
                            <div className="ml-[10px] mt-[4px] cursor-pointer">
                                <h4 className="text-[15px] font-semibold text-[#212529] capitalize leading-[16px]">
                                    Nguyen Van Nam
                                </h4>
                                <span className="text-[14px] font-medium text-[#212529] opacity-[0.5]">
                                    namnv1923@gmail.com
                                </span>
                            </div>
                        </div>
                    </li>
                    <li className="p-[15px] cursor-pointer">
                        <span className="flex items-center px-[12px] py-[8px] bg-[#4FC3F7] rounded-[2px]">
                            <FontAwesomeIcon icon={faSquarePlus} className="text-[#fff]" />
                            <span className="text-[15px] text-[#fff] font-medium ml-[10px]">Create New</span>
                        </span>
                    </li>
                    <li className="p-[15px] cursor-pointer">
                        <span className="flex items-center px-[12px] rounded-[2px]">
                            <FontAwesomeIcon icon={faTableColumns} className="text-[#000]" />
                            <span className="text-[15px] text-[#212529] font-medium ml-[10px]">Dashboard</span>
                        </span>
                    </li>
                    <li className="p-[15px] cursor-pointer">
                        <span className="flex items-center px-[12px] rounded-[2px]">
                            <FontAwesomeIcon icon={faUser} className="text-[#000]" />
                            <span className="text-[15px] text-[#212529] font-medium ml-[10px]">Profile</span>
                        </span>
                    </li>
                    <li className="p-[15px] cursor-pointer">
                        <span className="flex items-center px-[12px] rounded-[2px]">
                            <FontAwesomeIcon icon={faTable} className="text-[#000]" />
                            <span className="text-[15px] text-[#212529] font-medium ml-[10px]">Table</span>
                        </span>
                    </li>
                    <li className="p-[15px] cursor-pointer">
                        <span className="flex items-center px-[12px] rounded-[2px]">
                            <FontAwesomeIcon icon={faFaceSmile} className="text-[#000]" />
                            <span className="text-[15px] text-[#212529] font-medium ml-[10px]">Icon</span>
                        </span>
                    </li>
                    <li className="p-[15px] cursor-pointer">
                        <span className="flex items-center px-[12px] rounded-[2px]">
                            <FontAwesomeIcon icon={faBlackboard} className="text-[#000]" />
                            <span className="text-[15px] text-[#212529] font-medium ml-[10px]">Blank</span>
                        </span>
                    </li>
                    <li className="p-[15px] cursor-pointer">
                        <span className="flex items-center px-[12px] rounded-[2px]">
                            <FontAwesomeIcon icon={faTriangleExclamation} className="text-[#000]" />
                            <span className="text-[15px] text-[#212529] font-medium ml-[10px]">404</span>
                        </span>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
