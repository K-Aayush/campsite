import React from "react";

const MainLayoutWrapper = ({
  children,
  header,
  description,
}: {
  children: React.ReactNode;
  header?: string;
  description?: string;
}) => {
  return (
    <div className=" pb-16  px-3 sm:px-5 md:px-7 lg:px-9 ">
      {/* {header && description && (
        <div>
          <h1>{header}</h1>
          <p>{description}</p>
        </div>
      )} */}
      {/* <div className=" bg-violet-600 mx-auto py-16"></div> */}
      {header && description && (
        <div className="text-center  mb-12 mt-16">
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">
            {header}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">{description}</p>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default MainLayoutWrapper;
