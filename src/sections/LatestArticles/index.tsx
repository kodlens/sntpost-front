import axios from 'axios';
import { Link } from 'react-router-dom';
import type { Article } from '../../types/article';
import { config } from '../../config/config';
import { useQuery } from '@tanstack/react-query';
import ErrorComponent from '../../components/ErrorComponent';

export default function LatestArticles() {
    const { data, error, isLoading } = useQuery<Article[]>({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axios.get<Article[]>(`${config.baseUri}/api/articles/load-latest-articles`, {
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${config.apiToken}`
                }
            })

            return res.data
        }

    })

    if (error) {
        return (
            <section className="w-full px-4 py-12 lg:px-8">
                <ErrorComponent title="Failed to load latest articles" />
            </section>
        );
    }

    const truncate = (text: string, limit: number) => {
        const cleanText = (text ?? '').trim();
        if (!cleanText) return '';

        const words = cleanText.split(/\s+/);
        if (words.length > limit) {
            return `${words.slice(0, limit).join(' ')}...`;
        }
        return cleanText;
    }

    if (isLoading) {
        return (
            <section className="w-full bg-[#f8fbff] py-14 lg:py-18">
                <div className="mx-auto w-full max-w-[1240px] animate-pulse px-4 lg:px-8">
                    <div className="mb-8 h-10 w-56 rounded bg-slate-200" />
                    <div className="grid gap-5 lg:grid-cols-12">
                        <div className="h-[560px] rounded-3xl bg-slate-200 lg:col-span-7" />
                        <div className="space-y-4 lg:col-span-5">
                            <div className="h-[130px] rounded-2xl bg-slate-200" />
                            <div className="h-[130px] rounded-2xl bg-slate-200" />
                            <div className="h-[130px] rounded-2xl bg-slate-200" />
                            <div className="h-[130px] rounded-2xl bg-slate-200" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!data || data.length === 0) {
        return null;
    }

    const leadArticle = data[0];
    const listArticles = data.slice(1, 7);

    const imageUrl = (image?: string) =>
        `${config.baseUri}/storage/featured_images/${image ? image : 'img/no-img.png'}`;


    return (
        <section className="w-full bg-[#f8fbff] py-14 lg:py-18">
            <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
                <div className="mb-8 flex flex-col gap-3 lg:mb-10">
                    <p className="inline-flex w-fit rounded-full border border-[#0D4E86]/20 bg-white px-4 py-1 text-xs font-semibold tracking-[0.18em] text-[#0D4E86] uppercase">
                        Breaking and Recent
                    </p>
                    <h2 className="text-3xl font-extrabold tracking-wide text-[#092B4A] sm:text-4xl lg:text-5xl">
                        Latest Articles
                    </h2>
                </div>

                <div className="grid gap-5 lg:grid-cols-12">
                    <article className="group relative overflow-hidden rounded-3xl border border-[#d4e4f2] bg-white shadow-[0_14px_35px_rgba(20,56,92,0.12)] lg:col-span-7">
                        <div
                            className="h-[310px] w-full bg-cover bg-center transition duration-700 group-hover:scale-105 sm:h-[360px] lg:h-[430px]"
                            style={{
                                backgroundImage: `url(${imageUrl(leadArticle.featured_image)})`,
                            }}
                        />
                        <div className="p-6 lg:p-8">
                            <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-[#0D4E86] uppercase">
                                {leadArticle.category?.title || 'Science & Technology'}
                            </p>
                            <h3 className="text-2xl leading-tight font-bold text-[#0A3257] sm:text-3xl">
                                <Link to={`/dost/${leadArticle.slug}`} className="hover:text-[#0D4E86]">
                                    {truncate(leadArticle.title ?? '', 18)}
                                </Link>
                            </h3>
                            <p className="mt-4 text-sm leading-7 text-[#35516d] sm:text-base">
                                {truncate(leadArticle.excerpt ?? '', 40)}
                            </p>
                            <div className="mt-6 flex items-center justify-between gap-3">
                                <span className="text-xs font-semibold tracking-[0.1em] text-[#5C7D9D] uppercase">
                                    {leadArticle.publication_date_readable || 'Latest Update'}
                                </span>
                                <Link
                                    to={`/dost/${leadArticle.slug}`}
                                    className="inline-flex rounded-full bg-[#0D4E86] px-6 py-2 text-sm font-bold text-white transition hover:bg-[#0B3F6D]"
                                >
                                    Read Story
                                </Link>
                            </div>
                        </div>
                    </article>

                    <div className="space-y-4 lg:col-span-5">
                        {listArticles.map((article: Article, index: number) => (
                            <article key={article.id} className="group overflow-hidden rounded-2xl border border-[#d4e4f2] bg-white shadow-[0_12px_28px_rgba(20,56,92,0.1)]">
                                <div className="flex gap-3 p-3">
                                    <div
                                        className="h-[96px] w-[120px] shrink-0 rounded-xl bg-cover bg-center transition duration-700 group-hover:scale-105"
                                        style={{
                                            backgroundImage: `url(${imageUrl(article.featured_image)})`,
                                        }}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="mb-1 text-[10px] font-semibold tracking-[0.16em] text-[#5C7D9D] uppercase">
                                            {article.category?.title || 'Article'}
                                        </p>
                                        <h3 className="line-clamp-2 text-base leading-tight font-bold text-[#0A3257]">
                                            <Link to={`/dost/${article.slug}`} className="hover:text-[#0D4E86]">
                                                {truncate(article.title ?? '', 12)}
                                            </Link>
                                        </h3>
                                        <p className="mt-2 text-xs text-[#5C7D9D]">
                                            {article.publication_date_readable || `Story ${index + 1}`}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}

                        <article className="rounded-2xl border border-dashed border-[#0D4E86]/30 bg-[#EAF5FF] p-4">
                            <p className="mb-3 text-sm font-semibold text-[#35516d]">
                                Catch up on all recent science and technology stories.
                            </p>
                            <Link
                                to="/archives"
                                className="inline-flex items-center gap-2 rounded-full bg-[#0D4E86] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0B3F6D]"
                            >
                                Browse Archive
                                <span aria-hidden="true">-&gt;</span>
                            </Link>
                        </article>
                    </div>
                </div>

                {/* Supplemental cards for extra density on larger feeds */}
                {data.length > 7 && (
                    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {data.slice(7, 10).map((article: Article) => (
                            <article key={article.id} className="group overflow-hidden rounded-2xl border border-[#d4e4f2] bg-white shadow-[0_12px_28px_rgba(20,56,92,0.1)]">
                                <div
                                    className="h-[170px] w-full bg-cover bg-center transition duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${imageUrl(article.featured_image)})`,
                                    }}
                                />
                                <div className="p-4">
                                    <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-[#5C7D9D] uppercase">
                                        {article.category?.title || 'Article'}
                                    </p>
                                    <h3 className="text-lg leading-tight font-bold text-[#0A3257]">
                                        <Link to={`/dost/${article.slug}`} className="hover:text-[#0D4E86]">
                                            {truncate(article.title ?? '', 12)}
                                        </Link>
                                    </h3>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
