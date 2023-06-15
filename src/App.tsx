import type { FC } from 'react';
import { useCallback, useState } from 'react';

import { SearchPage } from './search-page';
import { RepoPage } from './repo-page';
import type { SearchResult } from './gh-search/gh-api.types';
import { supportedCounts, supportedLanguages } from './gh-search/options';

export const App: FC = () => {
  const [repoData, setRepoData] = useState<SearchResult>();
  const [currentPage, setCurrentPage] = useState<'main' | 'repo'>('main');
  const [searchOptions, setSearchOptions] = useState({
    language: supportedLanguages[0].searchTerm,
    page: 0,
    perPage: supportedCounts[0],
  });

  const handleBackToMain = useCallback(() => {
    setCurrentPage('main');
    setRepoData(undefined);
  }, []);

  const handleSelectRepo = useCallback((repo: SearchResult) => {
    setCurrentPage('repo');
    setRepoData(repo);
  }, []);

  const handleSearchOptionChange = useCallback(
    (key: keyof typeof searchOptions, value: any) => {
      setSearchOptions({ ...searchOptions, [key]: value });
    },
    [searchOptions],
  );

  return (
    <div className="w-full min-h-screen pb-24">
      <div className="px-6 py-3 bg-slate-50">
        <h1 className="text-4xl text-slate-700 font-semibold">
          KorTerra Challenge - <span className="font-light">GitHub Search</span>
        </h1>
      </div>
      {currentPage === 'repo' && repoData !== undefined ? (
        <RepoPage backToMain={handleBackToMain} repoData={repoData} />
      ) : (
        <SearchPage
          onSelectRepo={handleSelectRepo}
          searchOptions={searchOptions}
          onSearchOptionChange={handleSearchOptionChange}
        />
      )}
    </div>
  );
};
