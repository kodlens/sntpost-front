import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import './index.css';
import type { Article } from '../../../types/article';
import { config } from '../../../config/config';
import MainLayout from '../../../layouts/MainLayout';
import Loader from '../../../components/Loader';
import moment from 'moment';

interface PageResponse {
  data: Article[];
  total: number;
  current_page: number;
  per_page: number;
}

const SearchResult: React.FC = () => {
  const search = useParams().search;

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const previousSearchRef = useRef<string | undefined>(undefined);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const searchNow = (pageOverride?: number) => {
    setIsError(false);
    setLoading(true);

    const targetPage = pageOverride ?? currentPage;
    const paramQuery = [`perpage=${perPage}`, `page=${targetPage}`].join('&');

    axios
      .get<PageResponse>(`${config.baseUri}/api/search/${search}?${paramQuery}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${config.apiToken}`,
        },
      })
      .then((res) => {
        setArticles(res.data.data);
        setTotal(res.data.total);
        setCurrentPage(res.data.current_page);
        setPerPage(res.data.per_page);
      })
      .catch(() => {
        setIsError(true);
        setArticles([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (previousSearchRef.current !== search) {
      previousSearchRef.current = search;
      if (currentPage !== 1) {
        setCurrentPage(1);
        return;
      }
    }

    searchNow();
  }, [search, currentPage]);

  const paginate = (pageNo: number) => {
    if (pageNo < 1 || pageNo > totalPages || pageNo === currentPage) return;
    setCurrentPage(pageNo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageButtons = useMemo(() => {
    const maxVisible = 7;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, idx) => idx + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
  }, [currentPage, totalPages]);

  return (
    <MainLayout>
      <section className="min-h-screen w-full bg-[#f8fbff] py-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
          <div className="mb-8 flex flex-col gap-2 lg:mb-10">
            <p className="inline-flex w-fit rounded-full border border-[#0D4E86]/20 bg-white px-4 py-1 text-xs font-semibold tracking-[0.18em] text-[#0D4E86] uppercase">
              Search Results
            </p>
            <h1 className="text-2xl leading-tight font-extrabold text-[#092B4A] sm:text-3xl lg:text-4xl">
              Result(s) for <span className="italic">{search}</span>
            </h1>
            <p className="text-sm font-semibold text-[#5C7D9D]">Total results: {total}</p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="space-y-4">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="rounded-2xl border border-[#d4e4f2] bg-white p-5 shadow-[0_10px_24px_rgba(20,56,92,0.08)]"
                  >
                    <h2 className="text-xl leading-tight font-bold text-[#0A3257] sm:text-2xl">
                      <Link className="hover:text-[#0D4E86]" to={`/dost/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-xs font-semibold text-[#5C7D9D]">
                      {article.publication_date ? moment(article.publication_date).format('ll') : 'Published date unavailable'}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#35516d] sm:text-base">{article.excerpt}</p>
                  </article>
                ))}
              </div>

              {(isError || total < 1) && (
                <div className="mt-10 rounded-2xl border border-[#d4e4f2] bg-white p-8 text-center text-[#5C7D9D]">
                  No result found.
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-10 flex justify-center overflow-auto">
                  <nav aria-label="Search pagination">
                    <ul className="flex items-center gap-2">
                      <li>
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="rounded-lg border border-[#d4e4f2] bg-white px-3 py-2 text-sm font-semibold text-[#0A3257] transition hover:bg-[#EAF5FF] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Prev
                        </button>
                      </li>

                      {pageButtons.map((pageNo) => (
                        <li key={pageNo}>
                          <button
                            onClick={() => paginate(pageNo)}
                            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                              pageNo === currentPage
                                ? 'border-[#0D4E86] bg-[#0D4E86] text-white'
                                : 'border-[#d4e4f2] bg-white text-[#0A3257] hover:bg-[#EAF5FF]'
                            }`}
                          >
                            {pageNo}
                          </button>
                        </li>
                      ))}

                      <li>
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="rounded-lg border border-[#d4e4f2] bg-white px-3 py-2 text-sm font-semibold text-[#0A3257] transition hover:bg-[#EAF5FF] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default SearchResult;
