import Button from '@/components/shared/button';
import CustomSlider from '../../shared/custom-slider/CustomSlider'
import "./banner.css"
import Banner from '@/components/shared/banner';

const slides = [
  {
    imageUrl: "/images/banner-1.jpg",
    title: "Discover Modern Design",
    subtitle: "Sleek, intuitive, and built for the future. Explore our latest collection.",
    buttonClass: "bg-blue-500 hover:bg-blue-600"
  },
  {
    imageUrl: "/images/banner-2.jpg",
    title: "Embrace Nature's Beauty",
    subtitle: "Connect with the outdoors and find your inner peace.",
    buttonClass: "bg-green-500 hover:bg-green-600"
  },
  {
    imageUrl: "/images/banner-3.jpg",
    title: "Urban Adventures Await",
    subtitle: "Experience the vibrant energy of the city like never before.",
    buttonClass: "bg-red-500 hover:bg-red-600"
  },
  {
    imageUrl: "/images/banner-4.jpg",
    title: "Unlock Creative Freedom",
    subtitle: "Tools and inspiration to bring your boldest ideas to life.",
    buttonClass: "bg-purple-500 hover:bg-purple-600"
  }
];



export default function
  () {
  return (
    <CustomSlider mobileView={1} tabletView={1} desktopView={1}>
      {
        slides.map((slide, index) => (
          <Banner src={slide.imageUrl} key={index}>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-center p-8">
              <div className={``}>
                <h2 className="title text-2xl md:text-5xl lg:text-6xl font-bold">{slide.title}</h2>
                <p className="subtitle text-sm md:text-lg lg:text-xl mt-2 mb-3 lg:mt-4 md:mt-3 md:mb-4 lg:mb-6 text-gray-200">{slide.subtitle}</p>
                <Button text="Join Now" className='px-10 py-2 md:py-3 btn' />
              </div>
            </div>
          </Banner>
        ))
      }
    </CustomSlider>
  )
}

