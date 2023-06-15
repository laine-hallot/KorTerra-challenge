import type { FC } from 'react';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import type { SearchResponse, SearchResult } from './gh-search/gh-api.types';
import { supportedCounts, supportedLanguages } from './gh-search/options';
import { queryGH } from './gh-search/requests';

import { ResultGhost } from './components/result-ghost';
import { Result } from './components/result';

import { useDebounce } from './utils';

export const SearchPage: FC<{
  onSelectRepo: (repo: SearchResult) => void;
  searchOptions: { language: string; page: number; perPage: number };
  onSearchOptionChange: (
    key: 'page' | 'language' | 'perPage',
    value: any,
  ) => void;
}> = ({ onSelectRepo, searchOptions, onSearchOptionChange }) => {
  const debouncedSearchOptChange = useDebounce(1000, onSearchOptionChange);

  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [showDebounceWarning, setShowDebounceWarning] = useState(false);

  const searchData = useRef<SearchResponse>();
  useMemo(() => {
    setShowDebounceWarning(false);
    setLoading(true);
    queryGH(searchOptions.language, searchOptions.page, searchOptions.perPage)
      .then((data) => {
        searchData.current = data;
      })
      .catch((error) => {
        setErrorText(error?.message ?? '');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchOptions.language, searchOptions.page, searchOptions.perPage]);

  const handleLanguageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onSearchOptionChange('language', event.target.value);
    },
    [onSearchOptionChange],
  );

  const handlePerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onSearchOptionChange('perPage', Number(event.target.value));
    },
    [onSearchOptionChange],
  );

  const handlePageKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onSearchOptionChange(
          'page',
          (event.nativeEvent.target as HTMLInputElement).value,
        );
      }
    },
    [onSearchOptionChange],
  );
  const handlePageInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      onSearchOptionChange(
        'page',
        (event.nativeEvent.target as HTMLInputElement).value,
      );
    },
    [onSearchOptionChange],
  );

  const handlePageBack = useCallback(() => {
    try {
      debouncedSearchOptChange(
        'page',
        searchOptions.page > 0 ? searchOptions.page - 1 : searchOptions.page,
      );
    } catch (error) {
      setShowDebounceWarning(true);
    }
  }, [debouncedSearchOptChange, searchOptions.page]);

  const handlePageForward = useCallback(() => {
    try {
      debouncedSearchOptChange(
        'page',
        searchOptions.page <
          Math.ceil(
            (searchData.current?.total_count ?? 0) / searchOptions.perPage,
          )
          ? searchOptions.page + 1
          : searchOptions.page,
      );
    } catch (error) {
      setShowDebounceWarning(true);
    }
  }, [debouncedSearchOptChange, searchOptions.page, searchOptions.perPage]);

  const handleDetailsClick = useCallback(
    (item: SearchResult) => () => {
      onSelectRepo(item);
    },
    [onSelectRepo],
  );

  return (
    <div className="w-full max-w-5xl min-h-screen mx-auto mt-8">
      <div className="py-4 flex gap-3">
        <select onChange={handleLanguageChange} value={searchOptions.language}>
          {supportedLanguages.map((lang, index) => (
            <option key={index} value={lang.searchTerm}>
              {lang.displayName}
            </option>
          ))}
        </select>
        <select onChange={handlePerPageChange} value={searchOptions.perPage}>
          {supportedCounts.map((val, index) => (
            <option key={index} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col border border-slate-300 rounded">
          {Array(searchOptions.perPage)
            .fill(1)
            .map((elm, index) => (
              <ResultGhost key={index} />
            ))}
        </div>
      ) : searchData.current !== undefined ? (
        <>
          <div className="flex flex-col border border-slate-300 rounded">
            {searchData.current?.items?.map((item, index) => (
              <Result
                key={index}
                handleDetailsClick={handleDetailsClick(item)}
                repoName={item.name}
                ownerName={item.owner.login}
                description={item.description}
                url={item.html_url}
              />
            ))}
          </div>
          <div className="w-full flex flex-col items-center gap-2 mt-4">
            <div className="flex justify-center gap-2 mb-2">
              <button
                className="bg-purple-400 text-white disabled:bg-purple-200 disabled:text-gray-50  px-4 py-2 rounded"
                disabled={searchOptions.page <= 0}
                onClick={handlePageBack}>
                &lt;
              </button>
              <div>
                Page:
                <input
                  type="text"
                  defaultValue={searchOptions.page}
                  className="px-4 py-2 rounded border w-24"
                  onKeyDown={handlePageKeyPress}
                  onBlur={handlePageInputBlur}
                />
                {'/'}
                {Math.ceil(
                  searchData.current.total_count / searchOptions.perPage,
                )}
              </div>
              <button
                className="bg-purple-400 text-white disabled:bg-purple-200 disabled:text-gray-50  px-4 py-2 rounded"
                disabled={
                  Math.ceil(
                    searchData.current.total_count / searchOptions.perPage,
                  ) <= searchOptions.page
                }
                onClick={handlePageForward}>
                &gt;
              </button>
            </div>
            {showDebounceWarning ? (
              <div>
                <span className="text-orange-400 font-medium">
                  Warning:{' '}
                  <span className="text-slate-700 font-normal">
                    You're changing pages to fast GitHub will rate limit you
                  </span>
                </span>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="w-5/6 text-center mx-auto px-4">
          <h3 className="text-2xl">Error</h3>
          <span>{errorText}</span>
        </div>
      )}
    </div>
  );
};
