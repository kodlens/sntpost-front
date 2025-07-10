import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../../config/config";
import type { Category } from "../../types/category";
import Copyright from "./Copyright";


const MainFooter: React.FC = () => {

    const [categories, setCategories] = useState<Category[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const loadCategories = () =>  {
        setLoading(true)
        axios.get<Category[]>(`${config.baseUri}/api/load-categories`,{
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setCategories(res.data)
            setLoading(false)
        }).catch(err =>{
            setLoading(false)
            throw err
        })
    }

    useEffect(()=>{
        loadCategories()
    }, []);

    return (
        <footer className="w-full bg-black-2 px-[23px] py-[30px] lg:p-p100">
            <div className="w-full">

                <div className="flex justify-evenly lg:flex-row flex-col">

                    <div className="flex flex-col gap-2">
                        <div className="text-white font-bold mb-5">VISIT US</div>
                        <div className="flex items-center">
                            <img
                                className='mr-2'
                                src={'/socials/icons8-facebook-50.png'}
                                width={23}
                                alt="Footer logo"
                            />
                            <a href="https://www.facebook.com/profile.php?id=61567961533594" 
                                target="_blank" rel="noreferrer"
                                className="text-sm text-white">
                                S&T Facebook Page
                            </a>
                        </div>


                        {/* add my-5 if socia media site is added */}
                        <div className="text-white font-bold my-5">CONTACT US</div>
                        <div className="flex items-center">
                            <img
                                className='mr-2'
                                src={'/socials/icons8-email-50.png'}
                                width={20}
                                alt="Footer logo"
                            />
                            <a href="/" className="text-sm text-white">
                                {/* email here */}
                                dost.digest@gmail.com
                            </a>
                        </div>
                    </div>


                    <div className="lg:mt-0 mt-10">

                        <div className="flex flex-col">

                            <div className="text-white font-bold mb-5">CATEGORIES</div>

                            <div className="flex gap-6">
                                { loading ? (
                                    <div className="text-white">
                                        Categories...
                                    </div>
                                ) : (<>

                                    <div className="flex flex-col">
                                        { categories?.slice(0,8).map(item => (
                                            <Link to={`/category/${item.slug}`} 
                                                className="text-sm py-2 px-2 text-white hover:text-[1rem] transform ease-in duration-150" 
                                                key={item.id}>{item.title}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="flex flex-col">
                                        { categories?.slice(8).map(item => (
                                            <Link to={`/category/${item.slug}`} 
                                                className="text-sm px-2 py-2 text-white hover:text-[1rem] transform ease-in duration-150" 
                                                key={item.id}>{item.title}
                                            </Link>
                                        )) }
                                    </div>
                                </>) }
                            </div>
                        </div>
                    </div>
                </div>
               
                <Copyright />
            </div>
        </footer>
    )
}

export default MainFooter;
