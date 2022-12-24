import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGauge,
    faCartShopping,
    faCreditCard,
    faLocationDot,
    faUser,
    faSignOut,
    faPenToSquare,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks';
import { logout } from '~/services/auth';
import Content from './components/Content';
import OrderList from './components/OrderList';
import FormInfo from './components/FormInfo';
import FormPassword from './components/FormPassword';

function Profile() {
    const navigate = useNavigate();
    const { setUser, user } = useAuth();
    const [tabIndex, setTabIndex] = useState(1);

    const getFirstName = (name) => {
        if (name) {
            const indexName = name.lastIndexOf(' ');
            const firstName = name.slice(indexName);
            return firstName;
        }
    };

    const handleChangeTab = (index) => {
        setTabIndex(index);
    };

    const handleLogout = () => {
        navigate('/logout');
        logout();
        setUser({});
    };

    return (
        <div className="mt-[80px]">
            <div className="h-[46px] bg-[#f3f4f6] text-center leading-[46px]">Home / Profile</div>
            <div className="flex justify-center mt-[100px] mx-auto">
                <div className="container flex justify-between items-start px-[16px]">
                    <div className="w-[20%]">
                        <ul className="w-full">
                            <li
                                onClick={() => handleChangeTab(1)}
                                className={
                                    tabIndex === 1
                                        ? 'hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#fff] font-semibold border border-[#ebebeb] bg-[#F6AB49]'
                                        : 'hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#000] font-semibold border border-[#ebebeb]'
                                }
                            >
                                <FontAwesomeIcon icon={faGauge} />
                                <span className="ml-[10px]">Dashboard</span>
                            </li>
                            <li
                                onClick={() => handleChangeTab(2)}
                                className={
                                    tabIndex === 2
                                        ? 'hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#fff] font-semibold border border-[#ebebeb] bg-[#F6AB49]'
                                        : 'hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#000] font-semibold border border-[#ebebeb]'
                                }
                            >
                                <FontAwesomeIcon icon={faCartShopping} />
                                <span className="ml-[10px]">Orders</span>
                            </li>
                            <li
                                onClick={() => handleChangeTab(3)}
                                className={
                                    tabIndex === 3
                                        ? 'hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#fff] font-semibold border border-[#ebebeb] bg-[#F6AB49]'
                                        : 'hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#000] font-semibold border border-[#ebebeb]'
                                }
                            >
                                <FontAwesomeIcon icon={faCreditCard} />
                                <span className="ml-[10px]">Payment Method</span>
                            </li>
                            <li
                                onClick={() => handleChangeTab(4)}
                                className={
                                    tabIndex === 4
                                        ? 'hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#fff] font-semibold border border-[#ebebeb] bg-[#F6AB49]'
                                        : 'hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#000] font-semibold border border-[#ebebeb]'
                                }
                            >
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span className="ml-[10px]">Address</span>
                            </li>
                            <li
                                onClick={() => handleChangeTab(5)}
                                className={
                                    tabIndex === 5
                                        ? 'hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#fff] font-semibold border border-[#ebebeb] bg-[#F6AB49]'
                                        : 'hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#000] font-semibold border border-[#ebebeb]'
                                }
                            >
                                <FontAwesomeIcon icon={faUser} />
                                <span className="ml-[10px]">Account Details</span>
                            </li>
                            <li
                                onClick={() => handleChangeTab(6)}
                                className={
                                    tabIndex === 6
                                        ? 'hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#fff] font-semibold border border-[#ebebeb] bg-[#F6AB49]'
                                        : 'hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#000] font-semibold border border-[#ebebeb]'
                                }
                            >
                                <FontAwesomeIcon icon={faLock} />
                                <span className="ml-[10px]">Password</span>
                            </li>
                            <li
                                onClick={handleLogout}
                                className="hover:bg-[#F6AB49] hover:text-[#fff] cursor-pointer py-[10px] px-[18px] text-[#000] font-semibold border border-[#ebebeb] border-t-0"
                            >
                                <FontAwesomeIcon icon={faSignOut} />
                                <span className="ml-[10px]">Logout</span>
                            </li>
                        </ul>
                    </div>
                    <div className="w-[80%] ml-[30px]">
                        {tabIndex === 1 && (
                            <Content title="Dashboard">
                                <p className="text-[16px] text-[#555] mb-[5px]">
                                    Hello, <span className="text-[#F6AB49] font-semibold">{user.displayName}</span> (If
                                    Not{' '}
                                    <span className="text-[#F6AB49] font-semibold">
                                        {getFirstName(user.displayName)} !
                                    </span>{' '}
                                    Logout)
                                </p>
                                <p className="text-[16px] text-[#555]">
                                    From your account dashboard. you can easily check & view your recent orders, manage
                                    your shipping and billing addresses and edit your password and account details.
                                </p>
                            </Content>
                        )}
                        {tabIndex === 2 && (
                            <Content title="Orders">
                                <OrderList itemsPerPage={5} />
                            </Content>
                        )}
                        {tabIndex === 3 && (
                            <Content title="Payment Method">
                                <p className="text-[#666666] p-[20px] font-semibold rounded-t-[5px] rounded-r-[5px] bg-[#ebebeb] border-t-[3px] border-t-[#f6ab49]">
                                    You Can't Saved Your Payment Method yet.
                                </p>
                            </Content>
                        )}
                        {tabIndex === 4 && (
                            <Content title="Billing Address">
                                <p className="text-[#555] font-semibold mb-[16px]">Alex Aya</p>
                                <p className="mb-[16px]">
                                    1234 Market ##, Suite 900 <br /> Lorem Ipsum, ## 12345
                                </p>
                                <p>Mobile: (123) 123-456789</p>
                                <button className="flex items-center mt-[16px] py-[12px] px-[30px] bg-[#000] text-[#fff] text-[14px] font-semibold">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                    <span className="ml-[10px]">Edit Address</span>
                                </button>
                            </Content>
                        )}
                        {tabIndex === 5 && (
                            <Content title="Account Details">
                                <FormInfo />
                            </Content>
                        )}
                        {tabIndex === 6 && (
                            <Content title="Password change">
                                <FormPassword />
                            </Content>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
