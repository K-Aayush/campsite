import React, { FC, ReactNode } from "react";

interface ComponentWrapperProps {
  header?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

const HomeContentCard: FC<ComponentWrapperProps> = ({
  header,
  description,
  className = "",
  children,
}) => {
  return (
    <section className={`py-16 ${className}`}>
      {(header || description) && (
        <div className="container mx-auto mb-12 text-center">
          {header && (
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{header}</h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="container mx-auto">{children}</div>
    </section>
  );
};

export default HomeContentCard;
