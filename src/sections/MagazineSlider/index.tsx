import { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import '../../../node_modules/swiper/swiper.css';
import '../../../node_modules/swiper/modules/effect-coverflow-element.min.css';
import '../../../node_modules/swiper/modules/navigation.min.css';
import '../../../node_modules/swiper/modules/pagination.min.css';

//import 'swiper/css'

// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';

// import required modules

import { Link } from "react-router-dom";

import axios from "axios";

import './index.css'
import type { Magazine } from "../../types/magazine";
import { config } from "../../config/config";
import Loader from "../../components/Loader";


export default function MagazineSlider() {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [magazines, setMagazines] = useState<Magazine[]>([]);

    
    const loadMagazines = ():void => {
        setLoading(true)
        axios.get<Magazine[]>(`${config.baseUri}/api/magazines/load-magazines`, {
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setMagazines(res.data);
            setLoading(false)
        })
    }

    useEffect(()=>{
        loadMagazines()
    },[])

    
    

    const renderSlides = () => {
        // this is the component image sliding
        const mappedSlides = magazines.map((magazine) => (

            <SwiperSlide key={`${magazine.id}`}>
                <Link to={`/magazines/flipbook/${magazine.slug}`}>
                    <div className="lg:h-[490px] lg:w-full md:h-[320px] h-[540px] relative bg-blue-primary" style={{
                        backgroundImage: `url(${config.baseUri}/storage/magazines/${magazine.cover})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}>
                       
                    </div>
                </Link>
                
            </SwiperSlide>
        ))

        return mappedSlides
    }

       
    return (
        <>
            { loading ? (
                <Loader />
            ) : (
                <section className="w-full mt-15 mb-10">
                    <div className="lg:w-7xl lg:mx-auto mx-2 relative">

                        <div className="font-extrabold tracking-wider text-[1.8rem] lg:text-[2.3rem] text-center mb-6">S&T Post Archives</div>
                        {/* <div className="relative">
                            <div className="slider-title">
                                <h1>S&T Post Archives</h1>
                            </div>
                        </div> */}

                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            pagination={{clickable:true}}
                            centeredSlides={true}
                            navigation={true}
                            loop={true}
                            slidesPerView={1}
                            
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 200,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 3,
                                }
                            }}
                            modules={[Pagination, EffectCoverflow, Navigation]}
                            className="mySwiper"
                        >
                            {renderSlides()}
                        </Swiper>

                        <div className="floating-text font-extrabold lg:text-2xl text-md text-center text-red-600">
                            2022 - 2025
                        </div>

                        <div className="flex">

                            <a href="https://www.stii.dost.gov.ph/projects/s-t-publications/2015-10-28-06-07-25" 
                                target="_blank" rel="noreferrer"
                                className="font-bold text-red-600 ml-auto">
                                <span className="flex items-center">
                                    <span>SEE MORE</span>
                                    <span className="text-red-600">
                                        <svg className="h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                            <title>arrow-right-thin</title>
                                            <path d="M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z" />
                                        </svg>
                                    </span>

                                </span>
                            </a>
                        </div>
                    </div>
                </section>
            )}
        
        </>
    );
        
}