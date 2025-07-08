import { useState } from "react";
import NewsLetterImg from "../../Svg/NewsLetterImg"
import axios from "axios";

const NewsLetter:React.FC = ()  => {
    const [email, setEmail] = useState<string>('');
    const handleClickSubscribe = () => {
        axios.post('/api/subscribe-me', {
            email: email
        }).then(res => {
            if(res.data.status === 'saved'){
                
            }
        })
    }

    return (
    <section className="lg:w-7xl lg:mx-auto mx-2 my-28">
        <div className="mt-p32 mb-p43 mx-auto max-w-3xl p-6">
            <div className='flex flex-col md:flex-row justify-center gap-4 items-center'>
                <div className='flex'>
                    <NewsLetterImg height='350' width='350'/>
                </div>
                <div className='flex flex-col items-center md:items-start mb-6'>
                    <div className='font-bold text-red-700'>GET OUR</div>
                    <div className='text-[2.3rem] font-extrabold'>NEWS LETTER</div>
                    <div className='mt-4'>
                        Get updates on the newest design stories, case studies and tips right in your mailbox. <span className='font-bold'>Subscribe now!</span>
                    </div>
                </div>
            </div>

            
            <div className='flex flex-col gap-2'>
                <label htmlFor="newsletter" className='font-bold'>Email</label>
                <input type='text' id='newsletter' 
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-600 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' 
                    placeholder='e.g. juandelacruz@mail.com' />
                <button className='mt-2 text-white font-bold bg-red-700 p-[12px] hover:bg-red-500 hover:cursor-pointer transform duration-150 focus:outline-2 focus:outline-offset-2 focus:outline-red-700 active:bg-red-600'
                    onClick={handleClickSubscribe}>
                    SUBSCRIBE</button>
            </div>
        </div>
    </section>
  )
}


export default NewsLetter