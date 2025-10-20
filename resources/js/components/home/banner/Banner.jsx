import CustomSlider from '../../shared/custom-slider/CustomSlider'
import "./banner.css"

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
    <CustomSlider mobileView={1} desktopView={1}>
      {
        slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-screen">
            <img src={slide.imageUrl} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-blue-950/50 flex items-center justify-center text-white text-center p-8">
              <div className={``}>
                <h2 className="title text-6xl font-bold">{slide.title}</h2>
                <p className="subtitle text-xl mt-4 mb-6 text-gray-200">{slide.subtitle}</p>
                <a href="#" className={`btn block w-fit mx-auto py-2 px-8 rounded-full ${slide.buttonClass}`}>Join Now</a>
              </div>
            </div>
            {/* <div className='h-screen bg-red-500'></div> */}
          </div>
        ))
      }
    </CustomSlider>
  )
}

