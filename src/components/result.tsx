import type { FC } from 'react';

export const Result: FC<{
  handleDetailsClick: () => void;
  repoName: string;
  ownerName: string;
  description: string;
  url: string;
}> = ({ handleDetailsClick, repoName, ownerName, description, url }) => (
  <div className=" px-4 py-2 flex gap-2 justify-between items-center even:bg-slate-50">
    <div className="flex flex-col w-5/6">
      <span className="font-medium">
        {repoName} -{' '}
        <span className="font-normal text-slate-700">{ownerName}</span>
      </span>
      <span className="font-light text-slate-700">{description}</span>
    </div>

    <span className="w-48 text-center">
      <a className="text-blue-500" href={url}>
        <span className="underline mr-1">View on GitHub</span>🔗
      </a>
    </span>
    <button
      className="bg-purple-400 text-white px-4 py-2 rounded"
      onClick={handleDetailsClick}>
      Details
    </button>
  </div>
);
