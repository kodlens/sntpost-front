import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './index.css';
import type { Article } from '../../types/article';
import { config } from '../../config/config';
import axios from 'axios';
import Loader from '../../components/Loader';
import moment from 'moment';

const ArticlesByCategory: React.FC = () => {
  const params = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const previousSlugRef = useRef<string | undefined>(undefined);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const loadArticlesByCategory = (pageOverride?: number) => {
    setLoading(true);

    const targetPage = pageOverride ?? currentPage;
    const paramQuery = [`perpage=${perPage}`, `page=${targetPage}`].join('&');

    axios
      .get(`${config.baseUri}/api/articles/load-latest-articles-by-category/${params.slug}?${paramQuery}`, {
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
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (previousSlugRef.current !== params.slug) {
      previousSlugRef.current = params.slug;
      if (currentPage !== 1) {
        setCurrentPage(1);
        return;
      }
    }

    loadArticlesByCategory();
  }, [params.slug, currentPage]);

  const paginate = (i: number) => {
    if (i < 1 || i > totalPages || i === currentPage) return;
    setCurrentPage(i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginationPages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  }, [totalPages]);

  const lead = articles[0];
  const sideCards = articles.slice(1, 7);
  const moreCards = articles.slice(7);

  return (
    <section className="w-full bg-[#f8fbff] py-10 lg:py-14">
      {loading ? (
        <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
          <Loader />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 lg:mb-10">
            <p className="inline-flex w-fit rounded-full border border-[#0D4E86]/20 bg-white px-4 py-1 text-xs font-semibold tracking-[0.18em] text-[#0D4E86] uppercase">
              Category Feed
            </p>
            <h1 className="text-3xl font-extrabold tracking-wide text-[#092B4A] sm:text-4xl lg:text-5xl">
              {lead?.category?.title?.toUpperCase() || 'ARTICLES'}
            </h1>
          </div>

          {!lead ? (
            <div className="rounded-2xl border border-[#d4e4f2] bg-white p-10 text-center text-[#35516d]">
              No articles found for this category.
            </div>
          ) : (
            <>
              <section className="grid gap-5 lg:grid-cols-12">
                <article className="group overflow-hidden rounded-3xl border border-[#d4e4f2] bg-white shadow-[0_14px_35px_rgba(20,56,92,0.12)] lg:col-span-7">
                  <div
                    className="h-[320px] w-full bg-cover bg-center transition duration-700 group-hover:scale-105 sm:h-[380px] lg:h-[430px]"
                    style={{
                      backgroundImage: `url(${config.baseUri}/storage/featured_images/${lead.featured_image})`,
                    }}
                  />

                  <div className="p-6 lg:p-8">
                    <h2 className="text-2xl leading-tight font-bold text-[#0A3257] sm:text-3xl">
                      <Link className="hover:text-[#0D4E86]" to={`/dost/${lead.slug}`}>
                        {lead.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-sm font-semibold text-[#5C7D9D]">
                      Date published: {moment(lead.publication_date).format('ll')}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#35516d] sm:text-base">{lead.excerpt}</p>
                  </div>
                </article>

                <div className="space-y-3 lg:col-span-5">
                  {sideCards.map((article) => (
                    <article
                      key={article.id}
                      className="group overflow-hidden rounded-2xl border border-[#d4e4f2] bg-white p-3 shadow-[0_10px_24px_rgba(20,56,92,0.1)]"
                    >
                      <div className="flex gap-3">
                        <div
                          className="h-[96px] w-[135px] shrink-0 rounded-xl bg-cover bg-center transition duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${config.baseUri}/storage/featured_images/${article.featured_image})`,
                          }}
                        />
                        <div className="min-w-0">
                          <h3 className="line-clamp-2 text-lg leading-tight font-bold text-[#0A3257]">
                            <Link className="hover:text-[#0D4E86]" to={`/dost/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h3>
                          <p className="mt-2 text-xs text-[#5C7D9D]">
                            {moment(article.publication_date).format('ll')}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {moreCards.length > 0 && (
                <section className="mt-6 grid gap-5 md:grid-cols-2">
                  {moreCards.map((article) => (
                    <article
                      key={article.id}
                      className="group overflow-hidden rounded-2xl border border-[#d4e4f2] bg-white shadow-[0_12px_30px_rgba(20,56,92,0.1)]"
                    >
                      <div
                        className="h-[250px] w-full bg-cover bg-center transition duration-700 group-hover:scale-105 sm:h-[280px]"
                        style={{
                          backgroundImage: `url(${config.baseUri}/storage/featured_images/${article.featured_image})`,
                        }}
                      />
                      <div className="p-5">
                        <h3 className="text-xl leading-tight font-bold text-[#0A3257]">
                          <Link className="hover:text-[#0D4E86]" to={`/dost/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-[#5C7D9D]">
                          Date published: {moment(article.publication_date).format('ll')}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[#35516d] sm:text-base">{article.excerpt}</p>
                      </div>
                    </article>
                  ))}
                </section>
              )}
            </>
          )}

          {totalPages > 1 && (
            <section className="mt-10 flex justify-center">
              <nav aria-label="Category pagination">
                <ul className="flex items-center gap-2">
                  <li>
                    <button
                      type="button"
                      className="rounded-lg border border-[#d4e4f2] bg-white px-3 py-2 text-sm font-semibold text-[#0A3257] transition hover:bg-[#EAF5FF] disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                  </li>

                  {paginationPages.map((pageNo) => (
                    <li key={pageNo}>
                      <button
                        type="button"
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
                      type="button"
                      className="rounded-lg border border-[#d4e4f2] bg-white px-3 py-2 text-sm font-semibold text-[#0A3257] transition hover:bg-[#EAF5FF] disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </section>
          )}
        </div>
      )}
    </section>
  );
};

export default ArticlesByCategory;
