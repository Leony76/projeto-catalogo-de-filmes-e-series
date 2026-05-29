import axios from "axios";

export const apiError = (error:unknown) => {
   if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "Erro desconhecido";
  }

  if (error instanceof Error) {
    return error.message;
  }
}