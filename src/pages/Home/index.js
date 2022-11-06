import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <Fragment>
            <div className="relative flex items-center justify-center h-[100vh]">
                <div className="absolute">
                    <h2 className="text-[50px] text-center font-bold">Every pet has unique tastes</h2>
                    <p className="text-[22px] font-medium text-center">Welcome to Shop!</p>
                    <div className="flex justify-center items-center">
                        <div
                            onClick={() => navigate('/shop')}
                            className="w-[100px] h-[38px] flex items-center justify-center cursor-pointer bg-[#1e1e1e] rounded-[4px] text-[#fff] mt-[20px]"
                        >
                            Buy now
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center w-full h-[60px] px-[50px] bg-[#000]">
                <span className="text-[#fff]">© Conpyright 2022 NVN - All Rights Reserved. </span>
                <span className="text-[#fff]">Powered by NVN</span>
            </div>
        </Fragment>
    );
}

export default Home;
