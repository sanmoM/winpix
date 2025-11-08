import Banner from '@/components/shared/banner';
import Button from '@/components/shared/buttons/button';
import CustomSlider from '../../shared/custom-slider/CustomSlider';
import "./banner.css";



export default function
  ({ t, sliders }: any) {
  console.log(sliders)
  return (
    <CustomSlider mobileView={1} tabletView={1} desktopView={1}>
      {
        sliders.map((slide, index) => (
          <Banner src={"/storage/" + slide.bg_image} key={index}>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white !text-center p-8">
              <div className={``}>
                <h2 className="title  !text-center text-2xl md:text-5xl lg:text-6xl font-bold">{slide.title}</h2>
                <p className="subtitle text-sm md:text-lg lg:text-xl mt-2 mb-3 lg:mt-4 md:mt-3 md:mb-4 lg:mb-6 text-gray-200  !text-center">{slide.content}</p>
                <Button text={t("home.banner.btnText")} className='px-10 py-2 md:py-3 btn' />
              </div>
            </div>
          </Banner>
        ))
      }
    </CustomSlider>
  )
}

