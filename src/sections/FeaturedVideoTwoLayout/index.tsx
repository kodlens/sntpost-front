import React from "react";
import { Link } from "react-router-dom";
import Card from "../FeaturedVideo/card";


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

const FeaturedVideoTwoLayout: React.FC = () => {

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
                "video": "https://www.youtube.com/watch?v=EbyOtezEX2o",
                "title": "Kwentuhan with Pinay Science Idols (Part I)",
                "description": "This is just placeholder text. Don't be alarmed, this is just here to fill up space since your finalized copy isn't ready yet",
                "button_text": "Learn More",
                "button_link": "#"
            },
            {
                "video": "https://www.youtube.com/watch?v=_B56oZuXn58",
                "title": "Kwentuhan with Pinay Science Idols (Part II)",
                "description": "This is just placeholder text. Don't be alarmed, this is just here to fill up space since your finalized copy isn't ready yet",
                "button_text": "Learn More",
                "button_link": "#"
            },
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
                <div className="flex justify-center">
                    <div className="w-full lg:block text-center lg:text-center lg:w-1/3">
                        <h2 className="text-title leading-snug text-black font-bold lg:text-40-px">{getBlackTitle(sectionContent.title?.trim() ?? '')} <span className="text-accent4">{getBlueTitle(sectionContent.title?.trim() ?? '')}</span></h2>
                        <p className="mt-p25 text-center lg:text-start text-xxs lg:mt-p40 lg:text-xs lg:leading-150-p">{sectionContent.description}</p>
                        <Link className="block mt-p25 py-p10 px-p20 bg-accent3 text-center text-white font-bold text-xs lg:mt-p40" target="_blank" to={sectionContent.button_link ?? '#'}>{sectionContent.button_text}</Link>
                    </div>
                    
                </div>
                <div className="flex flex-col md:flex-row gap-6 mt-10 mx-auto">
                    {sectionContent.videos?.map((video, index) => (
                        <Card key={index} card={video} />
                    ))
                    }
                </div>
            </div>
        </section>
    )
}

export default FeaturedVideoTwoLayout;