import React from 'react';
import { Link } from 'react-router-dom';

const PageLayout = ({ children, title }) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100">
              <div className="rightSide w-full h-full bg-gray-50">
          <div className="w-full h-full">

            <div className="overflow-y-scroll h-screen pb-20 p-6">{children}</div>
          </div>
        </div>
      </div>
  );
};

export default PageLayout;
