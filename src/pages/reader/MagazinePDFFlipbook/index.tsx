import React, { useEffect, useState } from "react";


import '../../../../../public/magazines/css/min.css'

//import './themify-icons.min.css';
import '../../../../../public/magazines/css/themify-icons.css'

import { useParams } from "react-router-dom";
import type { Magazine } from "../../../types/magazine";
import { config } from "../../../config/config";
import axios from "axios";
import Loader from "../../../components/Loader";





const MagazinePDFFlipBook:React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [pdf, setPDF] = useState<string>('')

    const slug = useParams().slug;


    const loadMagazine = () => {
        setLoading(true)
        axios.get<Magazine>(`${config.baseUri}/magazines/get-magazine/${slug}`,{
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            
            setPDF(`../../storage/magazines/releases/${res.data?.magazine_path}`);
            setLoading(false)
            
        }).catch(err =>{
            setLoading(false)
            console.log(err);
        })
    }
    
    const initFlip = () => {
        if (window.$) {
            //uses source from online(make sure the file has CORS access enabled if used in cross-domain)
            //const pdf1 = `../../storage/magazines/releases/1Q-2022.pdf`;

            const options = {
                height:2000,
                duration: 700,
                backgroundColor: "#2F2D2F"
            };

            $("#flipbookContainer").flipBook(pdf, options);
        }
    }

    useEffect(()=>{
        loadMagazine()
    }, [])

    useEffect(()=>{
        if(pdf){
            initFlip()
        }
    }, [pdf])

    return (
        <>
            <div className="mx-auto h-screen flex justify-center">

                { loading ? (<Loader />) : (
                    <div className="font-satoshi" id="flipbookContainer">
                    </div>
                )}
            </div>

            

        </>
    )
}


export default MagazinePDFFlipBook;