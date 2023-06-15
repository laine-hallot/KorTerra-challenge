import type { FC } from 'react';
import React, { useCallback } from 'react';

import type { SearchResult } from './gh-search/gh-api.types';

export const RepoPage: FC<{
  backToMain: () => void;
  repoData: SearchResult;
}> = ({ backToMain, repoData }) => {
  const onBack = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      backToMain();
    },
    [backToMain],
  );

  return (
    <div className="w-full max-w-5xl flex flex-col justify-center items-center mx-auto mt-6">
      <div className="flex py-4 w-full mb-2">
        <a href="/" onClick={onBack} className="text-slate-700">
          ⬅ Back to Search
        </a>
      </div>
      <div className="flex justify-between w-full">
        <div>
          <h2 className="text-4xl">{repoData.name}</h2>
          <a
            className="text-slate-700 font-light text-2xl underline"
            href={repoData.owner.html_url}>
            {repoData.owner.login}
          </a>
        </div>
        <div className="flex flex-col mb-8 gap-2">
          <div className="flex gap-4">
            <span>Stars ⭐: {repoData.stargazers_count}</span>
            <span>Forks 🔱: {repoData.forks_count}</span>
            <span>Issues ℹ️: {repoData.open_issues_count}</span>
          </div>
          <div className="text-right">
            <span>
              License:{' '}
              <span className="text-slate-700">
                {repoData.license === null ? 'n/a' : repoData.license.spdx_id}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="text-slate-700">{repoData.description}</p>
      </div>
    </div>
  );
};
