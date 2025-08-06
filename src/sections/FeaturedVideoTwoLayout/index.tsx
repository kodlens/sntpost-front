import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { Videos } from "../../types/videos";
import Loader from "../../components/Loader";
import Card from "../FeaturedVideo/card";

const FeaturedVideoTwoLayout: React.FC = () => {

    const [videos, setVideos] = useState<Videos[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    const loadVideos = () => {
        setLoading(true)

        axios.get(`/api/videos/load-featured-videos`).then(res=>{
            setVideos(res.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err);
            throw err
        })
    }

    useEffect(()=>{
        loadVideos()
    }, [])

    if(loading){
        <Loader></Loader>
    }

    return (
        <section className="lg:w-7xl lg:mx-auto mx-2">
            <div className="mt-10 mx-auto">
                <div className="flex justify-center">
                    <div className="w-full lg:block text-center lg:text-center lg:w-1/3">
                        <h2 className="text-[2.3rem] leading-snug text-black font-bold">Featured <span className="text-blue-500">Videos</span></h2>
                        <p className="text-center">Watch the latest events about DOST’s programs, products, and services.</p>
                        <Link className="block mt-4 py-3 bg-blue-400 text-center text-white font-bold" target="_blank" to='https://www.youtube.com/@DOSTvPH/videos'>Learn More</Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 mt-10 mx-auto">
                    {videos?.map((video, index) => (
                        <Card key={index} card={video} />
                    ))
                    }
                </div>
            </div>
        </section>
    )
}

export default FeaturedVideoTwoLayout;