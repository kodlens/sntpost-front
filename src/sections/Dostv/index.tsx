import React from "react";
import Slider from 'react-slick';
import './index.css';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';

const DostV: React.FC = () => {

    //const { title, description, featured_image, sectionContent., button_text1, button_text2, button_link2, videos } = sectionContent;


    //this is static for the meantime and will be rebuild in final stage
    
    const sectionContent = {

        title: 'DOSTv',
        description: 'DOSTv is the official weather, science and technology Television program of the Department of Science and Technology (DOST) to communicate Science For The People, promote a culture of science and technology, and raise the aspirations of our youth to pursue careers in Science, Technology, Engineering, and Mathematics (STEM), and be the leaders of the future.',
        featured_image: '/dostv/dostv-banner.png',
        button_text1: 'Learn More',
        button_link1: 'https://dostv.ph/',
        button_text2: 'Visit Youtube',
        button_link2: 'https://www.youtube.com/@DOSTvPH',
        videos: [
            {
                "video": "https://youtu.be/BcR-mL_-OMs",
            },
            {
                "video": "https://youtu.be/MMdhubKxB-0"
            },
            {
                // "video": "https://www.dostv.ph/video/dost-report-189"
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
        <section className='dostv-section relative'>
            <img className="absolute h-full w-full top-0 object-fit" src="/images/dost-v-background.png" alt="" />
            <div className="relative w-full z-30 max-w-1440 mx-auto">
                <div className="py-p39 px-p25 lg:px-p100 lg:py-p100">
                    <div className="flex z-30 overflow-x-hidden">
                        {/* Featured Image */}
                        <div className="hidden lg:mr-p50 lg:w-2/3 lg:flex lg:items-center relative  lg:justify-center">

                            <div className="absolute inset-0 bg-cover bg-center blur-md box-border"
                                style={{
                                    background: `url(/dostv/dostv-banner.png)`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}></div>

                            <img className="shadow-lg lg:w-[90%] mx-auto z-1" src={sectionContent.featured_image ?? 'https://fakeimg.pl/600x400/000000/ffffff?text=Image+Placeholder'} alt="" />
                        </div>
                        
                        <div className="w-full text-center py-2 lg:w-1/3">
                            <h2 className="text-title font-bold text-white lg:text-[40px] lg:text-left">{sectionContent.title?.substring(0, sectionContent.title?.length - 1)}<span className="text-accent">{sectionContent.title?.substring(sectionContent.title?.length - 1)}</span></h2>
                            <p className="text-white text-xs font-normal my-p24 lg:text-left lg:my-p40">{sectionContent.description}</p>
                            
                            <Slider
                                className="w-full"
                                {...settings}>
                                {sectionContent.videos?.map((video, index) => (
                                    <div key={video.video + index}>
                                        <ReactPlayer
                                            className="react-player max-w-full !w-full"
                                            style={{
                                                maxHeight: "200px",
                                            }}
                                            url={video.video}
                                            controls={true} />
                                    </div>
                                ))}
                            </Slider>

                            <div className="w-full flex lg:flex-col xl:flex-row justify-center mt-p90 lg:mt-p40 lg:justify-start">
                                <Link className='mx-p10 py-p10 px-p20 text-white font-bold text-xs bg-accent3 lg:mx-0 xl:mr-p20 lg:mb-p20 xl:mb-0' target="_blank" to={sectionContent.button_link1 ?? '#'}>{sectionContent.button_text1}</Link>
                                <Link className='mx-p10 py-p10 px-p20 text-white font-bold text-xs border-2 border-white lg:mx-0' target="_blank" to={sectionContent.button_link2 ?? '#'}>{sectionContent.button_text2}</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DostV;