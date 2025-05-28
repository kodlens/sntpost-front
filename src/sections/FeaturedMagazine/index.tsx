import { useEffect, useState } from 'react'


import '../FeaturedMagazine/index.css';

import { Link } from 'react-router-dom';
import axios from 'axios';
import type { Magazine } from '../../types/magazine';
import { config } from '../../config/config';
import Loader from '../../components/Loader';

export default function FeaturedMagazine() {

    const [magazine, setMagazine] = useState<Magazine>()
    const [loading, setLoading] = useState<boolean>(false)

    const loadFeaturedMagazine = ():void => {
        setLoading(true)
        axios.get<Magazine>(`${config.baseUri}/api/magazines/load-featured-magazine`, {
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setLoading(false)
            setMagazine(res.data);
        })
    }
    //feautred journal will be followed

    const truncate = (text: string, limit: number) => {
		if(text.length > 0){
			const words = text.split(' ');
			if (words.length > limit) {
				return words.slice(0, limit).join(' ') + '...';
			}
			return text;
		}else{
			return ''
		}
	}

    useEffect(()=>{
        loadFeaturedMagazine()
    },[])


    return (
        <>
            {loading ? (
                <Loader />
            ):(
                <section className='w-full bg-[#141414] mt-15 mb-10 lg:p-10'>
                    <div className='lg:w-[1240px] h-full bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-50 saturate-100 backdrop-contrast-100 rounded-md mx-auto'>
                        
                        <div className='flex flex-col lg:flex-row justify-center items-center py-6 gap-4 lg:p-15 my-10'>


                        <Link to={`/magazines/flipbook/${magazine?.slug}`}>
                            <div className='bg-gray-300 h-[370px] rounded-2xl w-[290px]' 
                                style={{
                                    backgroundImage: `url(${config.baseUri}/storage/magazines/${magazine?.cover})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center' }}>

                            </div>
                        </Link>
                            
                            <div className='lg:flex-1'>
                                <div className='font-bold text-white text-2xl text-center lg:text-left'>{magazine?.title}</div>
                                <div className='mt-5 mx-2 text-[1.2rem] text-white text-center excerpt lg:text-justify' 
                                    dangerouslySetInnerHTML={{ __html: truncate(`${magazine?.excerpt}`, 500)}}>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}
