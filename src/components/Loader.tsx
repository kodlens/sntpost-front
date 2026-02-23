import React from "react";

interface LoaderProps {
    height?: string
}

const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
  return (
    <div className={`${props.height ?? 'h-screen'} w-full bg-[#f8fbff] px-4 py-8`}>
      <div className="mx-auto w-full max-w-[1240px] animate-pulse">
        <div className="mb-6 h-9 w-56 rounded-xl bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-[220px] rounded-2xl bg-slate-200" />
          <div className="h-[220px] rounded-2xl bg-slate-200" />
          <div className="h-[220px] rounded-2xl bg-slate-200" />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="h-[160px] rounded-2xl bg-slate-200" />
          <div className="h-[160px] rounded-2xl bg-slate-200" />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="h-[160px] rounded-2xl bg-slate-200" />
          <div className="h-[160px] rounded-2xl bg-slate-200" />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="h-[160px] rounded-2xl bg-slate-200" />
          <div className="h-[160px] rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
