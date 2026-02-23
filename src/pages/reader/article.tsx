import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { Clock } from 'lucide-react';

import './index.css';
import { FourOhFour } from '../404';
import { useCopyLink } from '../../lib/hooks/useCopyLink.ts';
import type { Post } from '../../types/article.ts';
import { config } from '../../config/config.ts';
import ArticleSkeleton from '../../components/Skeleton/ArticleSkeleton.tsx';

const Article: React.FC = () => {
  const params = useParams();
  const [article, setArticle] = useState<Post>();
  const [relatedArticles, setRelatedArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { showToast, handleCopyLink } = useCopyLink();

  const fetchArticle = async () => {
    if (!params.slug) return;

    setLoading(true);

    try {
      const resArticle = await axios.get<Post>(`${config.baseUri}/api/articles/fetch-article/${params.slug}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${config.apiToken}`,
        },
      });

      setArticle(resArticle.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedArticles = async () => {
    if (!article?.title) return;

    const resRelated = await axios.get<Post[]>(`${config.baseUri}/api/articles/load-related-articles/${article.title}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${config.apiToken}`,
      },
    });
    setRelatedArticles(resRelated.data);
  };

  useEffect(() => {
    fetchArticle();
  }, [params.slug]);

  useEffect(() => {
    if (article) {
      loadRelatedArticles();
    }
  }, [article?.title]);

  if (article?.isFailure) return <FourOhFour />;

  const authorLabel = article?.author_name
    ? article.author_name
    : `${article?.author?.lname ?? ''} ${article?.author?.fname ?? ''}`.trim();

  return (
    <section className="w-full bg-[#f8fbff] py-8 lg:py-12">
      <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
        {!article || loading ? (
          <ArticleSkeleton />
        ) : (
          <div className="grid gap-8 lg:grid-cols-12">
            <article className="lg:col-span-8">
              <div className="overflow-hidden rounded-3xl border border-[#d4e4f2] bg-white shadow-[0_14px_35px_rgba(20,56,92,0.1)]">
                {article.featured_image && (
                  <img
                    className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[440px]"
                    src={`${config.baseUri}/storage/featured_images/${article.featured_image}`}
                    alt={article.title}
                  />
                )}

                <div className="p-6 lg:p-8">
                  {article.category?.title && (
                    <p className="mb-3 inline-flex rounded-full bg-[#EAF5FF] px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-[#0D4E86] uppercase">
                      {article.category.title}
                    </p>
                  )}

                  <h1 className="text-2xl leading-tight font-extrabold text-[#0A3257] sm:text-3xl lg:text-4xl">{article.title}</h1>

                  {article.sub_title && article.sub_title !== 'null' && (
                    <h2 className="mt-3 text-lg leading-7 text-[#35516d] sm:text-xl">{article.sub_title}</h2>
                  )}

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-[#e4edf5] py-4">
                    <div>
                      <p className="text-sm font-semibold text-[#0A3257]">{authorLabel || 'S&T Post'}</p>
                      {article.publication_date && (
                        <p className="text-xs text-[#5C7D9D]">{moment(article.publication_date).format('ll')}</p>
                      )}
                    </div>

                    <div className="relative ml-auto">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-[#c7dced] px-3 py-1.5 text-sm font-semibold text-[#0D4E86] transition hover:bg-[#EAF5FF]"
                        onClick={handleCopyLink}
                      >
                        Share
                      </button>

                      <AnimatePresence>
                        {showToast && (
                          <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="absolute top-full right-0 mt-2 rounded-lg bg-[#0D4E86] px-3 py-1 text-xs font-medium text-white"
                          >
                            Copied
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {article.image_caption && article.image_caption !== 'null' && (
                    <blockquote className="mt-4 rounded-lg border-l-4 border-[#0D4E86] bg-[#f5f9ff] px-4 py-3 text-sm text-[#35516d]">
                      {article.image_caption}
                    </blockquote>
                  )}

                  <div
                    className="ck ck-content mt-6 text-[#1f344a]"
                    dangerouslySetInnerHTML={{ __html: article.description || '' }}
                  />
                </div>
              </div>
            </article>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 rounded-3xl border border-[#d4e4f2] bg-white p-5 shadow-[0_12px_28px_rgba(20,56,92,0.08)] lg:p-6">
                <h3 className="mb-4 text-lg font-bold text-[#0A3257]">Read Next Article</h3>

                <div className="space-y-4">
                  {relatedArticles
                    .filter((item) => item.id !== article?.id)
                    .slice(0, 6)
                    .map((related) => (
                      <article key={related.id} className="border-b border-[#e4edf5] pb-4 last:border-b-0 last:pb-0">
                        <h4 className="text-base leading-tight font-bold text-[#0A3257]">
                          <Link to={`/dost/${related.slug}`} className="hover:text-[#0D4E86]">
                            {related.title}
                          </Link>
                        </h4>

                        <div className="mt-2 flex items-center gap-2 text-xs text-[#5C7D9D]">
                          <Clock size={14} className="text-[#0D4E86]" />
                          <span>{moment(related.publication_date).format('ll')}</span>
                        </div>

                        <p className="mt-2 line-clamp-2 text-sm text-[#35516d]">{related.excerpt}</p>
                      </article>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default Article;
