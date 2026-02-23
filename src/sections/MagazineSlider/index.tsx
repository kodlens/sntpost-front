import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

import '../../../node_modules/swiper/swiper.css';
import '../../../node_modules/swiper/modules/effect-coverflow-element.min.css';
import '../../../node_modules/swiper/modules/navigation.min.css';
import '../../../node_modules/swiper/modules/pagination.min.css';

import { Link } from 'react-router-dom';
import axios from 'axios';

import './index.css';
import type { Magazine } from '../../types/magazine';
import { config } from '../../config/config';
import { useQuery } from '@tanstack/react-query';
import ErrorComponent from '../../components/ErrorComponent';

export default function MagazineSlider() {
  const { data, error, isLoading } = useQuery<Magazine[]>({
    queryKey: ['magazines'],
    queryFn: async () => {
      const res = await axios.get<Magazine[]>(`${config.baseUri}/api/magazines/load-magazines`, {
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
        <ErrorComponent title="Failed to load magazine archives" />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full bg-[#eef5fc] py-14 lg:py-18">
        <div className="mx-auto w-full max-w-[1240px] animate-pulse px-4 lg:px-8">
          <div className="mb-8 h-10 w-64 rounded bg-slate-200" />
          <div className="h-[500px] rounded-3xl bg-slate-200" />
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <section className="w-full bg-[#eef5fc] py-14 lg:py-18">
      <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 lg:mb-10">
          <p className="inline-flex w-fit rounded-full border border-[#0D4E86]/20 bg-white px-4 py-1 text-xs font-semibold tracking-[0.18em] text-[#0D4E86] uppercase">
            Journals and Issues
          </p>
          <h2 className="text-3xl font-extrabold tracking-wide text-[#092B4A] sm:text-4xl lg:text-5xl">
            S&amp;T Post Archives
          </h2>
        </div>

        <div className="rounded-3xl border border-[#d4e4f2] bg-white p-4 shadow-[0_16px_45px_rgba(20,56,92,0.12)] lg:p-6">
          <Swiper
            effect="coverflow"
            grabCursor
            pagination={{ clickable: true }}
            centeredSlides
            navigation
            loop
            slidesPerView={1}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 180,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination, EffectCoverflow, Navigation]}
            className="magazine-swiper"
          >
            {data.map((magazine) => (
              <SwiperSlide key={magazine.id}>
                <Link to={`/magazines/flipbook/${magazine.slug}`} className="block">
                  <article className="group rounded-2xl border border-[#d4e4f2] bg-[#f9fcff] p-3">
                    <div
                      className="h-[420px] w-full rounded-xl bg-[#dbe8f5] shadow-sm transition duration-500 group-hover:scale-[1.01] lg:h-[480px]"
                      style={{
                        backgroundImage: `url(${config.baseUri}/storage/magazines/${magazine.cover})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    <div className="px-1 pt-3 pb-1">
                      <h3 className="line-clamp-1 text-sm font-bold text-[#0A3257] lg:text-base">{magazine.title}</h3>
                      <p className="mt-1 text-xs font-medium text-[#5C7D9D]">
                        Quarter {magazine.quarter} - {magazine.year}
                      </p>
                    </div>
                  </article>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm font-semibold tracking-[0.08em] text-[#5C7D9D] uppercase">2022 - {currentYear}</p>
          <a
            href="https://www.stii.dost.gov.ph/projects/s-t-publications/2015-10-28-06-07-25"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#0D4E86]/20 bg-white px-5 py-2 text-sm font-semibold text-[#0D4E86] transition hover:bg-[#EAF5FF]"
          >
            See More
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
