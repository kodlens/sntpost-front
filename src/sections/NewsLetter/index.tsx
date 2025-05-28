import NewsLetterImg from "../../Svg/NewsLetterImg"

const NewsLetter:React.FC = ()  => {
  return (
    <section className="lg:w-[1240px] lg:mx-auto mx-2 my-p100">
        <div className="mt-p32 mb-p43 mx-auto max-w-3xl p-6">
            <div className='flex flex-col md:flex-row justify-center gap-4 items-center'>
                <div className='flex'>
                    <NewsLetterImg height='350' width='350'/>
                </div>
                <div className='flex flex-col items-center md:items-start mb-6'>
                    <div className='font-bold text-red-700'>GET OUR</div>
                    <div className='text-2xl font-extrabold text-primary'>NEWS LETTER</div>
                    <div className='mt-4'>
                        Get updates on the newest design stories, case studies and tips right in your mailbox. <span className='font-bold'>Subscribe now!</span>
                    </div>
                </div>
            </div>

            <label htmlFor="newsletter" className='font-bold'>Email</label>
            <div className='flex items-center justify-center'>
                <input type='text' id='newsletter' className='w-full' placeholder='e.g. juandelacruz@mail.com' />
                <button className='text-white text-sm font-bold bg-primary p-[12px]'>SUBSCRIBE</button>
            </div>
        </div>
    </section>
  )
}


export default NewsLetter