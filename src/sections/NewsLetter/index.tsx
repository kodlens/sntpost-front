import { useState } from 'react';
import NewsLetterImg from '../../Svg/NewsLetterImg';
import axios from 'axios';
import './index.css';
import Spinner from '../../Svg/Spinner';
import { config } from '../../config/config';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const NewsLetter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [notif, setNotif] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ message?: string } | null>(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleClickSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setNotif(false);
    setErrors(null);

    try {
      if (!executeRecaptcha) {
        setErrors({ message: 'Recaptcha not yet available.' });
        setLoading(false);
        return;
      }

      const token = await executeRecaptcha('form_submit');
      if (!token) {
        setErrors({ message: 'Invalid submission.' });
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${config.baseUri}/api/subscribe-me`,
        {
          email,
          age,
          recaptcha: token,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${config.apiToken}`,
          },
        },
      );

      if (res.data.status === 'saved') {
        setNotif(true);
        setEmail('');
        setAge('');
      }
    } catch (err: any) {
      setErrors(err?.response?.data ?? { message: 'Failed to submit your subscription.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#f8fbff] py-14 lg:py-18">
      <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-[#d4e4f2] bg-white shadow-[0_16px_45px_rgba(20,56,92,0.12)]">
          <div className="grid gap-6 p-6 lg:grid-cols-2 lg:p-10">
            <div className="flex flex-col justify-center">
              <p className="inline-flex w-fit rounded-full border border-[#0D4E86]/20 bg-[#EAF5FF] px-4 py-1 text-xs font-semibold tracking-[0.18em] text-[#0D4E86] uppercase">
                Stay Updated
              </p>
              <h2 className="mt-4 text-3xl leading-tight font-extrabold text-[#092B4A] sm:text-4xl">
                Get Our Newsletter
              </h2>
              <p className="mt-4 max-w-[56ch] text-sm leading-7 text-[#35516d] sm:text-base">
                Get updates on the newest design stories, case studies, and tips right in your mailbox.
                <span className="font-bold text-[#0D4E86]"> Subscribe now.</span>
              </p>
              <div className="mt-5 max-w-[280px]">
                <NewsLetterImg height="260" width="260" />
              </div>
            </div>

            <div className="rounded-2xl border border-[#dbe8f4] bg-[#f9fcff] p-5 lg:p-6">
              <form id="form_submit" onSubmit={handleClickSubscribe} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="newsletter" className="text-sm font-bold text-[#0A3257]">
                    Email
                  </label>
                  <input
                    id="newsletter"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-[#c7dced] bg-white px-4 py-3 text-sm text-[#123b60] outline-none transition focus:border-[#0D4E86] focus:ring-2 focus:ring-[#0D4E86]/15"
                    placeholder="e.g. juandelacruz@mail.com"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="age" className="text-sm font-bold text-[#0A3257]">
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    min={1}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="block w-full rounded-xl border border-[#c7dced] bg-white px-4 py-3 text-sm text-[#123b60] outline-none transition focus:border-[#0D4E86] focus:ring-2 focus:ring-[#0D4E86]/15"
                    placeholder="e.g. 25"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#0D4E86] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0B3F6D] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex justify-center">
                      <Spinner />
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>

              {notif ? (
                <div className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-800" role="alert">
                  <span className="font-medium">Email submitted.</span> Your subscription has been saved.
                </div>
              ) : null}

              {errors ? (
                <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800" role="alert">
                  <span className="font-medium">Error:</span> {errors.message || 'Please try again.'}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
