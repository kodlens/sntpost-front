import './index.css';
import axios from 'axios';
import { config } from '../../config/config';
import { useQuery } from '@tanstack/react-query';
import ErrorComponent from '../../components/ErrorComponent';
import type { Magazine } from '../../types/magazine';

const MainBanner: React.FC = () => {


  // const { data, error } = useQuery<Banner>({
  //   queryKey: ['banner'],
  //   queryFn: async () => {
  //     const res = await axios.get<Banner>(`${config.baseUri}/api/load-banner`, {
  //       headers: {
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${config.apiToken}`,
  //       },
  //     });
  //     return res.data;
  //   },
  // });

  const { data, error } = useQuery({
        queryKey: ['magazine'],
        queryFn: async () => {
            const res = await axios.get<Magazine>(`${config.baseUri}/api/magazines/load-featured-magazine`, {
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${config.apiToken}`
                }
            })

            return res.data
        }

    })

  if (error) {
    return <ErrorComponent />;
  }

  const imageUrl = data?.cover
    ? `${config.baseUri}/storage/magazines/${data.cover}`
    : undefined;

  return (
    <section className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-[#031b37]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#80CAEE]/30 blur-3xl" />
        <div className="absolute top-[35%] left-[42%] h-64 w-64 rounded-full bg-[#2D79D3]/40 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#5AA5FF]/25 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center gap-10 px-6 py-16 text-white lg:flex-row lg:justify-between lg:gap-14 lg:px-8 lg:py-20">
        <div className="w-full lg:max-w-[640px]">
          <p className="mb-4 inline-block rounded-full border border-white/35 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.2em] uppercase">
            S&amp;T Post
          </p>
          <h1 className="text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-7xl">
            Don&apos;t miss out on the best S&amp;T stories from around the country
          </h1>
          <p className="mt-6 max-w-[58ch] text-sm text-white/85 sm:text-base">
            Fresh science and technology stories, discoveries, and innovation highlights delivered in one place.
          </p>
          <div className="mt-8">
            <button
              type="button"
              className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#0D4E86] transition hover:bg-[#EAF6FF]"
            >
              Explore Stories
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-[360px] shrink-0 sm:max-w-[430px] lg:max-w-[470px]">
          <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-2xl border border-white/15 bg-black/25" />
          <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="S&T magazine cover"
                loading="lazy"
                className="h-[460px] w-full rounded-xl object-cover sm:h-[520px]"
              />
            ) : (
              <div className="flex h-[460px] w-full items-center justify-center rounded-xl bg-black/25 text-sm text-white/80 sm:h-[520px]">
                Magazine cover
              </div>
            )}
          </div>
          <div className="absolute -right-6 -bottom-6 rounded-xl border border-white/25 bg-[#0D4E86]/80 px-4 py-3 text-xs uppercase tracking-[0.18em]">
            Latest Issue
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
