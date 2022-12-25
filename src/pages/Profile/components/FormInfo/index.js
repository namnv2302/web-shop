import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '~/hooks';
import { upload } from '~/services/auth';
import images from '~/assets/images';
import { CameraIcon } from '~/components/Icons';

function FormInfo() {
    const { user, setUser } = useAuth();
    const [isEdit, setIsEdit] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [photo, setPhoto] = useState(null);
    const ref = useRef(user.displayName);
    const [photoUrl, setPhotoUrl] = useState(() => {
        return user?.photoURL ? user.photoURL : images.noImage;
    });
    const [displayName, setDisplayName] = useState(() => {
        if (user.displayName) {
            return user.displayName;
        }
    });

    useEffect(() => {
        (photo || displayName) && setIsChange(true);
    }, [photo, displayName]);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            const blobLink = URL.createObjectURL(file);
            setPhotoUrl(blobLink);
        }
    };

    const handleUpdateInfo = async (e) => {
        e.preventDefault();

        if (isEdit) {
            if (isChange) {
                await upload(displayName, photo, setPhotoUrl, user, setUser);
                URL.revokeObjectURL(photoUrl);
                setIsChange(false);
                if (ref.current === displayName) {
                    setIsEdit(false);
                    return;
                }
                toast.info('Update successfully!');
            }
            setIsEdit(false);
        } else {
            setIsEdit(true);
        }
    };

    return (
        <form>
            <div className="flex flex-col w-[100%] mt-[15px]">
                <div className="flex items-center mb-[20px]">
                    <div className="relative overflow-hidden">
                        <div className="w-[80px] h-[80px] cursor-pointer rounded-full overflow-hidden">
                            <img className="w-full h-[80px] object-cover" src={photoUrl} alt={user.displayName} />
                        </div>
                        {isEdit && (
                            <label htmlFor="avatar">
                                <div className="[&:hover>.camera-icon]:opacity-100 transition-all ease-in duration-[0.8s] absolute z-[2] top-0 right-0 bottom-0 left-0 flex items-center justify-center w-[80px] rounded-full bg-[rgba(0,0,0,.54)] cursor-pointer">
                                    <CameraIcon className="camera-icon text-[#fff] text-[36px] opacity-50 w-[50%]" />
                                </div>
                                <div className="absolute w-[0px] opacity-0 bottom-[28px]">
                                    <input
                                        id="avatar"
                                        accept="image/jpg, image/jpeg, image/png"
                                        type="file"
                                        onChange={handleChange}
                                    />
                                </div>
                            </label>
                        )}
                    </div>
                </div>
                <label htmlFor="display-name" className="font-semibold text-[14px] text-[#555] mb-[10px]">
                    Display Name
                </label>
                <input
                    id="display-name"
                    type="text"
                    value={displayName}
                    disabled={!isEdit}
                    autoComplete="off"
                    placeholder="Display Name"
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="py-[10px] px-[10px] text-[14px] border border-[#ebebeb]"
                />
            </div>
            <div className="flex flex-col w-[100%] mt-[15px]">
                <label htmlFor="email" className="font-semibold text-[14px] text-[#555] mb-[10px]">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled={true}
                    autoComplete="off"
                    placeholder="Email Address"
                    className="py-[10px] px-[10px] text-[14px] border border-[#ebebeb]"
                />
            </div>
            <div className="flex items-center mt-[22px]">
                <button
                    onClick={handleUpdateInfo}
                    className="w-[202px] h-[46px] bg-[#F6AB49] text-[#fff] font-semibold"
                >
                    {isEdit ? 'Save Changes' : 'Update'}
                </button>
            </div>
        </form>
    );
}

export default FormInfo;
