import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

import './index.css'
import type { Article } from "../../../types/article";
import { config } from "../../../config/config";
import MainLayout from "../../../layouts/MainLayout";
import Loader from "../../../components/Loader";


const SearchResult: React.FC = () => {

    const search = useParams().search;

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [isError, setIsError] = useState<boolean>(false);
    const [perPage, setPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    interface PageResponse {
        data: any[];
        total:number;
        current_page:number;
        per_page:number
    }

    const searchNow = () => {
        setIsError(false)
        setArticles([])
        setLoading(true)

        const paramQuery = [
            `perpage=${perPage}`,
            `page=${currentPage}`
        ].join('&')

        axios.get<PageResponse>(`${config.baseUri}/api/search/${search}?${paramQuery}`, {
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setArticles(res.data.data)
            setTotal(res.data.total)
            setLoading(false)

            setCurrentPage(res.data.current_page)
            setPerPage(res.data.per_page)
            
        }).catch(() => {
            setLoading(false)
            setIsError(true)
            
        })
    }

    useEffect(()=>{
        searchNow()
    },[search]);


    useEffect(()=>{
        searchNow()
    }, [currentPage])


    const paginate = (i:number) =>{
        setCurrentPage(i)
    }

    const nextPage = () =>{
        const buttonNo = Math.ceil(total / perPage);
        if(currentPage < buttonNo){
            setCurrentPage(currentPage+1);
        }
    }

    const prevPage = () =>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const renderPaginationButtons = () => {
        
        const buttonNo = Math.ceil(total / perPage);

        let buttonNoDisplay = 0;

        if(buttonNo > 10){
            buttonNoDisplay = 10
        }else{
            buttonNoDisplay = buttonNo;
        }


        const paginationButtons = [];

        // Generate buttons using a `for` loop
        for (let i = 1; i <= buttonNoDisplay; i++) {
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
                        <button onClick={prevPage} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                            </svg>
                        </button>
                    </li>


                    {paginationButtons}
                    
                    <li>
                        <button onClick={nextPage} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }

    return (
        <>
            <MainLayout>
                { loading ? <Loader /> : (
                    <section className="lg:w-[1240px] lg:mx-auto m-2 md:m-6 min-h-screen my-10">
                        <div className="mt-10 font-bold text-title text-accent4">RESULT(S) OF <span className="italic">{search}</span></div>
                        <div className="text-sm text-gray-500">Result(s) {total}</div>

                        <div className="mt-5">
                            { articles.map(article => (
                                <div key={article.id} className="mb-4 py-4 border-b">
                                    <div className="my-4 font-bold text-lg">
                                        <Link className="text-accent4 text-2xl text-blue-950" to={`/dost/${article.slug}`}>
                                            {article.title}
                                        </Link>
                                        
                                    </div>
                                    <div className="">{article.excerpt}</div>
                                </div>
                            ))}

                            { isError || total < 1 && (
                                <div className="mt-10 flex justify-center text-gray-500">
                                    No result found.
                                </div>
                            )}
                        </div>

                        <div className='my-10 flex justify-center overflow-auto'>
                                    
                            {renderPaginationButtons()}
    
                        </div>

                    </section>

                  
                )}
                
            </MainLayout>
           
        </>
    )
}

export default SearchResult;