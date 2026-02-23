import axios from "axios";
import { Link } from "react-router-dom";
import { config } from "../../config/config";
import type { Article } from "../../types/article";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../../components/ErrorComponent";


const FeaturedArticles: React.FC = () => {

    const { data, error, isLoading } = useQuery<Article[]>({
        queryKey: ['featured_articles'],
        queryFn: async () => {
            const res = await axios.get<Article[]>(`${config.baseUri}/api/articles/load-featured-articles`, {
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${config.apiToken}`
                }
            })
            return res.data
        }
    });

    const truncate = (text: string, limit: number) => {
        const cleanText = (text ?? '').trim();
        if (!cleanText) return '';

        const words = cleanText.split(/\s+/);
        if (words.length > limit) {
            return `${words.slice(0, limit).join(' ')}...`;
        }

        return cleanText;
    }

    const getImageUrl = (image?: string) =>
        `${config.baseUri}/storage/featured_images/${image ? image : 'img/no-img.png'}`;

    const featured = data?.[0];
    const sideCards = data?.slice(1, 5) ?? [];

    if (error) {
        return (
            <section className="w-full px-4 py-12 lg:px-8">
                <ErrorComponent title="Failed to load featured articles" />
            </section>
        );
    }

    if (isLoading) {
        return (
            <section className="w-full px-4 py-14 lg:px-8">
                <div className="mx-auto max-w-[1240px] animate-pulse">
                    <div className="mb-8 h-10 w-56 rounded bg-slate-200" />
                    <div className="grid gap-4 lg:grid-cols-2">
                        <div className="h-[560px] rounded-2xl bg-slate-200" />
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="h-[270px] rounded-2xl bg-slate-200" />
                            <div className="h-[270px] rounded-2xl bg-slate-200" />
                            <div className="h-[270px] rounded-2xl bg-slate-200" />
                            <div className="h-[270px] rounded-2xl bg-slate-200" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!data || data.length === 0 || !featured) {
        return null;
    }

    return (
        <section className="relative w-full overflow-hidden bg-[#F4F8FC] pt-14 pb-8 lg:pt-20 lg:pb-10">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-[#80CAEE]/30 blur-3xl" />
                <div className="absolute right-[-40px] bottom-[-30px] h-72 w-72 rounded-full bg-[#2D79D3]/15 blur-3xl" />
            </div>

            <div className="relative mx-auto w-full max-w-[1240px] px-4 lg:px-8">
                <div className="mb-8 flex flex-col gap-3 lg:mb-10">
                    <p className="inline-flex w-fit rounded-full border border-[#0D4E86]/20 bg-white px-4 py-1 text-xs font-semibold tracking-[0.18em] text-[#0D4E86] uppercase">
                        Editorial Picks
                    </p>
                    <h2 className="text-3xl font-extrabold tracking-wide text-[#092B4A] sm:text-4xl lg:text-5xl">
                        S&amp;T Updates
                    </h2>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                    <article className="group overflow-hidden rounded-3xl border border-[#d4e4f2] bg-white shadow-[0_16px_45px_rgba(20,56,92,0.12)]">
                        <div
                            className="h-[320px] w-full bg-cover bg-center transition duration-700 group-hover:scale-105 sm:h-[360px] lg:h-[380px]"
                            style={{
                                backgroundImage: `url(${getImageUrl(featured.featured_image)})`,
                            }}
                        />
                        <div className="p-6 sm:p-8">
                            <p className="mb-3 inline-flex rounded-full bg-[#E8F4FF] px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-[#0D4E86] uppercase">
                                Featured Article
                            </p>
                            <h3 className="max-w-[24ch] text-2xl leading-tight font-bold text-[#0A3257] sm:text-3xl">
                                {truncate(featured.title ?? '', 16)}
                            </h3>
                            <p className="mt-4 max-w-[60ch] text-sm leading-7 text-[#35516d] sm:text-base">
                                {truncate(featured.excerpt ?? '', 20)}
                            </p>
                            <div className="mt-6">
                                <Link
                                    to={`/dost/${featured.slug}`}
                                    className="inline-flex rounded-full bg-[#0D4E86] px-6 py-2 text-sm font-bold text-white transition hover:bg-[#0B3F6D]"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </article>

                    <div className="flex flex-col gap-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {sideCards.map((item, idx) => (
                                <article key={item.id} className="group overflow-hidden rounded-2xl border border-[#d4e4f2] bg-white shadow-[0_12px_30px_rgba(20,56,92,0.1)]">
                                    <div
                                        className="h-[170px] w-full bg-cover bg-center transition duration-700 group-hover:scale-105"
                                        style={{
                                            backgroundImage: `url(${getImageUrl(item.featured_image)})`,
                                        }}
                                    />
                                    <div className="p-4">
                                        <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-[#5C7D9D] uppercase">
                                            Story {idx + 1}
                                        </p>
                                        <h3 className="text-lg leading-tight font-bold text-[#0A3257]">
                                            <Link to={`/dost/${item.slug}`} className="hover:text-[#0D4E86]">
                                                {truncate(item.title ?? '', 12)}
                                            </Link>
                                        </h3>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="rounded-2xl border border-[#d4e4f2] bg-white p-5 shadow-[0_12px_30px_rgba(20,56,92,0.1)]">
                            <p className="mb-3 text-sm font-semibold text-[#35516d]">
                                Explore more science and technology stories from our archive.
                            </p>
                            <Link
                                to="/archives"
                                className="inline-flex items-center gap-2 rounded-full bg-[#0D4E86] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0B3F6D]"
                            >
                                View More Updates
                                <span aria-hidden="true">-&gt;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default FeaturedArticles;
