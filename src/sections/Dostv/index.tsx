import Slider from 'react-slick';
import './index.css';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { config } from '../../config/config';
import { Loader } from 'lucide-react';

const DostV: React.FC = () => {


    // const [data, setData] = useState<any>([]);

    // const loadAsync = () => {
    //     axios.get(`${config.baseUri}/api/load-dostv`).then(res=>{
    //         setData(res.data)
    //     })
    // }

    //const { title, description, featured_image, sectionContent., button_text1, button_text2, button_link2, videos } = sectionContent;
    //this is static for the meantime and will be rebuild in final stage
    interface Video {
        title?: string;
        description?: string;
        link: string;
    }

    interface DostvData {
        dostv: {
            title:string;
            description: string;
            featured_image: string;
        };

        videos: Video[]
    }

    interface ApiErrorResponse {
        message: string;
        errors?: Record<string, string[]>
    }

   

    const { data, error,  isFetching } = useQuery<DostvData, AxiosError<ApiErrorResponse>>({
        queryKey: ['dostvs'],
        queryFn: async (): Promise<DostvData> => {
            const res = await axios.get<DostvData>(`${config.baseUri}/api/dostv/load-dostv`, {
                 headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${config.apiToken}`
                }
            })

            return res.data
        }
    })

    if(isFetching){
        return <Loader />
    }

    if(error){
        console.error(error.response?.data.message);
        console.error(error.response?.data.errors);
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
        <section className='md:h-[640px] flex my-20'
            style={{
                background: `url(/images/dost-v-background.png)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            
            {/* <img className="absolute top-0 w-full" src="/images/dost-v-background.png" alt="" /> */}
            
            <div className="lg:w-7xl lg:mx-auto flex">
                <div className="flex gap-10 items-center justify-center">
                    {/* Featured Image */}
                    <div className="hidden relative lg:flex lg:w-2/3">
                        <div className="absolute inset-0 bg-cover bg-center blur-md"
                            style={{
                                background: `url(/dostv/${data?.dostv.featured_image})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>

                        <img className="p-10 mx-auto z-1" src={`/dostv/${data?.dostv.featured_image ?? 'https://fakeimg.pl/600x400/000000/ffffff?text=Image+Placeholder'}`} alt="" />
                    </div>
                    
                    <div className="lg:w-1/3 text-center py-2">
                        <h2 className="text-2xl font-bold text-white lg:text-[40px] lg:text-left">DOST<span className="text-blue-500">v</span></h2>
                        <p className="mx-2 text-white my-2 text-justify">{data?.dostv.description}</p>
                        
                        <div className="mx-auto max-w-[300px]">
                            <Slider
                                className=""
                                {...settings}>
                                {data?.videos.map((video, index) => (
                                    <div key={index}>
                                        <ReactPlayer
                                            className="react-player"
                                            width={360}
                                            style={{

                                                maxHeight: "240px",
                                            }}
                                            url={video.link}
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