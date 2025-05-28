import React from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import ReactPlayer from 'react-player/youtube'


// interface SectionProps {

//     sectionContent: {
//         title?: string
//         description?: string
//         featured_video?: string
//         button_text?: string
//         button_link?: string
//         videos?: any[]
//     }
// }

const FeaturedVideos: React.FC = () => {

  //const { title, description, featured_video, button_text, button_link, videos } = sectionContent;

  const sectionContent = {
    title: 'Featured Videos',
    description: 'Watch the latest events about DOST’s programs, products, and services.',
    featured_image: '/images/image-placeholder.png',
    button_text: 'Learn More',
    button_link: 'https://www.youtube.com/@DOSTvPH/videos',
    featured_video: "https://www.youtube.com/watch?v=GO5Z3BDfeZ8",
    button_link2: '#',
    videos: [
      {
        "video": "https://www.youtube.com/watch?v=qOH7Kh--fA8",
        "title": "DOST-HANDA PILIPINAS 2024 with Sec. Renato U. Solidum, Jr",
        "description": "This is just placeholder text. Don't be alarmed, this is just here to fill up space since your finalized copy isn't ready yet",
        "button_text": "Learn More",
        "button_link": "#"
      },
      {
        "video": "https://www.youtube.com/watch?v=Zd0gWIsa5LI",
        "title": "Metrobank and DOST Turn Over of Donations Ceremony for DOST Day Care Center (DDCC)",
        "description": "This is just placeholder text. Don't be alarmed, this is just here to fill up space since your finalized copy isn't ready yet",
        "button_text": "Learn More",
        "button_link": "#"
      },
      {
        "video": "https://www.youtube.com/watch?v=YdMtnITYCVw",
        "title": "Ceremonial Memorandum of Agreement Signing (MOA) between DOST and NCMF",
        "description": "This is just placeholder text. Don't be alarmed, this is just here to fill up space since your finalized copy isn't ready yet",
        "button_text": "Learn More",
        "button_link": "#"
      }
    ]
  }

  const getBlackTitle = (title: string) => {
    let retVal = '';
    const stringArray = title.split(' ');

    stringArray.map((str: string, index: number) => {
      if (index + 1 !== stringArray.length) {
        retVal += str + ' ';
      }
    });

    return retVal;
  }

  const getBlueTitle = (title: string) => {
    let retVal = '';
    const stringArray = title.split(' ');

    stringArray.map((str: string, index: number) => {
      if (index + 1 === stringArray.length) {
        retVal += str + ' ';
      }
    });
    return retVal;
  }

  return (
    <section className="lg:w-[1240px] lg:mx-auto mx-2 my-p100">
      <div className="mt-p32 mb-p43 mx-auto">
        <div className="flex">
          <div className="hidden w-full lg:block text-center lg:text-center lg:w-1/3">
            <h2 className="text-title leading-snug text-black font-bold lg:text-40-px">{getBlackTitle(sectionContent.title?.trim() ?? '')} <span className="text-accent4">{getBlueTitle(sectionContent.title?.trim() ?? '')}</span></h2>
            <p className="mt-p25 text-center lg:text-start text-xxs lg:mt-p40 lg:text-xs lg:leading-150-p">{sectionContent.description}</p>
            <Link className="block mt-p25 py-p10 px-p20 bg-accent3 text-center text-white font-bold text-xs lg:mt-p40" target="_blank" to={sectionContent.button_link ?? '#'}>{sectionContent.button_text}</Link>
          </div>

          <div className="lg:block w-full lg:ml-p100 min-h-400">
            <ReactPlayer
              className="react-player !w-full h-full"
              url={sectionContent.featured_video}
              controls={true} />
            <div className="text-title font-bold mt-2 text-center">{sectionContent.description}</div>
          </div>
        </div>
        <div className="flex flex-col md:grid lg:grid-cols-3 lg:gap-p20 mt-p25 lg:mt-p50 mx-auto">
          {sectionContent.videos?.map((video, index) => (
            <Card key={index} card={video} />
          ))
          }
        </div>
      </div>
    </section>
  )
}

export default FeaturedVideos;