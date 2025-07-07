import React from "react";
import { Link } from "react-router-dom";

const Copyright: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center border-t-[1px] py-10 mt-10">
             
            <div className="w-full flex flex-col items-center justify-center">
                <Link to="/" className="">
                    <img
                        className='mb-p20 mx-auto'
                        src={'/footer_logo.png'}
                        alt="Footer logo"
                        // onError={(e)=>{(e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src="/images/footer_logo.png"}}
                    />
                </Link>
                
                <div className="text-xxs text-white">
                    Copyright © 2024  DOST- All Rights Reserved.
                </div>
            </div>
        </div>
    )
}

export default Copyright;
