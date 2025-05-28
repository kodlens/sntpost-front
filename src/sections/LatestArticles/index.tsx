import { useEffect, useState } from 'react'

import axios from 'axios';

import '../LatestArticles/index.css';
import { Link } from 'react-router-dom';
import type { Article } from '../../types/article';
import { config } from '../../config/config';
import Loader from '../../components/Loader';

export default function LatestArticles() {

    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const loadLatestArticles = ():void => {
        setLoading(true)
        axios.get<Article[]>(`${config.baseUri}/api/articles/load-latest-articles`, {
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setLoading(false)
            setArticles(res.data);
        })
    }

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
        loadLatestArticles()
    },[])


    return (
        <section className='w-full bg-white'>
            {loading ? (
                <Loader />
            ) : (<>
                <div className="font-extrabold text-[2rem] text-center my-20 tracking-wider"></div>
                <div className='lg:w-[1240px] mx-auto '>

                    <div className='flex flex-col lg:flex-row flex-wrap gap-[16px] '>
                        {articles.map(article => (

                            <div key={article.id} className='flex flex-col lg:flex-row gap-2 shadow-sm border mx-2 lg:m-0 lg:w-full lg:p-6 py-4 article rounded-md mb-8'>

                                <div className='w-full h-[200px] lg:w-[300px] lg:h-[200px] md:h-[400px] border-1 border-grey-700' style={{
                                    backgroundImage: `url(${config.baseUri}/storage/featured_images/${article.featured_image})`,
                                    //backgroundImage: `url(${config.storageUri}/${article.featured_image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center' }}>
                                </div>

                                <div className='w-full'>
                                    <div className='font-extrabold text-red-600 text-md mb-2'>{article.category?.title}</div>
                                    <Link className='text-md font-bold mb-10' to={`/dost/${article.slug}`}> {article.title}</Link>
                                    <div className="border my-2"></div>
                                    <div className='text-justify text-[18px]'>{truncate(article.excerpt ? article.excerpt : '', 15)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>)}
        </section>
    )
}
