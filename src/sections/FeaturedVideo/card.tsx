import React from "react";
import ReactPlayer from 'react-player/youtube'


interface CardProps {
    card: {
        link?: string
        title?: string
        description?: string
        button_text?: string
        button_link?: string
    }
}

const Card: React.FC<CardProps> = ({ card }: CardProps) => {
    
    const { link, title } = card;

    return (
        <div className="w-full lg:w-full mt-p25 lg:mt-0">
            {/* Header */}
            <div className=" h-auto">
               
                <ReactPlayer
                    className="react-player !max-w-full !w-full h-[220px]"
                    url={link}
                    controls={true} />
            </div>
            {/* Body */}
            <div className="mt-5 text-center lg:text-start">
                <div className="text-title font-bold text-black">{title}</div>
            </div>
        </div>
    )
}

export default Card;