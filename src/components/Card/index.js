import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Card({ product }) {
    const navigate = useNavigate();

    const priceOld = useMemo(() => {
        return Math.round((product.price / 0.7) * 100) / 100;
    }, [product.price]);

    const arrayStar = useMemo(() => {
        const array = [];
        for (var i = 0; i < product.vote; i++) {
            array.push(i);
        }
        return array;
    }, [product.vote]);

    const arrayNotStar = useMemo(() => {
        const array = [];
        for (var i = 0; i < 5 - product.vote; i++) {
            array.push(i);
        }
        return array;
    }, [product.vote]);

    return (
        <div className="w-[25%] px-[10px] ">
            <div
                onClick={() => navigate(`/product/${product.id}`, { state: product })}
                className="w-full mt-[10px] shadow-sm border border-[#f1f1f1] border-solid cursor-pointer hover:translate-y-[-1px]"
            >
                <img src={product.imageURL} alt={product.name} className="w-full block object-cover" />
                <div className="flex flex-col justify-between min-h-[134px] p-[10px] bg-white">
                    <h4 className="title-product text-[14px] text-[#333] font-semibold leading-[18px] max-h-[36px] overflow-hidden">
                        {product.name}
                    </h4>
                    <div className="flex items-center justify-between mt-[6px] text-[12px] font-semibold">
                        <span>{product.brand}</span>
                        <span>{product.pet}</span>
                    </div>
                    <div className="mt-[6px]">
                        <span className="text-[14px] text-[#666] line-through">${priceOld}</span>
                        <span className="text-[14px] text-[#f7432e] ml-[10px]">${product.price}</span>
                    </div>
                    <div className="flex items-center justify-between mt-[6px]">
                        <FontAwesomeIcon icon={faHeart} className="text-[14px] text-[#f7432e]" />
                        <div className="flex items-center">
                            <p className="flex items-center text-[#d5d5d5]">
                                {arrayStar.map((item) => (
                                    <FontAwesomeIcon key={item} icon={faStar} className="text-[8px] text-[#ffce3d]" />
                                ))}
                                {arrayNotStar.map((item) => (
                                    <FontAwesomeIcon key={item} icon={faStar} className="text-[8px]" />
                                ))}
                            </p>
                            <span className="text-[12px] ml-[6px] font-semibold">{product.sold} đã bán</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
