import '../FeaturedMagazine/index.css';

import { Link } from 'react-router-dom';
import axios from 'axios';
import type { Magazine } from '../../types/magazine';
import { config } from '../../config/config';
import { useQuery } from '@tanstack/react-query';
import ErrorComponent from '../../components/ErrorComponent';

export default function FeaturedMagazine() {


    const { data, error } = useQuery({
        queryKey: ['magazine'],
        queryFn: async () => {
            const res = await axios.get<Magazine>(`${config.baseUri}/api/magazines/load-featured-magazine`, {
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${config.apiToken}`
                }
            })

            return res.data
        }

    })

    if (error) {
        return <ErrorComponent />
    }

    //feautred journal will be followed

    const truncate = (text: string, limit: number) => {
        if (text.length > 0) {
            const words = text.split(' ');
            if (words.length > limit) {
                return words.slice(0, limit).join(' ') + '...';
            }
            return text;
        } else {
            return ''
        }
    }

    return (

        <section className='w-full bg-[#141414] mt-15 mb-10 lg:p-10'>
            <div className='lg:w-[1240px] h-full bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-50 saturate-100 backdrop-contrast-100 rounded-md mx-auto'>

                <div className='flex flex-col lg:flex-row justify-center items-center py-6 gap-4 lg:p-15 my-10'>


                    <Link to={`/magazines/flipbook/${data?.slug}`}>
                        <div className='bg-gray-300 h-[370px] rounded-2xl w-[290px]'
                            style={{
                                backgroundImage: `url(${config.baseUri}/storage/magazines/${data?.cover})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            }}>

                        </div>
                    </Link>

                    <div className='lg:flex-1'>
                        <div className='font-bold text-white text-2xl text-center lg:text-left'>{data?.title}</div>
                        <div className='mt-5 mx-2 text-[1.2rem] text-white text-center excerpt lg:text-justify'
                            dangerouslySetInnerHTML={{ __html: truncate(`${data?.excerpt}`, 500) }}>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
