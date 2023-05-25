import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { registerWithEmailAndPassword } from '~/services/auth';

function Register() {
    const { t } = useTranslation(['Register', 'Common']);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (name, email, password) => {
        await registerWithEmailAndPassword(name, email, password);
        navigate('/shop');
        toast.info('Register successfully!');
    };

    return (
        <div className="mt-[80px]">
            <div className="h-[46px] bg-[#f3f4f6] text-center leading-[46px]">{t('Breadcrumb')}</div>
            <div className="flex justify-center items-center mt-[100px]">
                <div className="w-[30%] p-[30px] border-[1px] border-solid border-[#ccc]">
                    <h3 className="text-[24px] font-semibold text-center mb-[14px]">{t('Title')}</h3>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        required
                        autoComplete="off"
                        className="w-full px-[14px] py-[8px] mb-[20px] border-[1px] border-solid border-[#ccc] text-[16px] font-medium"
                        placeholder={t('Form.Placeholder.Fullname')}
                    />
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
                        onClick={() => handleRegister(name, email, password)}
                        className="cursor-pointer flex justify-center items-center text-[20px] font-medium w-full text-center h-[42px] mt-[22px] mb-[18px] border-[1px] border-solid border-[#16a3b7] hover:opacity-90"
                    >
                        {t('Register')}
                    </div>
                    <div
                        onClick={() => navigate('/login')}
                        className="cursor-pointer flex justify-center items-center text-[20px] text-center font-medium w-full h-[42px] border-[1px] border-solid border-[#000] hover:opacity-90"
                    >
                        {t('Login')}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
