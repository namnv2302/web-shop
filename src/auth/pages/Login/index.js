import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import images from '~/assets/images';
import { signInWithGoogle, signInWithFacebook, logInWithEmailAndPassword } from '~/services/auth';

function Login() {
    const { t } = useTranslation(['Login', 'Common']);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (email, password) => {
        const user = await logInWithEmailAndPassword(email, password);
        if (Object.keys(user).length) {
            navigate('/shop');
            toast.success(t('Success.Login'));
        }
        if (user.uid === 'bZ7IEtsdnifP67VxY2sVWdklXxT2') {
            navigate('/admin');
        }
    };

    const handleSignInWithGoogle = async () => {
        await signInWithGoogle();
        navigate('/shop');
        toast.success(t('Success.Login'));
    };

    const handleSignInWithFacebook = async () => {
        await signInWithFacebook();
        navigate('/shop');
        toast.success(t('Success.Login'));
    };

    return (
        <div className="mt-[80px]">
            <div className="h-[46px] bg-[#f3f4f6] text-center leading-[46px]">{t('Breadcrumb')}</div>
            <div className="flex justify-center items-center mt-[100px]">
                <div className="w-[30%] p-[30px] border-[1px] border-solid border-[#ccc]">
                    <h3 className="text-[24px] font-semibold text-center mb-[14px]">{t('Title')}</h3>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        required
                        autoComplete="off"
                        className="w-full px-[14px] py-[8px] mb-[20px] border-[1px] border-solid border-[#ccc] text-[16px] font-medium"
                        placeholder={t('Form.Placeholder.Email')}
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        required
                        autoComplete="off"
                        className="w-full px-[14px] py-[8px] border-[1px] border-solid border-[#ccc] text-[16px] font-medium"
                        placeholder={t('Form.Placeholder.Password')}
                    />
                    <div
                        onClick={() => handleLogin(email, password)}
                        className="cursor-pointer flex justify-center items-center text-[20px] font-medium w-full text-center h-[42px] mt-[22px] mb-[18px] border-[1px] border-solid border-[#16a3b7] hover:opacity-90"
                    >
                        {t('Login')}
                    </div>
                    <div
                        onClick={() => navigate('/register')}
                        className="cursor-pointer flex justify-center items-center text-[20px] text-center font-medium w-full h-[42px] border-[1px] border-solid border-[#000] hover:opacity-90"
                    >
                        {t('Register')}
                    </div>
                    <div className="flex items-center justify-center mt-[20px]">
                        <div className="flex items-center">
                            <span className="text-[16px] font-medium">{t('Helper.Text')}</span>
                            <div className="block" onClick={handleSignInWithGoogle}>
                                <img src={images.iconGoogle} alt="Google" className="ml-[8px] cursor-pointer" />
                            </div>
                            <div className="block" onClick={handleSignInWithFacebook}>
                                <img
                                    src={images.iconFacebook}
                                    alt="Facebook"
                                    className="ml-[8px] w-[22px] h-[22px] cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
