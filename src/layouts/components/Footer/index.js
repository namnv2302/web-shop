import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import icons from '~/assets/icons';

function Footer() {
    const { t } = useTranslation('Common');
    return (
        <Fragment>
            <div className="flex justify-center items-center w-[100%] py-[80px] bg-[#f4f4f4]">
                <div className="container flex justify-between">
                    <div className="w-[25%] px-[16px]">
                        <h4 className="text-[18px] font-semibold uppercase text-[#555] mb-[25px]">
                            {t('Footer.About.Title')}
                        </h4>
                        <p className="text-[14px] text-[#000] leading-[24px] text-justify mb-[25px]">
                            Lorem ipsum dolor sit amet, co adipisi elit, sed eiusmod tempor incididunt ut labore et
                            dolore
                        </p>
                        <div className="flex items-center">
                            <span className="mr-[8px] pr-[5px] cursor-pointer">
                                <img src={icons.facebook} alt="facebook" className="w-[16px] h-[16px]" />
                            </span>
                            <span className="mr-[8px] pr-[5px] cursor-pointer">
                                <img src={icons.insta} alt="insta" className="w-[16px] h-[16px]" />
                            </span>
                            <span className="mr-[8px] pr-[5px] cursor-pointer">
                                <img src={icons.skype} alt="skype" className="w-[16px] h-[16px]" />
                            </span>
                        </div>
                    </div>
                    <div className="w-[25%] px-[16px]">
                        <h4 className="text-[18px] font-semibold text-[#555] uppercase mb-[25px]">
                            {t('Footer.Useful.Title')}
                        </h4>
                        <p className="text-[14px] text-[#000] leading-[24px] text-justify mb-[10px]">
                            {t('Footer.Useful.List.Item1')}
                        </p>
                        <p className="text-[14px] text-[#000] leading-[24px] text-justify mb-[10px]">
                            {t('Footer.Useful.List.Item2')}
                        </p>
                        <p className="text-[14px] text-[#000] leading-[24px] text-justify mb-[10px]">
                            {t('Footer.Useful.List.Item3')}
                        </p>
                        <p className="text-[14px] text-[#000] leading-[24px] text-justify mb-[10px]">
                            {t('Footer.Useful.List.Item4')}
                        </p>
                    </div>
                    <div className="w-[25%] px-[16px]">
                        <h4 className="text-[18px] font-semibold text-[#555] uppercase mb-[25px]">
                            {t('Footer.Help.Title')}
                        </h4>
                        <p className="text-[14px] text-[#000] leading-[24px] text-justify mb-[10px]">
                            {t('Footer.Help.Wishlist')}
                        </p>
                        <p className="text-[14px] text-[#000] leading-[24px] text-justify mb-[10px]">
                            {t('Footer.Help.PricingPlans')}
                        </p>
                        <p className="text-[14px] text-[#000] leading-[24px] text-justify mb-[10px]">
                            {t('Footer.Help.OrderTraking')}
                        </p>
                        <p className="text-[14px] text-[#000] leading-[24px] text-justify mb-[10px]">
                            {t('Footer.Help.Returns')}
                        </p>
                    </div>
                    <div className="w-[25%] px-[16px]">
                        <h4 className="text-[18px] font-semibold text-[#555] uppercase mb-[25px]">
                            {t('Footer.Send.Title')}
                        </h4>
                        <p className="text-[14px] text-[#000] leading-[24px] text-justify mb-[20px]">
                            {t('Footer.Send.Desc')}
                        </p>
                        <div className="relative w-[100%] h-[45px] bg-[#fff] rounded-[50px]">
                            <input
                                type="text"
                                placeholder="demo@example.com"
                                className="h-[100%] w-[100%] pr-[100px] pl-[16px] rounded-[45px] outline-[#F6AB49]"
                            />
                            <button className="absolute right-[5px] top-[50%] translate-y-[-50%] bg-[#F6AB49] text-[#fff] rounded-[50px] font-semibold px-[15px] py-[5px]">
                                {t('Footer.Send.Button')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center w-[100%] py-[20px] bg-[#ebebeb]">
                <div className="container flex justify-between px-[16px]">
                    <div className="w-[50%]">
                        <h4 className="text-[14px] text-[#000]">
                            © 2022 <span className="text-[16px] font-semibold">Petdy</span> {t('Footer.Copyright')} NVN.
                        </h4>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Footer;
