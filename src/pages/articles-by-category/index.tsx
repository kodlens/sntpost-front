import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';

import './index.css'
import type { Article } from '../../types/article';
import { config } from '../../config/config';
import axios from 'axios';
import Loader from '../../components/Loader';
import { article } from 'motion/react-client';
import moment from 'moment';
import "animate.css/animate.compat.css"
import { motion } from 'motion/react';

const ArticlesByCategory: React.FC = ( ) => {

    const params = useParams();

    const [loading, setLoading] = useState<boolean>(false);
    const [articles, setArticles] = useState<Article[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const loadArticlesByCategory = () => {
        setLoading(true)
        const paramQuery = [
            `perpage=${perPage}`,
            `page=${currentPage}`
        ].join('&')

        axios.get(`${config.baseUri}/api/articles/load-latest-articles-by-category/${params.slug}?${paramQuery}`,{
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setArticles(res.data.data)
            setTotal(res.data.total)
            setCurrentPage(res.data.current_page)
            setPerPage(res.data.per_page)
            setLoading(false)
        }).catch(err =>{
            setLoading(false)
            console.log(err);
        })
    }

    useEffect(()=>{
        loadArticlesByCategory()
    }, [params.slug])

    useEffect(()=>{
        loadArticlesByCategory()
    }, [currentPage])


    const paginate = (i:number) =>{
        setCurrentPage(i)
    }

    const renderPaginationButtons = () => {
        
        const buttonNo = Math.ceil(total / perPage);
        const paginationButtons = [];

        // Generate buttons using a `for` loop
        for (let i = 1; i <= buttonNo; i++) {
            paginationButtons.push(
                <li key={i} className="pagination-button" onClick={()=> paginate(i)}>
                    {i}
                </li>
            );
        }
        
        return (
            <nav aria-label="Page navigation example">
                <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                        <a href="#" className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                            </svg>
                        </a>
                    </li>


                    {paginationButtons}
                    
                    <li>
                        <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }



    return (
        <>
            
            <section className='my-10'>

                { loading ? (<Loader />) : (

                    <div className='xl:w-7xl mx-2 lg:w-5xl lg:mx-auto'>

                        <div className='mb-10 mx-2'>
                            <span className='bg-red-700 py-2 px-4 font-extrabold md:text-2xl text-xl text-white'>
                                {articles[0]?.category?.title?.toUpperCase()}
                            </span>
                        </div>
                            
                        <section className='flex flex-col mx-2 lg:flex-row gap-4'>
                          
                            <motion.div className='flex lg:w-[65%] flex-col w-full'
                                initial={{ opacity: 0, scale: 0, y: 0 }}
                                animate={{ opacity: 1, scale: 1, y: 1 }}>
                                <div className='group h-[420px] overflow-hidden'>
                                    <div className='w-full h-full zoom-in' 
                                        style={{
                                            backgroundImage: `url(${config.baseUri}/storage/featured_images/${articles[0]?.featured_image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'}}>
                                    </div>
                                </div>
                               
                                <div className="font-bold text-xl lg:text-2xl mt-2">
                                    <Link to={`/dost/${articles[0]?.slug}`}>{ articles[0]?.title }</Link>
                                </div>
                                <div className='text-gray-600 mb-2'>
                                    <span className='font-bold'>Date published:</span> { moment(articles[0]?.publication_date).format('ll') }
                                </div>
                                <div className="text-justify">
                                    <p>
                                        { articles[0]?.excerpt }
                                    </p>
                                </div>
                            </motion.div>


                            <div className='lg:w-[35%] flex flex-col w-full'>
                                { articles.slice(1, 5).map((article, index) => (
                                    <div key={index} className='flex border-b-1 pb-4 border-b-blue-900 my-2' >
                                        <div className='mr-2' style={{
                                            backgroundImage: `url(${config.baseUri}/storage/featured_images/${article.featured_image})`,
                                            backgroundSize: 'cover',
                                            width: '150px',
                                            height: '100px',
                                            backgroundPosition: 'center'
                                        }}>  
                                        </div>
                                        <div className="w-full">
                                            <Link className='font-bold text-blue-900 hover:text-blue-950 text-xl lg:text-xl lg:text-left' to={`/dost/${article?.slug}`}>{ article?.title }</Link>
                                            {/* <div className='font-bold'> { article.publication_date } </div> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className='my-10 lg:flex-col flex-row'>
                            <div className='flex flex-wrap gap-4'>
                                { articles.slice(4).map((article, index) => (
                                    <motion.div key={index} className='lg:w-[49%] w-full mb-8' 
                                        initial={{ opacity: 0, scale: 0, y: 0 }}
                                        animate={{ opacity: 1, scale: 1, y: 1 }}>
                                        <div className='group overflow-hidden h-[400px]'>
                                            <div className='w-full h-full zoom-in' style={{
                                                backgroundImage: `url(${config.baseUri}/storage/featured_images/${article.featured_image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}>  
                                            </div>
                                        </div>
                                        <div className="w-full mt-2">
                                            <Link className='font-bold text-xl' to={`/dost/${article?.slug}`}>{ article?.title }</Link>
                                            {/* <div className='font-bold'> { article.publication_date } </div> */}
                                        </div>
                                        <div className='text-gray-600 mb-2'>
                                            <span className='font-bold'>Date published:</span> { moment(articles[0]?.publication_date).format('ll') }
                                        </div>
                                        <div className="text-justify">
                                            <p>
                                                { article?.excerpt }
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

            </section>


            <section className='my-10 flex justify-center'>
                
                {renderPaginationButtons()}

            </section>

        </>
    )
}
 

export default ArticlesByCategory;