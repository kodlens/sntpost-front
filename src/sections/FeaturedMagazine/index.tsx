import '../FeaturedMagazine/index.css';

import { Link } from 'react-router-dom';
import axios from 'axios';
import type { Magazine } from '../../types/magazine';
import { config } from '../../config/config';
import { useQuery } from '@tanstack/react-query';
import ErrorComponent from '../../components/ErrorComponent';

export default function FeaturedMagazine() {
  const { data, error, isLoading } = useQuery<Magazine>({
    queryKey: ['magazine'],
    queryFn: async () => {
      const res = await axios.get<Magazine>(`${config.baseUri}/api/magazines/load-featured-magazine`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${config.apiToken}`,
        },
      });

      return res.data;
    },
  });

  if (error) {
    return <ErrorComponent />;
  }

  const truncateWords = (text: string, limit: number) => {
    const clean = text.trim();
    if (!clean) return '';

    const words = clean.split(/\s+/);
    if (words.length <= limit) return clean;
    return `${words.slice(0, limit).join(' ')}...`;
  };

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ');

  if (isLoading) {
    return (
      <section className="mt-15 mb-10 w-full px-4 lg:px-8">
        <div className="mx-auto h-[430px] w-full max-w-[1240px] animate-pulse rounded-2xl bg-gray-200/70" />
      </section>
    );
  }

  if (!data) {
    return null;
  }

  const coverUrl = data.cover ? `${config.baseUri}/storage/magazines/${data.cover}` : '';
  const excerptText = truncateWords(stripHtml(data.excerpt ?? ''), 55);

  return (
    <section className="mt-15 mb-10 w-full px-4 lg:px-8">
      <div className="relative mx-auto w-full max-w-[1240px] overflow-hidden rounded-3xl bg-[#101d2f] p-5 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] lg:p-10">
        <div className="pointer-events-none absolute -top-20 -left-14 h-52 w-52 rounded-full bg-[#2D79D3]/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#80CAEE]/25 blur-3xl" />

        <div className="relative flex flex-col items-center gap-7 lg:flex-row lg:items-start lg:gap-12">
          <Link to={`/magazines/flipbook/${data.slug}`} className="group shrink-0">
            <div className="rounded-2xl bg-white/10 p-2 shadow-2xl ring-1 ring-white/20 transition duration-300 group-hover:-translate-y-1">
              <div
                className="h-[390px] w-[280px] rounded-xl bg-[#1f3047]"
                style={{
                  backgroundImage: coverUrl ? `url(${coverUrl})` : undefined,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          </Link>

          <div className="w-full lg:pt-2">
            <p className="mb-3 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.18em] uppercase text-white/85">
              Featured Magazine
            </p>
            <h2 className="text-center text-3xl leading-tight font-bold text-white lg:text-left lg:text-5xl">
              {data.title}
            </h2>
            <p className="mt-3 text-center text-sm text-white/80 lg:text-left">
              Quarter {data.quarter} - {data.year}
            </p>
            <p className="mt-6 text-center text-base leading-8 text-white/90 lg:text-left">
              {excerptText || 'Discover this featured issue from S&T Post.'}
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                to={`/magazines/flipbook/${data.slug}`}
                className="rounded-full bg-[#80CAEE] px-6 py-3 text-sm font-bold text-[#07345f] transition hover:bg-[#9ad8f4]"
              >
                Read Featured Issue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
