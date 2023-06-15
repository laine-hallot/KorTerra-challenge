import type { FC } from 'react';

export const ResultGhost: FC = () => (
  <div className="animate-pulse px-4 py-2 flex gap-2 justify-between items-center even:bg-slate-50">
    <div className="flex flex-col w-5/6">
      <div className="flex gap-1 items-center">
        <span className="h-4 bg-gray-200 rounded-sm w-48 inline-block"></span>{' '}
        <span> - </span>
        <span className="h-4 bg-gray-200 rounded-sm w-36 inline-block"></span>
      </div>
      <div className="font-light text-slate-700">
        <div className="h-4 bg-gray-200 rounded-sm w-36"></div>
      </div>
    </div>

    <div className="h-4 bg-gray-200 rounded-sm w-40 mr-4"></div>
    <div className="w-24 text-center h-10 bg-gray-200 rounded-sm"></div>
  </div>
);
