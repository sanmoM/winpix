import Banner from '@/components/shared/banner';
import Button from '@/components/shared/buttons/button';
import useLocales from '@/hooks/useLocales';
import CustomSlider from '../../shared/custom-slider/CustomSlider';
import './banner.css';

export default function ({ t, sliders }: any) {
    const { currentLanguage } = useLocales();
    return (
        <CustomSlider mobileView={1} tabletView={1} desktopView={1}>
            {sliders
                ?.filter((slide: any) => slide.lang === currentLanguage)
                .map((slide, index) => (
                    <Banner src={'/storage/' + slide.bg_image} key={index}>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-8 !text-center text-white">
                            <div className={`max-w-4xl`}>
                                <h2 className="title !text-center text-2xl font-bold md:text-5xl lg:text-6xl">
                                    {slide.title}
                                </h2>
                                <p className="subtitle mt-2 mb-3 !text-center text-sm text-gray-200 md:mt-3 md:mb-4 md:text-lg lg:mt-4 lg:mb-6 lg:text-xl">
                                    {slide.content}
                                </p>
                                <Button
                                    text={t('home.banner.btnText')}
                                    className="btn px-10 py-2 md:py-3"
                                />
                            </div>
                        </div>
                    </Banner>
                ))}
        </CustomSlider>
    );
}
