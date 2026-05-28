import type { MoviesFilterOptions } from "@/maps/value_label/filters/movies.filter";
import { type MoviesAndSeriesResponse } from "@shared/types/movie/movies.dto";
import { useMemo } from "react";

export const useMoviesAndSeriesFilter = (
  moviesAndSeries            : MoviesAndSeriesResponse[],
  favoriteMoviesAndSeriesIds : string[],
  filter                     : MoviesFilterOptions,
  search                     : string,
): { filteredMoviesAndSeries : MoviesAndSeriesResponse[] } => {

  const filteredMoviesAndSeries = useMemo(() => {

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

  return { filteredMoviesAndSeries }
};