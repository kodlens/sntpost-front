import React from "react";

interface LoaderProps {
    height?: string
}

const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
  return (
    <div className={`flex ${props.height ?? 'h-screen' } items-center justify-center bg-white`}>
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
