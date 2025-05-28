import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { config } from "../../config/config";
import type { Article } from "../../types/article";
import Loader from "../../components/Loader";
import './index.css'


const FeaturedArticles: React.FC = () => {

    const [articles, setArticles] = useState<Article[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const loadArticles = () =>  {
        setLoading(true)
        axios.get(`${config.baseUri}/api/articles/load-featured-articles`,{
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setArticles(res.data)
            setLoading(false)
        }).catch(err =>{
            setLoading(false)
            console.log(err);
            
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

        loadArticles()
        
    }, []);



    return (

        <section className="relative" style={{
            backgroundImage: `url(../defaults/bg-featured.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'}}>

            <div className="mx-2 
                lg:w-[1240px] lg:mx-auto">
            
                { loading ? (
                    <Loader height="h-[400px]" />

                ) : (<>
                        <div className=" pt-10 md:pt-20">
                            
                            <div className="font-extrabold mb-10 lg:text-[2.3rem] text-[1.8rem] text-center tracking-wider">
                                S&T Updates
                            </div>

                            <div className="relative">
                                <div className="px-10 py-4 absolute top-0 left-4 z-1 bg-red-600 text-white font-extrabold text-lg mb-2 -m-5 shadow-xl lg:-rotate-[30deg] lg:top-4 lg:-left-12">
                                    FEATURED ARTICLE
                                </div>

                                <div className="flex flex-col gap-2 lg:flex-row">
                            
                                    { articles && (<>
                                        {/* left div , main featured*/}
                                        <div className="flex-1">

                                            <div className="relative overflow-hidden h-[610px]" style={{
                                                backgroundImage: `url(${config.baseUri}/storage/featured_images/${articles[0]?.featured_image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                borderRadius: '15px',
                                            }}>
                                                <div className="text-container absolute bottom-0 py-6 px-4">
                                                    <div className="font-bold text-articleTitle text-md mb-2">
                                                        {truncate(articles[0]?.title ? articles[0]?.title : '', 30)}
                                                    </div>
                                                    <div className="">
                                                        <div className="text-justify text-white text-sm">
                                                            {truncate(articles[0]?.excerpt ? articles[0]?.excerpt : '', 30)}
                                                        </div>
                                                        <div className="mt-4">
                                                            <Link to={`/dost/${articles[0].slug}`} className="bg-white px-5 py-2 rounded-md
                                                                hover:bg-[#dddddb] transition-all duration-300 font-bold text-sm">LEARN MORE</Link>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                        
                                        {/* right div */}
                                        <div className="flex flex-col gap-2 flex-1">
                                            <div className="flex gap-2 flex-col md:flex-row">
                                                <div className="rounded-xl relative w-full h-[300px] overflow-hidden" style={{
                                                    backgroundImage: `url(${config.baseUri}/storage/featured_images/${articles[1]?.featured_image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}>
                                                    <div className="text-container absolute bottom-0 py-2 px-4">
                                                        <div className="font-bold text-articleTitle text-md mb-2">
                                                            <Link to={`/dost/${articles[1]?.slug}`}>
                                                                {truncate(articles[1]?.title ? articles[1]?.title : '', 30)}
                                                            </Link>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div className="rounded-xl relative w-full h-[300px] overflow-hidden" style={{
                                                    backgroundImage: `url(${config.baseUri}/storage/featured_images/${articles[2]?.featured_image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}>
                                                    <div className="text-container absolute bottom-0 py-2 px-4">
                                                        <div className="font-bold text-articleTitle text-md mb-2">
                                                            <Link to={`/dost/${articles[2]?.slug}`}>
                                                                {truncate(articles[2]?.title ? articles[2]?.title : '', 30)}
                                                            </Link>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 flex-col md:flex-row">
                                                <div className="rounded-xl relative w-full h-[300px] overflow-hidden" style={{
                                                    backgroundImage: `url(${config.baseUri}/storage/featured_images/${articles[3]?.featured_image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}>
                                                    <div className="text-container absolute bottom-0 py-2 px-4">
                                                        <div className="font-bold text-articleTitle text-md mb-2">
                                                            <Link to={`/dost/${articles[3]?.slug}`}>
                                                                {truncate(articles[3]?.title ? articles[3]?.title : '', 30)}
                                                            </Link>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div className="rounded-xl relative w-full h-[300px] overflow-hidden" style={{
                                                    backgroundImage: `url(${config.baseUri}/storage/featured_images/${articles[4]?.featured_image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}>
                                                    <div className="text-container absolute bottom-0 py-2 px-4">
                                                        <div className="font-bold text-articleTitle text-md mb-2">
                                                            <Link to={`/dost/${articles[4]?.slug}`}>
                                                                {truncate(articles[4]?.title ? articles[4]?.title : '', 30)}
                                                            </Link>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>)} 
                                </div>

                            </div>
                        </div>
                       

                    </>)}
            </div>
        </section>
    )

}

export default FeaturedArticles;