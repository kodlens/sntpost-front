import axios from 'axios';
import type { Videos } from '../../types/videos';
import Card from '../FeaturedVideo/card';
import { useQuery } from '@tanstack/react-query';
import { config } from '../../config/config';
import ErrorComponent from '../../components/ErrorComponent';

const FeaturedVideoTwoLayout: React.FC = () => {
  const { data, error, isLoading } = useQuery<Videos[]>({
    queryKey: ['featured_videos'],
    queryFn: async () => {
      const res = await axios.get<Videos[]>(`${config.baseUri}/api/videos/load-featured-videos`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${config.apiToken}`,
        },
      });
      return res.data;
    },
  });

  if (error) {
    return (
      <section className="w-full px-4 py-12 lg:px-8">
        <ErrorComponent title="Failed to load featured videos" />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full bg-[#f8fbff] py-14 lg:py-18">
        <div className="mx-auto w-full max-w-[1240px] animate-pulse px-4 lg:px-8">
          <div className="mb-8 h-10 w-64 rounded bg-slate-200" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-[300px] rounded-2xl bg-slate-200" />
            <div className="h-[300px] rounded-2xl bg-slate-200" />
            <div className="h-[300px] rounded-2xl bg-slate-200" />
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#f8fbff] py-14 lg:py-18">
      <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 lg:mb-10">
          <p className="inline-flex w-fit rounded-full border border-[#0D4E86]/20 bg-white px-4 py-1 text-xs font-semibold tracking-[0.18em] text-[#0D4E86] uppercase">
            Video Highlights
          </p>
          <h2 className="text-3xl leading-snug font-extrabold tracking-wide text-[#092B4A] sm:text-4xl lg:text-5xl">
            Featured <span className="text-[#0D4E86]">Videos</span>
          </h2>
          <p className="max-w-[70ch] text-sm leading-7 text-[#35516d] sm:text-base">
            Watch the latest events about DOST's programs, products, and services.
          </p>
          <div>
            <a
              className="inline-flex items-center gap-2 rounded-full bg-[#0D4E86] px-6 py-2 text-sm font-bold text-white transition hover:bg-[#0B3F6D]"
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/@DOSTvPH/videos"
            >
              Visit DOSTv Channel
              <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.map((video) => (
            <Card key={video.id} card={video} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideoTwoLayout;
