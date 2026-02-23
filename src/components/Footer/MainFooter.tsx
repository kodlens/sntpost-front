import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { config } from '../../config/config';
import type { Category } from '../../types/category';
import Copyright from './Copyright';

const MainFooter: React.FC = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get<Category[]>(`${config.baseUri}/api/load-categories`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${config.apiToken}`,
        },
      });

      return res.data;
    },
  });

  return (
    <footer className="w-full bg-[#0f1722] px-4 py-12 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-white/85 uppercase">
              S&T Post
            </p>
            <h3 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
              Science and Technology Stories for Everyone
            </h3>
            <p className="mt-4 max-w-[60ch] text-sm leading-7 text-white/70 sm:text-base">
              Stay connected with DOST programs, innovations, and updates from around the country.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold tracking-[0.14em] text-white uppercase">Visit Us</h4>
            <a
              href="https://www.facebook.com/profile.php?id=61567961533594"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/90 transition hover:bg-white/10"
            >
              <img src="/socials/icons8-facebook-50.png" width={20} alt="Facebook" />
              S&T Facebook Page
            </a>

            <h4 className="mt-7 mb-4 text-sm font-bold tracking-[0.14em] text-white uppercase">Contact Us</h4>
            <a
              href="mailto:dost.digest@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/90 transition hover:bg-white/10"
            >
              <img src="/socials/icons8-email-50.png" width={18} alt="Email" />
              dost.digest@gmail.com
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold tracking-[0.14em] text-white uppercase">Categories</h4>
            {isLoading ? (
              <p className="text-sm text-white/70">Loading categories...</p>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {categories?.slice(0, 12).map((item) => (
                  <Link
                    to={`/category/${item.slug}`}
                    className="text-sm text-white/85 transition hover:text-[#80CAEE]"
                    key={item.id}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <Copyright />
      </div>
    </footer>
  );
};

export default MainFooter;
