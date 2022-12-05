import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative mt-[80px] mb-[-100px] flex items-center justify-center h-[600px] bg-[url('https://htmldemo.net/amber/amber/assets/images/slider/slider1-1.png')] bg-cover bg-center bg-no-repeat ">
            <div className="absolute container px-[16px]">
                <h2 className="text-[50px] text-left font-bold">Every pet has unique tastes</h2>
                <p className="text-[22px] font-medium text-left">Welcome to Shop!</p>
                <div className="flex justify-start items-center">
                    <div
                        onClick={() => navigate('/shop')}
                        className="w-[100px] h-[38px] flex items-center justify-center cursor-pointer bg-[#1e1e1e] rounded-[4px] text-[#fff] mt-[20px]"
                    >
                        Buy now
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
