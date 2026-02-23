import React from 'react';
import { Link } from 'react-router-dom';

const Copyright: React.FC = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center py-10">
      <div className="flex w-full flex-col items-center justify-center">
        <Link to="/" className="">
          <img
            className="mb-p20 mx-auto"
            src="/images/footer_logo.png"
            alt="Footer logo"
          />
        </Link>

        <div className="text-xxs text-white/85">
          Copyright (c) 2024 DOST - All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Copyright;
