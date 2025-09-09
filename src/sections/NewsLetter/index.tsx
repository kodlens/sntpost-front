import { useState } from "react";
import NewsLetterImg from "../../Svg/NewsLetterImg"
import axios from "axios";
import './index.css'
import Spinner from "../../Svg/Spinner";
import { config } from "../../config/config";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";



const NewsLetter: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [age, setAge] = useState<string>('');

    const { executeRecaptcha } = useGoogleReCaptcha();

    const [loading, setLoading] = useState<boolean>(false);
    const [notif, setNotif] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>(null);


    const handleClickSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        setNotif(false)
        setErrors(null)

        if (!executeRecaptcha) {
            setErrors({
                message: 'Reacaptcha noy yet available'
            })
            console.log("Recaptcha not yet available");
            setLoading(false)
            return;
        }

        const token = await executeRecaptcha('form_submit');
        if(!token){
            setErrors('Invalid submission!.')
            return;
        }

        axios.post(`${config.baseUri}/api/subscribe-me`, {
            email: email,
            age: age,
            recaptcha: token,
        },
            {
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${config.apiToken}`
                }
            }
        ).then(res => {
            if (res.data.status === 'saved') {
                setNotif(true)
                setLoading(false)
                setEmail('')
            }
        }).catch(err => {
            setLoading(false)
            setErrors(err.response.data)
        })
    }


    return (
        <section className="lg:w-7xl lg:mx-auto mx-2 my-28">
            <div className="mt-p32 mb-p43 mx-auto max-w-3xl p-6">
                <div className='flex flex-col md:flex-row justify-center gap-4 items-center'>
                    <div className='flex'>
                        <NewsLetterImg height='350' width='350' />
                    </div>
                    <div className='flex flex-col items-center md:items-start mb-6'>
                        <div className='font-bold text-red-700'>GET OUR</div>
                        <div className='text-[2.3rem] font-extrabold'>NEWS LETTER</div>
                        <div className='mt-4'>
                            Get updates on the newest design stories, case studies and tips right in your mailbox. <span className='font-bold'>Subscribe now!</span>
                        </div>
                    </div>
                </div>

                <form id="form_submit" onSubmit={handleClickSubscribe}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="newsletter" className='font-bold'>Email</label>
                        <input id='newsletter'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-600 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            placeholder='e.g. juandelacruz@mail.com' required />


                    </div>

                    <div className="flex flex-col gap-2 mt-2 mb-2">
                        <label htmlFor="age" className='font-bold'>Age</label>
                        <input id='age'
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-600 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            placeholder='e.g. 25' />
                    </div>

                    <button type="submit" className='mt-2 text-white font-bold bg-red-700 p-[12px] hover:bg-red-500 hover:cursor-pointer transform duration-150 focus:outline-2 focus:outline-offset-2 focus:outline-red-700 active:bg-red-600'>
                        {loading ?
                            <div className="flex justify-center">
                                <Spinner />
                            </div> :
                            'SUBSCRIBE'
                        }
                    </button>
                </form>

                {notif ? (
                    <div className="mt-2 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                        <span className="font-medium">Email Submitted!</span> Your email has been successfully submitted.
                    </div>

                ) : ''}

                {errors ? (
                    <div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        <span className="font-medium">ERROR!</span> {errors.message}
                    </div>

                ) : ''}

            </div>
        </section>


    )
}


export default NewsLetter