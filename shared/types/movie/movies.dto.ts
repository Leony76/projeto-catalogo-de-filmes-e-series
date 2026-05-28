import { Movie } from "./movies.type";

export type MoviesAndSeriesResponse = Pick<Movie, 
  'poster' | 'genre' | 'title' | 'id' 
>;