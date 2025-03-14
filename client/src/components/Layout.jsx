import React from 'react';
import { Link } from 'react-router-dom';

const PageLayout = ({ children, title }) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100">
      <div className="flex w-full h-full">
        {/* Sidebar */}
        <div className="leftSide w-[20%] h-full bg-indigo-500 text-white shadow-md">
          <div className="w-full h-full px-5 py-4 flex flex-col gap-4 text-lg">
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <Link to={'/allusers'}>
              <div className="my-2 py-2 px-3 rounded-md hover:bg-indigo-600 transition">
                Users
              </div>
            </Link>
            <Link to={'/settings'}>
              <div className="my-2 py-2 px-3 rounded-md hover:bg-indigo-600 transition">
                Settings
              </div>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="rightSide w-[80%] h-full bg-gray-50">
          <div className="w-full h-full">
            <div className="overflow-y-scroll h-screen pb-20 p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
