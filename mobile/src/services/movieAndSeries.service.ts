import { api } from "./api.service";
import type { MoviesAndSeriesResponse } from '@shared/types/movie/movies.dto';
import type { ApiSuccessResponse } from '@shared/types/apiSuccess.type';

export class MovieAndSeriesService {
  
  public static async get() {
    
    const response = await api.get<MoviesAndSeriesResponse[]>(
      '/movies-and-series'
    );

    return response.data;
  }



  public static async getInfo(id: string) {
    
    const response = await api.get<MoviesAndSeriesResponse>(
      `/movies-and-series/${id}`
    );

    return response.data;
  }



  public static async getFavoriteIds() {
    
    const response = await api.get<string[]>(
      `/movies-and-series/favorites`
    );

    return response.data;
  }



  public static async addTofavorites(id: string) {
    
    const response = await api.post<ApiSuccessResponse>(
      `/movies-and-series/add-to-favorite/${id}`
    );

    return response.data;
  }



  public static async removeFromfavorites(id: string) {
    
    const response = await api.delete<ApiSuccessResponse>(
      `/movies-and-series/remove-from-favorite/${id}`
    );

    return response.data;
  }
}