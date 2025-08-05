import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import moment from 'moment';
import { FourOhFour } from '../404';

//import { CopyToClipboard } from "react-copy-to-clipboard"
import { 
  AnimatePresence, 
  motion } from "framer-motion"
//import { useCopyLink } from '../../lib/hooks/useCopyLink.ts';

import './index.css';
import axios from 'axios';

import { useCopyLink } from '../../lib/hooks/useCopyLink.ts';


import TextSkeleton from '../../components/Skeleton/TextSkeleton.tsx';
import type { Post } from '../../types/article.ts';
import { config } from '../../config/config.ts';
import ArticleSkeleton from '../../components/Skeleton/ArticleSkeleton.tsx';
import { Clock } from 'lucide-react';



const Article: React.FC = () => {
	const params = useParams();
	const [article, setArticle] = useState<Post>();
	const [relatedArticles, setRelatedArticles] = useState<Post[]>([]);

	const fetchArticle = async()  => {

		const resArticle = await axios.get(`${config.baseUri}/api/articles/fetch-article/${params.slug}`, {
			headers: {
				Accept: 'application/json',
				'Authorization': `Bearer ${config.apiToken}`
			}
		})

		setArticle(resArticle.data)
	}

	const loadRelatedArticles = async () => {
		
		const resRelated = await axios.get<Post[]>(`${config.baseUri}/api/articles/load-related-articles/${article?.title}`, {
			headers: {
				Accept: 'application/json',
				'Authorization': `Bearer ${config.apiToken}`
			}
		})
		setRelatedArticles(resRelated.data);
	}

	useEffect(()=>{
		fetchArticle()
	},[])

	useEffect(()=>{
		fetchArticle()
	},[params.slug])

	useEffect(()=>{
		if(article){
			loadRelatedArticles()
		}
	},[article])

	// const dispatch = useDispatch<AppDispatch>();
	// const article = useSelector((state: RootState) => state.pages.article);
	const article_title = {
		"size": 20,
		"color": "#000000",
		"family": "arial",
		"weight": 700
	};

	const article_sub_title = {
		"size": 20,
		"color": "#000000",
		"family": "arial",
		"weight": 700
	};

	
	
	
	const { 
    showToast,
    handleCopyLink } = useCopyLink()
	


	// useEffect(() => {
	// 	const date = new Date();
	// 	localStorage.setItem('visit_start', date.toISOString());

	// }, []);

	if ( article?.isFailure ) return <FourOhFour />


  return (
    <div className='mx-10 lg:pt-12 lg:mx-auto lg:w-5xl xl:w-7xl  md:mx-10'>
		{/* <!-- Page Header --> */}
		<section className='hidden w-full bg-accent4 relative'>
			<img className='absolute object-cover bottom-0 right-0 h-auto w-20 lg:w-fit' src="/images/article_header_shade.png" alt="" />
			<div className='py-[50px] px-[25px] lg:py-p100 lg:px-p200 max-w-1668 mx-auto'>
				<h1 className='text-center mb-2 text-xl lg:text-2xl lg:text-left text-white font-bold text-article-title uppercase leading-150-p'>
					<TextSkeleton setting={ article_title } text={article?.title} skeletonHeight={ 'h-8' } skeletonWidth={ 'w-full' }/>
				</h1>
				{(article?.sub_title !== ''|| article?.sub_title!==null) &&
					<h2 className='text-center mb-2 text-xl lg:text-2xl lg:text-left text-white font-bold text-article-title uppercase leading-150-p'>
						<TextSkeleton text={article?.sub_title} skeletonHeight={ 'h-8' } skeletonWidth={ 'w-full' }/>
					</h2>
				}
				<p className='text-gray-400 font-medium text-center lg:text-left lg:max-w-max lg:relative lg:pl-7 lg:before:h-[2px] lg:before:w-6 lg:before:bg-gray-400 lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2'>{ article?.by_line }</p>
			</div>
		</section>
		{/* <!-- Page Header --> */}

		{/* <!-- Article Content Section --> */}
		<section className='w-full relative pt-8 md:pt-0'>
			<img className='absolute bottom-0 left-1/2 translate-x-[-50%] -z-1' src="/images/article-content-flavor.png" alt="" />
			<img className='absolute left-0 top-1/2' src="/images/ornament1.png" alt="" />
			<img className='absolute right-0 top-1/4' src="/images/ornament2.png" alt="" />

			<div className='max-w-1668 mx-auto'>
				<div className="w-full px-p25 lg:px-p200 grid grid-cols-1 gap-[63px] lg:grid-cols-3 pb-[25px]">
					{/* <!-- Article Content Section --> */}
					<div className='col-span-2'>
						{!article
							? <ArticleSkeleton />
							: 
								<div className="mt-p27 w-full">
									{ article?.featured_image && <img className='mb-2 w-full object-cover' src={`${config.baseUri}/storage/featured_images/${article?.featured_image}`} alt="" /> }
									

									{ article.image_caption!=="" && article.image_caption!=="null" ? (
										<div className="border-l-4 pl-5 border-primary mb-2 mt-0">
											<blockquote className='text-sm'>
												{article?.image_caption}
											</blockquote>
										</div>) : 
										''
									}

									<div>
										<div className="border-b-[#D9D9D9] border-b mb-[15px]">
											<div className='mb-5'>
												<h1
													className='mb-3 font-bold text-xl text-[#211d1e] leading-6' 
													style={{
														fontFamily: article_title?.family,
														color: article_title?.color,
														fontSize: `${article_title?.size}px`,
														fontWeight: article_title?.weight
													}}>{ article.title }
												</h1>
												<div className='hidden lg:block'>
													{/* <ArticleTags /> */}
												</div>
												{ article.sub_title!=="" && article.sub_title!=="null" && (
													<h2
														className='mt-2 text-xl text-[#211d1e] leading-6' 
														style={{
														fontFamily: article_sub_title?.family,
														color: article_sub_title?.color,
														fontSize: `${article_sub_title?.size}px`,
														fontWeight: article_sub_title?.weight
													}}>{ article.sub_title }
													</h2>
												) }
											</div>
											{/* <div className='hidden items-center mb-2 lg:flex'>
												<p className="hidden max-w-max leading-[1] py-[5px] px-[10px] rounded-full bg-[#00ADEC] text-white text-sm mb-6 lg:block lg:mb-0">{article?.category?.title}</p>
												<div className="flex items-center pl-2 ml-4 border-l-2 border-l-[#dbdbdb]">
													<img src={ '/images/eye.svg' }/>
													<p className='ml-2 text-sm font-medium text-articletextshade'>15</p>
												</div>
											</div> */}
											<div className="mb-4">
												<div className='flex w-full justify-between align-center mb-4 lg:mb-0'>
													<div className="flex items-center lg:block">
														<p className="text-sm text-[#211d1e] my-0 mr-2 font-semibold">{ article.author_name ? article.author_name : (<span>{article.author?.lname} {article.author?.fname}</span> ) }</p>
														{ article?.publication_date ? <p className="text-[10px] text-[#757575] lg:text-sm">{ moment(article?.publication_date).format('ll').toString() }</p> : ''}
													</div>
													<div className="hidden text-[#6ED0F7] py-0 overflow-visible lg:flex">
														{/* <SocialShare article={article} /> */}
														<div className="relative flex items-center">
															{/* <CopyToClipboard text={ `${ window.location }` }>
																
															</CopyToClipboard> */}
															<button
																className="h-7 w-7 text-blue-900" 
																onClick={ handleCopyLink }>
																<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 11.5C9 12.8807 7.88071 14 6.5 14C5.11929 14 4 12.8807 4 11.5C4 10.1193 5.11929 9 6.5 9C7.88071 9 9 10.1193 9 11.5Z" stroke="currentcolor" strokeWidth="1.5"></path> <path opacity="0.5" d="M14.3206 16.8017L9 13.29" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path opacity="0.5" d="M14.4207 6.83984L9.1001 10.3515" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z" stroke="currentcolor" strokeWidth="1.5"></path> <path d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z" stroke="currentcolor" strokeWidth="1.5"></path> </g></svg>
															</button>

															<AnimatePresence>
																{ showToast && (
																	<motion.p
																		initial={{ opacity: 0, x: "-50%" }}
																		animate={{ opacity: 1, x: "0%" }}
																		exit={{ opacity: 0, x: "-50%" }} 
																		className="text-xs bg-accent3 rounded-2xl text-white font-medium px-2 absolute top-[-2px] py-1 left-full">Copied
																	</motion.p>
																) }
															</AnimatePresence>
														</div>
													</div>
												</div>
												<p className="block max-w-max leading-[1] py-[5px] px-[10px] rounded-full bg-[#00ADEC] text-white text-[10px] mb-4 lg:text-sm lg:hidden">{article?.category?.title}</p>
												<div className='lg:hidden'>
													{/* <ArticleTags /> */}
												</div>
												<div className="flex mt-4 text-[#6ED0F7] py-0 overflow-visible lg:hidden">
													{/* <SocialShare article={article} /> */}
													<div className="relative flex items-center">
														{/* <CopyToClipboard text={ `${ window.location }` }>
															
														</CopyToClipboard> */}
														<button
															className="h-7 w-7 text-blue-900" 
															onClick={ handleCopyLink }>
															<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 11.5C9 12.8807 7.88071 14 6.5 14C5.11929 14 4 12.8807 4 11.5C4 10.1193 5.11929 9 6.5 9C7.88071 9 9 10.1193 9 11.5Z" stroke="currentcolor" strokeWidth="1.5"></path> <path opacity="0.5" d="M14.3206 16.8017L9 13.29" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path opacity="0.5" d="M14.4207 6.83984L9.1001 10.3515" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z" stroke="currentcolor" strokeWidth="1.5"></path> <path d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z" stroke="currentcolor" strokeWidth="1.5"></path> </g></svg>
														</button>
														<AnimatePresence>
															{ showToast && (
																<motion.p
																	initial={{ opacity: 0, x: "-50%" }}
																	animate={{ opacity: 1, x: "0%" }}
																	exit={{ opacity: 0, x: "-50%" }} 
																	className="text-xs bg-accent3 rounded-2xl text-white font-medium px-2 absolute top-[-2px] py-1 left-full">Copied
																</motion.p>
															) }
														</AnimatePresence>
													</div>
												</div>
												{/* <div className="flex items-center mt-4 lg:hidden">
													<img src={ '/images/eye.svg' }/>
													<p className='ml-2 text-sm font-medium text-articletextshade'>article page views</p>
												</div> */}
											</div>
										</div>
									</div>
									<div className='w-full' >
										{/* content of the articles */}
										<div className='mt-4 ck ck-content relative' dangerouslySetInnerHTML={{ __html: article?.description || ''}}></div>

									</div>
								</div>
						}

						{/* Comment for the meantime for debugging 
						<div className="mt-p80">
							<div className="flex items-center">
								<span className='text-xs font-semibold text-black'>What is your reaction?</span>
								<div className='rounded-[20px] bg-accent4 text-white py-px lg:py-p5 px-p20 ml-p10 text-xxs font-bold lg:text-md lg:text lg:font-normal'>10 Votes</div>
							</div>
							<div className="flex flex-wrap mt-[22px] flex-row justify-between gap-x-2 lg:w-full md:w-8/12 md:mx-auto">
								
								<button onClick={() => {submitReaction('happy')}} className='relative flex flex-col w-13 lg:w-auto'>
									<div className='flex lg:inline-block lg:absolute order-2 mx-auto top-p5 my-1 right-[-40%] lg:right-[-20%] rounded-full bg-accent4 text-[9px] lg:text-[11px] text-white lg:py-p5 px-p10 lg:px-p15'>{article?.reaction_count?.happy}</div>
									<img src="/images/happy.png" alt="" className="flex order-1"/>
									<div className='flex order-3 lg:mt-[9px] text-center text-xxs lg:text-xs text-black mx-auto'>Happy</div>
								</button>
								<button onClick={() => {submitReaction('sad')}} className='relative flex flex-col w-13 lg:w-auto'>
									<div className='flex lg:inline-block lg:absolute order-2 mx-auto top-p5 my-1 right-[-40%] lg:right-[-20%] rounded-full bg-accent4 text-[9px] lg:text-[11px] text-white lg:py-p5 px-p10 lg:px-p15'>{article?.reaction_count?.sad}</div>
									<img src="/images/sad.png" alt="" className="flex order-1"/>
									<div className='flex order-3 lg:mt-[9px] text-center text-xxs lg:text-xs text-black mx-auto'>Sad</div>
								</button>
								<button onClick={() => {submitReaction('amused')}} className='relative flex flex-col w-13 lg:w-auto'>
									<div className='flex lg:inline-block lg:absolute order-2 mx-auto top-p5 my-1 right-[-40%] lg:right-[-20%] rounded-full bg-accent4 text-[9px] lg:text-[11px] text-white lg:py-p5 px-p10 lg:px-p15'>{article?.reaction_count?.amused}</div>
									<img src="/images/amused.png" alt="" className="flex order-1"/>
									<div className='flex order-3 lg:mt-[9px] text-center text-xxs lg:text-xs text-black mx-auto'>Amused</div>
								</button>
								<button onClick={() => {submitReaction('excited')}} className='relative flex flex-col w-13 lg:w-auto'>
									<div className='flex lg:inline-block lg:absolute order-2 mx-auto top-p5 my-1 right-[-40%] lg:right-[-20%] rounded-full bg-accent4 text-[9px] lg:text-[11px] text-white lg:py-p5 px-p10 lg:px-p15'>{article?.reaction_count?.excited}</div>
									<img src="/images/excited.png" alt="" className="flex order-1"/>
									<div className='flex order-3 lg:mt-[9px] text-center text-xxs lg:text-xs text-black mx-auto'>Excited</div>
								</button>
								<button onClick={() => {submitReaction('angry')}} className='relative flex flex-col w-13 lg:w-auto'>
									<div className='flex lg:inline-block lg:absolute order-2 mx-auto top-p5 my-1 right-[-40%] lg:right-[-20%] rounded-full bg-accent4 text-[9px] lg:text-[11px] text-white lg:py-p5 px-p10 lg:px-p15'>{article?.reaction_count?.angry}</div>
									<img src="/images/angry.png" alt="" className="flex order-1"/>
									<div className='flex order-3 lg:mt-[9px] text-center text-xxs lg:text-xs text-black mx-auto'>Angry</div>
								</button>
							</div>
						</div>*/}
					</div>


					{/* <!-- Article Content Section --> */}

					{/* <!-- Related Articles Section --> */}
					<div>
						<div className='text-blue-900 font-semibold mb-[26px]'>Read Next Article</div>
						{/* <!-- Internal Related articles mapping , adding filter to avoid displaying the article on related--> */}
						{relatedArticles && (relatedArticles.filter(item => item.id !== article?.id).map((related:Post) => (
							<div key={related?.id} className='mb-[24px] pb-[24px] border-b-1 border-blue-900'>
								<div className='text-accent4 text-[24px] font-bold capitalize'>
									<Link className='text-blue-950' to={`/dost/${related?.slug}`}>{related?.title}</Link>
								</div>
								<div className="flex gap-2 mt-2">
									<div className='flex items-center'>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
											viewBox="0 0 20 20" fill="none">
											<g clipPath="url(#clip0_460_2070)">
												<path fillRule="evenodd" clipRule="evenodd" 
													d="M16.5625 18H3.43817C2.73178 18 2.21015 17.303 2.47658 16.662C3.71276 13.698 6.61693 12 9.99985 12C13.3838 12 16.288 13.698 17.5241 16.662C17.7906 17.303 17.2689 18 16.5625 18ZM5.91667 5.99998C5.91667 3.79398 7.74899 1.99998 9.99985 1.99998C12.2517 1.99998 14.083 3.79398 14.083 5.99998C14.083 8.20598 12.2517 9.99998 9.99985 9.99998C7.74899 9.99998 5.91667 8.20598 5.91667 5.99998ZM19.9557 17.636C19.2136 14.277 16.8923 11.798 13.837 10.673C15.456 9.39596 16.4002 7.33093 16.0532 5.06993C15.651 2.44693 13.4236 0.347977 10.7348 0.0419769C7.02321 -0.381023 3.87507 2.44898 3.87507 5.99998C3.87507 7.88998 4.76929 9.57396 6.1637 10.673C3.10743 11.798 0.787164 14.277 0.044024 17.636C-0.225466 18.857 0.778998 20 2.05397 20H17.9457C19.2217 20 20.2262 18.857 19.9557 17.636Z" fill="#0D4E86"/>
											</g>
										</svg>
									</div>
									<span className='text-blue-900'>
										{ related?.author_name ? related?.author_name : ( <span>
											{ related?.author?.lname }, { related?.author?.fname } { related?.author?.mname }
										</span>) }
										{related?.author_name}
									</span>
								</div>
								<div className="flex items-center gap-2 mt-2">
									<div>
										<Clock size={18} className='text-blue-900'/>
									</div>
									<div className='text-blue-900'>{  moment(related?.publication_date).format('ll')}</div>
									{/* <div className="flex items-center">
										<img src="/images/eye-blue.svg" alt="" />
										<span className='text-authorShade ml-p20'>99</span>
									</div> */}
								</div>
							</div>
						)))}

						{/* <!-- Other pages links --> */}
						{/* <ul className='mt-[64px] ml-[25px] lg:ml-0 list-disc mb-[35px]'>
							<li className='mb-p10'>
								<Link className='text-accent4 text-xs' to="#">FOI Manual Reports</Link>
							</li>
							<li className='mb-p10'>
								<Link className='text-accent4 text-xs' to="#">Featured Projects</Link>
							</li>
							<li className='mb-p10'>
								<Link className='text-accent4 text-xs' to="#">STII Publications</Link>
							</li>
							<li className='mb-p10'>
								<Link className='text-accent4 text-xs' to="#">Science for Safer Communities</Link>
							</li>
							<li className='mb-p10'>
								<Link className='text-accent4 text-xs' to="#">Today&lsquo;s Outlook</Link>
							</li>
						</ul> */}
					</div>
				{/* <!-- Related Articles Section --> */}
				</div>
			</div>
		</section>
		{/* <!-- Article Content Section --> */}
		{/* Comment and Social Sharing Section */}

		{/* <!-- CTA Section --> */}
		{/* <section className='w-full bg-accent4 relative mt-p100 lg:mt-0'>
			<img className='hidden lg:block absolute left-0 bottom-0' src="/images/article-cta-shade.png" alt="" />
			<img className='absolute top-0 mx-auto left-1/2 translate-x-[-50%]' src="/images/small_circular_lines.png" alt="" />
			<div className='max-w-1668 mx-auto py-[50px] lg:py-p100'>
				<div className='text-center text-customblue text-xs font-semibold mb-p20'>Tagline</div>
				<div className='text-center font-bold text-white text-40-px leading-120-p max-w-[798px] mx-auto mb-p20'><span className='text-customblue'>Elevating</span> Lives through Innovative Science and Technology Offerings</div>
				<div className='text-center text-xs text-white max-w-[798px] mx-auto mb-p20'>Sometimes it&lsquo;s nice to put in text just to get an idea of how text will fill in a space on your website.</div>
				<div className='flex justify-center'>
					<Link className='inline-block px-p20 py-p10 text-white font-bold text-[18px] bg-accent3 rounded-full' to="#">Learn More</Link>
				</div>
			</div>
		</section> */}
		{/* <!-- CTA Section --> */}
	</div>
  )
}

export default Article