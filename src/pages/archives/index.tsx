import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'
import { config } from '../../config/config';
import Loader from '../../components/Loader';

const ArchiveIndex: React.FC = () => {

  interface ArchiveArticle {
    title?: string;
    slug: string;
    year: number;
    data: any[]
    total: number;
    articles: any[];
  }

  const [articles, setArticles] = useState<ArchiveArticle[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const loadArchiveArticles = (): void => {
    setLoading(true)
    axios.get<ArchiveArticle[]>(`${config.baseUri}/api/articles/load-archive-articles`, {
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${config.apiToken}`
      }
    }).then(res => {
      setLoading(false)
      setArticles(res.data);
      //console.log(res.data);
    })
  }


  useEffect(() => {
    loadArchiveArticles();
  }, [])



  return (
    <div className='mx-4 my-[100px] lg:w-[1240px] lg:mx-auto'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='my-4 font-bold'>Archive Articles</div>

          <div id="accordion-open" data-accordion="open">
            {articles.map((article: ArchiveArticle, index) => (
              <div key={index}>
                <h4 id="accordion-open-heading-1">
                  <button type="button"
                    className={"flex items-center justify-between w-full border-b-0 p-5 font-medium rtl:text-right  border border-gray-200  focus:ring-4 focus:ring-gray-200 gap-3 "} 
                    data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
                    <span className="flex items-center font-bold">
                      {/* <svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd">
                        </path>
                      </svg>  */}
                      {article.year}
                    </span>
                    <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                    </svg>
                  </button>
                </h4>
                <div id="accordion-open-body-1" className="" aria-labelledby="accordion-open-heading-1">
                  <div className="p-5 border border-b border-gray-200">
                    {
                      article.articles.map((item:any, ix) => (
                      <div key={ix} className='ml-4 my-4'>
                        <Link to={`/dost/${item.slug}`} className="text-blue-500">
                          {item.title}
                        </Link>
                      </div>
                    ))
                  }
                  </div>
                </div>
              </div>
            ))}



          </div>
        </>
      )}


    </div>



  )
}

export default ArchiveIndex