import Slider from 'react-slick';
import './index.css';
import ReactPlayer from 'react-player/youtube';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { config } from '../../config/config';
import ErrorComponent from '../../components/ErrorComponent';

interface Video {
  id?: number;
  title?: string;
  description?: string;
  link: string;
}

interface DostvData {
  dostv: {
    title: string;
    description: string;
    featured_image: string;
    website: string;
    link: string;
  };

  videos: Video[];
}

interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

const DostV: React.FC = () => {
  const { data, error, isLoading } = useQuery<DostvData, AxiosError<ApiErrorResponse>>({
    queryKey: ['dostvs'],
    queryFn: async (): Promise<DostvData> => {
      const res = await axios.get<DostvData>(`${config.baseUri}/api/dostv/load-dostv`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${config.apiToken}`,
        },
      });

      return res.data;
    },
  });

  if (error) {
    console.error(error.response?.data.message);
    console.error(error.response?.data.errors);

    return (
      <section className="w-full px-4 py-12 lg:px-8">
        <ErrorComponent title="Failed to load DOSTv section" />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full bg-[#0a2b4e] py-14 lg:py-18">
        <div className="mx-auto w-full max-w-[1240px] animate-pulse px-4 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-[420px] rounded-3xl bg-white/20" />
            <div className="h-[420px] rounded-3xl bg-white/20" />
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  const bannerUrl = data.dostv.featured_image
    ? `${config.baseUri}/storage/dostv/banners/${data.dostv.featured_image}`
    : '';

  const settings = {
    dots: true,
    infinite: data.videos.length > 1,
    slidesToShow: 1,
    autoplay: data.videos.length > 1,
    speed: 550,
    adaptiveHeight: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <section className="dostv-section relative w-full overflow-hidden bg-[#0a2b4e] py-14 lg:py-18">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-8 left-[6%] h-52 w-52 rounded-full bg-[#80CAEE]/25 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#2D79D3]/30 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-4 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 lg:mb-10">
          <p className="inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-white/90 uppercase">
            Media and Video
          </p>
          <h2 className="text-3xl font-extrabold tracking-wide text-white sm:text-4xl lg:text-5xl">
            DOST<span className="text-[#80CAEE]">v</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-4 shadow-[0_16px_45px_rgba(0,0,0,0.25)] backdrop-blur-sm lg:p-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/20">
              <div
                className="h-[280px] w-full bg-cover bg-center sm:h-[360px] lg:h-[420px]"
                style={{
                  backgroundImage: bannerUrl ? `url(${bannerUrl})` : undefined,
                }}
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-full bg-[#80CAEE] px-6 py-2 text-sm font-bold text-[#07345f] transition hover:bg-[#9ad8f4]"
                target="_blank"
                rel="noreferrer"
                href={data.dostv.website || '#'}
              >
                Learn More
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-2 text-sm font-bold text-white transition hover:bg-white/10"
                target="_blank"
                rel="noreferrer"
                href={data.dostv.link || '#'}
              >
                Visit YouTube
              </a>
            </div>
          </article>

          <article className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-[0_16px_45px_rgba(0,0,0,0.25)] backdrop-blur-sm lg:p-6">
            <p className="mb-4 text-sm leading-7 text-white/90">
              {data.dostv.description}
            </p>

            <div className="overflow-hidden rounded-2xl border border-white/20 bg-black/20 p-2">
              {data.videos.length > 0 ? (
                <Slider {...settings}>
                  {data.videos.map((video) => (
                    <div key={video.id ?? video.link} className="px-1">
                      <div className="overflow-hidden rounded-xl">
                        <ReactPlayer
                          width="100%"
                          height={260}
                          url={video.link}
                          controls
                        />
                      </div>
                      {video.title && (
                        <p className="mt-3 px-1 text-sm font-semibold text-white">{video.title}</p>
                      )}
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="flex h-[260px] items-center justify-center rounded-xl bg-black/25 text-sm text-white/80">
                  No videos available right now.
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default DostV;
