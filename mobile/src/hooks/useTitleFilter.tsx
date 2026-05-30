import type { TitlesFilterOptions } from "@/maps/value_label/filters/title.filter";
import { type TitlesResponse } from "@shared/types/title/titles.dto";
import { useMemo } from "react";

export const useTitleFilter = (
  moviesAndSeries            : TitlesResponse[],
  favoriteMoviesAndSeriesIds : string[],
  filter                     : TitlesFilterOptions,
  search                     : string,
): { filteredTitles : TitlesResponse[] } => {

  const filteredTitles = useMemo(() => {

    let movies = [...moviesAndSeries];

    const normalizedSearch = search.trim().toLowerCase();

    if (normalizedSearch.length > 0) {
      movies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(normalizedSearch)
        ||
        movie.genre.some((genre) => genre.toLowerCase().includes(normalizedSearch))
      );
    }

    switch (filter) {

      case 'favorites':
        movies = movies.filter((movie) => favoriteMoviesAndSeriesIds.some((id) => id === movie.id));
      break;

      case 'AZTitle':
        movies.sort((a, b) => a.title.localeCompare(b.title));
      break;

      case 'ZATitle':
        movies.sort((a, b) => b.title.localeCompare(a.title));
      break;

      case 'AZgenre':
        movies.sort((a, b) => a.genre[0].localeCompare(b.genre[0]));
      break;

      case 'ZAgenre': 
        movies.sort((a, b) => b.genre[0].localeCompare(a.genre[0]));
      break;

      case 'mostRecent':
        movies.sort((a, b) => Number(b.year) - Number(a.year));
      break;

      case 'leastRecent':
        movies.sort((a, b) => Number(a.year) - Number(b.year));
      break;
    }

    return movies;

  }, [moviesAndSeries, search, filter]);

  return { filteredTitles }
};