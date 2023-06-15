export const queryGH = (language: string, page: number, perPage: number) =>
  fetch(
    `https://api.github.com/search/repositories?q=language:${language}&amp;sort=stars&amp;order=desc&amp;per_page=${perPage}&amp;page=${page}`,
    {
      headers: process.env.GH_ACCESS_TOKEN
        ? { Authorization: `Bearer ${process.env.GH_ACCESS_TOKEN}` }
        : {},
    },
  )
    .then((resp) => resp.json())
    .then((data) => {
      if (data.message) {
        throw data;
      }
      return data;
    });
