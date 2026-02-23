import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { config } from '../../config/config';
import Loader from '../../components/Loader';
import moment from 'moment';

interface ArchiveItem {
  id?: number;
  title?: string;
  slug: string;
  publication_date?: string;
}

interface ArchiveArticle {
  year: number;
  articles: ArchiveItem[];
}

const ArchiveIndex: React.FC = () => {
  const [articles, setArticles] = useState<ArchiveArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openYear, setOpenYear] = useState<number | null>(null);

  const loadArchiveArticles = (): void => {
    setLoading(true);

    axios
      .get<ArchiveArticle[]>(`${config.baseUri}/api/articles/load-archive-articles`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${config.apiToken}`,
        },
      })
      .then((res) => {
        setArticles(res.data);
        if (res.data.length > 0) {
          setOpenYear(res.data[0].year);
        }
      })
      .catch(() => {
        setArticles([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadArchiveArticles();
  }, []);

  return (
    <section className="min-h-screen w-full bg-[#f8fbff] py-10 lg:py-14">
      <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 lg:mb-10">
          <p className="inline-flex w-fit rounded-full border border-[#0D4E86]/20 bg-white px-4 py-1 text-xs font-semibold tracking-[0.18em] text-[#0D4E86] uppercase">
            Archive Collection
          </p>
          <h1 className="text-3xl font-extrabold tracking-wide text-[#092B4A] sm:text-4xl lg:text-5xl">
            Archive Articles
          </h1>
          <p className="text-sm text-[#5C7D9D]">Browse past stories grouped by year.</p>
        </div>

        {loading ? (
          <Loader height="h-[60vh]" />
        ) : articles.length === 0 ? (
          <div className="rounded-2xl border border-[#d4e4f2] bg-white p-8 text-center text-[#5C7D9D]">
            No archive articles available.
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((yearGroup) => {
              const isOpen = openYear === yearGroup.year;

              return (
                <article
                  key={yearGroup.year}
                  className="overflow-hidden rounded-2xl border border-[#d4e4f2] bg-white shadow-[0_10px_24px_rgba(20,56,92,0.08)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenYear(isOpen ? null : yearGroup.year)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-[#F2F8FF] sm:px-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-[#EAF5FF] px-3 py-1 text-xs font-bold text-[#0D4E86]">
                        {yearGroup.articles.length} article{yearGroup.articles.length > 1 ? 's' : ''}
                      </span>
                      <h2 className="text-xl font-bold text-[#0A3257]">{yearGroup.year}</h2>
                    </div>
                    <span className={`text-[#0D4E86] transition ${isOpen ? 'rotate-180' : ''}`}>v</span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#e4edf5] px-5 py-4 sm:px-6">
                      <div className="space-y-3">
                        {yearGroup.articles.map((item) => (
                          <div
                            key={`${yearGroup.year}-${item.slug}`}
                            className="rounded-xl border border-[#e4edf5] bg-[#fbfdff] px-4 py-3 transition hover:border-[#c5dced]"
                          >
                            <Link to={`/dost/${item.slug}`} className="font-semibold text-[#0A3257] hover:text-[#0D4E86]">
                              {item.title}
                            </Link>
                            <p className="mt-1 text-xs text-[#5C7D9D]">
                              {item.publication_date ? moment(item.publication_date).format('ll') : 'Published date unavailable'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArchiveIndex;
