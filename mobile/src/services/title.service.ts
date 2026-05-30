import { api } from "./api.service";
import type { TitlesResponse } from '@shared/types/title/titles.dto';
import type { ApiSuccessResponse } from '@shared/types/apiSuccess.type';
import type { NewTitleSchema } from "@/schemas/newTitle";

export class TitleService {
  
  public static async get() {
    
    const response = await api.get<TitlesResponse[]>(
      '/titles'
    );

    return response.data;
  }



  public static async getInfo(id: string) {
    
    const response = await api.get<TitlesResponse>(
      `/titles/${id}`
    );

    return response.data;
  }



  public static async getFavoriteIds() {
    
    const response = await api.get<string[]>(
      `/titles/favorites`
    );

    return response.data;
  }



  public static async addTofavorites(id: string) {
    
    const response = await api.post<ApiSuccessResponse>(
      `/titles/add-to-favorite/${id}`
    );

    return response.data;
  }



  public static async removeFromfavorites(id: string) {
    
    const response = await api.delete<ApiSuccessResponse>(
      `/titles/remove-from-favorite/${id}`
    );

    return response.data;
  }



  public static async new(data: NewTitleSchema) {
    
    const response = await api.post<ApiSuccessResponse>(
      `/titles/new`, data
    );

    return response.data;
  }



  public static async remove(id: string) {
    
    const response = await api.delete<ApiSuccessResponse>(
      `/titles/remove/${id}`,
    );

    return response.data;
  }
}