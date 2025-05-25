import React from "react";

const AboutContentCard = ({
  children,
  header,
  description,
}: {
  children: React.ReactNode;
  header?: string;
  description?: string;
}) => {
  return (
    <div className="mb-20">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6">
          {header}
        </h1>{" "}
        <div className="w-24 h-1 mx-auto bg-primary-color mb-10"></div>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AboutContentCard;
