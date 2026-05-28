import { api } from "./api.service";
import type { MoviesAndSeriesResponse } from '@shared/types/movie/movies.dto';

export class MovieAndSeriesService {
  
  public static async getMovies() {
    
    const response = await api.get<MoviesAndSeriesResponse[]>(
      '/movies-and-series'
    );

    return response.data;
  }
}