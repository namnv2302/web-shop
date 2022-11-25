import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function OrderPlaced() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center mt-[140px] cursor-default">
            <div className="flex items-center justify-center w-[68px] h-[68px] bg-[#fff] border border-solid border-[#eeeeee] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.05)]">
                <FontAwesomeIcon
                    className="p-[8px] text-[32px] text-[#F6AB49] border-[3px] border-[#F6AB49] rounded-full"
                    icon={faCheck}
                />
            </div>
            <h2 className="text-[24px] text-[#000] font-semibold mt-[20px]">Order placed successfully</h2>
            <span className="text-[16px] text-[#000] mt-[12px]">Thank you for shopping with us</span>
            <span
                onClick={() => navigate('/shop')}
                className="flex items-center justify-center px-[26px] py-[12px] mt-[20px] rounded-[10px] bg-[#F6AB49] text-[16px] text-[#fff] font-semibold shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer"
            >
                Continue Shopping
            </span>
        </div>
    );
}

export default OrderPlaced;
