import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '~/hooks';
import { updatePwd } from '~/services/auth';

function FormPassword() {
    const { user, setUser } = useAuth();
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
            }
            setIsEdit(false);
        } else {
            setIsEdit(true);
        }
    };

    return (
        <form>
            <div className="flex flex-col w-[100%] mt-[15px]">
                <label htmlFor="current-pwd" className="font-semibold text-[14px] text-[#555] mb-[10px]">
                    Current Password
                </label>
                <input
                    id="current-pwd"
                    type="password"
                    value={currentPassword}
                    disabled={!isEdit}
                    autoComplete="off"
                    placeholder="Current Password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="py-[10px] px-[10px] text-[14px] border border-[#ebebeb]"
                />
            </div>
            <div className="flex flex-col w-[100%] mt-[15px]">
                <label htmlFor="new-pwd" className="font-semibold text-[14px] text-[#555] mb-[10px]">
                    New Password
                </label>
                <input
                    id="new-pwd"
                    type="password"
                    value={newPassword}
                    disabled={!isEdit}
                    autoComplete="off"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="py-[10px] px-[10px] text-[14px] border border-[#ebebeb]"
                />
            </div>
            <div className="flex items-center mt-[22px]">
                <button
                    onClick={(e) => handleUpdatePassword(newPassword, e)}
                    className="w-[202px] h-[46px] bg-[#F6AB49] text-[#fff] font-semibold"
                >
                    {isEdit ? 'Save Changes' : 'Update'}
                </button>
            </div>
        </form>
    );
}

export default FormPassword;
