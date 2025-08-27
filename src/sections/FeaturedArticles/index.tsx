import axios from "axios";
import { Link } from "react-router-dom";
import { config } from "../../config/config";
import type { Article } from "../../types/article";
import Loader from "../../components/Loader";
import './index.css'
import { useQuery } from "@tanstack/react-query";


const FeaturedArticles: React.FC = () => {


    const { data, isFetching } = useQuery<Article[]>({
        queryKey: ['featured_articles'],
        queryFn: async () => {
            const res = await axios.get(`${config.baseUri}/api/articles/load-featured-articles`, {
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${config.apiToken}`
                }
            })
            return res.data
        }
    });

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

        <section className="relative" style={{
            backgroundImage: `url(../defaults/bg-featured.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>

            <div className="mx-2 
                xl:w-7xl lg:mx-auto">

                {isFetching ? (
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

                                {data && (<>
                                    {/* left div , main featured*/}
                                    <div className="flex-1">

                                        <div className="relative overflow-hidden h-[610px] group">

                                            <div className="h-full transform transition-transform duration-500 ease-in-out group-hover:scale-110" style={{
                                                backgroundImage: `url(${config.baseUri}/storage/featured_images/${data[0] ? data[0]?.featured_image : 'img/no-img.png'})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                borderRadius: '15px',
                                            }}>
                                            </div>

                                            <div className="text-container absolute bottom-0 py-6 px-4">
                                                <div className="font-bold text-2xl text-white text-md mb-2">
                                                    {truncate(data[0]?.title ? data[0]?.title : '', 30)}
                                                </div>
                                                <div className="">
                                                    <div className="text-justify text-white">
                                                        {truncate(data[0]?.excerpt ? data[0]?.excerpt : '', 30)}
                                                    </div>
                                                    <div className="mt-4">
                                                        <Link to={`/dost/${data[0]?.slug}`} className="bg-white px-5 py-2 rounded-md
                            hover:bg-[#dddddb] transition-all duration-300 font-bold text-sm">LEARN MORE</Link>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* right div */}
                                    <div className="flex flex-col gap-2 flex-1">
                                        <div className="flex gap-2 flex-col md:flex-row">
                                            <div className="rounded-xl relative w-full h-[300px] overflow-hidden group">
                                                <div className="h-full transform transition-transform duration-500 ease-in-out group-hover:scale-110" style={{
                                                    backgroundImage: `url(${config.baseUri}/storage/featured_images/${data[1]?.featured_image ? data[1]?.featured_image : 'img/no-img.png'})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}>

                                                </div>
                                                <div className="text-container absolute bottom-0 py-2 px-4">
                                                    <div className="font-bold text-lg text-white mb-2">
                                                        <Link to={`/dost/${data[1]?.slug}`}>
                                                            {truncate(data[1]?.title ? data[1]?.title : '', 30)}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rounded-xl relative w-full h-[300px] overflow-hidden group">
                                                <div className="h-full transform transition-transform duration-500 ease-in-out group-hover:scale-110" style={{
                                                    backgroundImage: `url(${config.baseUri}/storage/featured_images/${data[2]?.featured_image ? data[2]?.featured_image : 'img/no-img.png'})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}>

                                                </div>
                                                <div className="text-container absolute bottom-0 py-2 px-4">
                                                    <div className="font-bold text-lg text-white mb-2">
                                                        <Link to={`/dost/${data[2]?.slug}`}>
                                                            {truncate(data[2]?.title ? data[2]?.title : '', 30)}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 flex-col md:flex-row">
                                            <div className="rounded-xl relative w-full h-[300px] overflow-hidden group">
                                                <div className="h-full transform transition-transform duration-500 ease-in-out group-hover:scale-110" style={{
                                                    backgroundImage: `url(${config.baseUri}/storage/featured_images/${data[3]?.featured_image ? data[3]?.featured_image : 'img/no-img.png'})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}>

                                                </div>
                                                <div className="text-container absolute bottom-0 py-2 px-4">
                                                    <div className="font-bold text-lg text-white mb-2">
                                                        <Link to={`/dost/${data[3]?.slug}`}>
                                                            {truncate(data[3]?.title ? data[3]?.title : '', 30)}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-xl relative w-full h-[300px] overflow-hidden group">
                                                <div className="h-full transform transition-transform duration-500 ease-in-out group-hover:scale-110" style={{
                                                    backgroundImage: `url(${config.baseUri}/storage/featured_images/${data[4]?.featured_image ? data[4]?.featured_image : 'img/no-img.png'})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}>

                                                </div>
                                                <div className="text-container absolute bottom-0 py-2 px-4">
                                                    <div className="font-bold text-lg text-white mb-2">
                                                        <Link to={`/dost/${data[4]?.slug}`}>
                                                            {truncate(data[4]?.title ? data[4]?.title : '', 30)}
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