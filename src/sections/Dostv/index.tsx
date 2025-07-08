import Slider from 'react-slick';
import './index.css';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
// import axios from "axios";
// import { config } from "../../config/config";

const DostV: React.FC = () => {


    // const [data, setData] = useState<any>([]);

    // const loadAsync = () => {
    //     axios.get(`${config.baseUri}/api/load-dostv`).then(res=>{
    //         setData(res.data)
    //     })
    // }

    //const { title, description, featured_image, sectionContent., button_text1, button_text2, button_link2, videos } = sectionContent;
    //this is static for the meantime and will be rebuild in final stage
    
    const sectionContent = {

        title: 'DOSTv',
        description: 'DOSTv is the official weather, science and technology Television program of the Department of Science and Technology (DOST) to communicate Science For The People, promote a culture of science and technology, and raise the aspirations of our youth to pursue careers in Science, Technology, Engineering, and Mathematics (STEM), and be the leaders of the future.',
        featured_image: '/dostv/dostv-banner.png',
       
        videos: [
            {
                "video": "https://youtu.be/BcR-mL_-OMs",
            },
            {
                "video": "https://youtu.be/MMdhubKxB-0"
            },
            {
                'video': 'https://youtu.be/3rprfh8qyuM'
            },
            {
                'video': 'https://youtu.be/-SwZ8_Z0rPA?list=PLOVfEWpFEs5dCinb5bgDHbMuo_-ipRgfK'
            },
           
        ]
    }
    
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        // slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        adaptiveHeight: true,
        autoplaySpeed: 3000
    }

    return (
        <section className='h-[640px] flex my-20'
            style={{
                background: `url(/images/dost-v-background.png)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            
            {/* <img className="absolute top-0 w-full" src="/images/dost-v-background.png" alt="" /> */}
            
            <div className="lg:w-7xl w-full lg:mx-auto flex">
                <div className="flex gap-10 items-center justify-center">
                    {/* Featured Image */}
                    <div className="hidden relative lg:flex lg:w-2/3">
                        <div className="absolute inset-0 bg-cover bg-center blur-md"
                            style={{
                                background: `url(/dostv/dostv-banner.png)`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>

                        <img className="p-10 mx-auto z-1" src={sectionContent.featured_image ?? 'https://fakeimg.pl/600x400/000000/ffffff?text=Image+Placeholder'} alt="" />
                    </div>
                    
                    <div className="lg:w-1/3 w-full text-center py-2">
                        <h2 className="text-2xl font-bold text-white lg:text-[40px] lg:text-left">DOST<span className="text-blue-500">v</span></h2>
                        <p className="mx-2 text-white my-2 lg:text-left lg:my-p40">{sectionContent.description}</p>
                        
                        <div className="mx-auto w-[380px]">
                            <Slider
                                className=""
                                {...settings}>
                                {sectionContent.videos?.map((video, index) => (
                                    <div key={video.video + index}>
                                        <ReactPlayer
                                            className="react-player"
                                            width={380}
                                            style={{
                                               
                                                maxHeight: "240px",
                                            }}
                                            url={video.video}
                                            controls={true} />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        <div className="flex lg:flex-row flex-col mx-2 lg:justify-center mt-8 gap-4">
                            <Link className='text-white font-bold bg-blue-400 px-6 py-3' target="_blank" to='https://dostv.ph'>Learn More</Link>
                            <Link className='font-bold text-white px-6 py-3 border-2 border-white lg:mx-0' target="_blank" to="https://www.youtube.com/@DOSTvPH">Visit Youtube</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DostV;