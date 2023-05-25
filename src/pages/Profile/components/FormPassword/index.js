import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { updatePwd } from '~/services/auth';

function FormPassword() {
    const { t } = useTranslation('Profile');
    const [isEdit, setIsEdit] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    useEffect(() => {
        newPassword && currentPassword && setIsChange(true);
    }, [newPassword, currentPassword]);

    const handleUpdatePassword = async (newPassword, e) => {
        e.preventDefault();
        if (isEdit) {
            if (isChange) {
                await updatePwd(newPassword, currentPassword);
                setNewPassword('');
                setCurrentPassword('');
                setIsChange(false);
                setIsEdit(false);
            } else {
                setNewPassword('');
                setCurrentPassword('');
                toast.info(t('Require'));
            }
        } else {
            setIsEdit(true);
        }
    };

    return (
        <form>
            <div className="flex flex-col w-[100%] mt-[15px]">
                <label htmlFor="current-pwd" className="font-semibold text-[14px] text-[#555] mb-[10px]">
                    {t('Form.Password.Current')}
                </label>
                <input
                    id="current-pwd"
                    type="password"
                    required
                    value={currentPassword}
                    disabled={!isEdit}
                    autoComplete="off"
                    placeholder={t('Form.Password.Current')}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="py-[10px] px-[10px] text-[14px] border border-[#ebebeb]"
                />
            </div>
            <div className="flex flex-col w-[100%] mt-[15px]">
                <label htmlFor="new-pwd" className="font-semibold text-[14px] text-[#555] mb-[10px]">
                    {t('Form.Password.New')}
                </label>
                <input
                    id="new-pwd"
                    type="password"
                    required
                    value={newPassword}
                    disabled={!isEdit}
                    autoComplete="off"
                    placeholder={t('Form.Password.New')}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="py-[10px] px-[10px] text-[14px] border border-[#ebebeb]"
                />
            </div>
            <div className="flex items-center mt-[22px]">
                <button
                    onClick={(e) => handleUpdatePassword(newPassword, e)}
                    className="w-[202px] h-[46px] bg-[#F6AB49] text-[#fff] font-semibold"
                >
                    {isEdit ? t('Save') : t('Update')}
                </button>
            </div>
        </form>
    );
}

export default FormPassword;
