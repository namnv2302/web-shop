import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import images from '~/assets/images';
import { signInWithGoogle, logInWithEmailAndPassword } from '~/services/auth';
import { useAuth } from '~/hooks';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (Object.keys(user).length) {
            navigate('/shop');
            toast.success('Login successfully!');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleLogin = async (email, password) => {
        const user = await logInWithEmailAndPassword(email, password);
        if (user.uid === '0XDkTIzK7QPwpjX6tffc2062i8q1') {
            navigate('/admin');
        }
    };

    return (
        <div className="mt-[80px]">
            <div className="h-[46px] bg-[#f3f4f6] text-center leading-[46px]">Home / Login</div>
            <div className="flex justify-center items-center mt-[100px]">
                <div className="w-[30%] p-[30px] border-[1px] border-solid border-[#ccc]">
                    <h3 className="text-[24px] font-semibold text-center mb-[14px]">Login now!</h3>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        required
                        autoComplete="off"
                        className="w-full px-[14px] py-[8px] mb-[20px] border-[1px] border-solid border-[#ccc] text-[16px] font-medium"
                        placeholder="Enter email..."
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        required
                        autoComplete="off"
                        className="w-full px-[14px] py-[8px] border-[1px] border-solid border-[#ccc] text-[16px] font-medium"
                        placeholder="Enter password..."
                    />
                    <div
                        onClick={() => handleLogin(email, password)}
                        className="cursor-pointer flex justify-center items-center text-[20px] font-medium w-full text-center h-[42px] mt-[22px] mb-[18px] border-[1px] border-solid border-[#16a3b7] hover:opacity-90"
                    >
                        Login
                    </div>
                    <div
                        onClick={() => navigate('/register')}
                        className="cursor-pointer flex justify-center items-center text-[20px] text-center font-medium w-full h-[42px] border-[1px] border-solid border-[#000] hover:opacity-90"
                    >
                        Register
                    </div>
                    <div className="flex items-center justify-center mt-[20px]">
                        <div className="flex items-center ">
                            <span className="text-[16px] font-medium">Don't have an account</span>
                            <div className="block" onClick={signInWithGoogle}>
                                <img src={images.iconGoogle} alt="Google" className="ml-[8px] cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
