import { z } from "zod";

export const newMovieOrSeriesSchema = z.object({
  poster: z.string().refine(
    value => value.startsWith("data:image") 
    ||
    z.url().safeParse(value).success, {
      message: "Insira uma imagem válida",
    }
  ),

  title: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(50, "O nome deve ter ao máximo 50 caracteres"),

  year: z
    .string()
    .regex(/^\d{4}$/, "Insira um ano válido")
    .refine((value) => {
      const year = Number(value);
      const currentYear = new Date().getFullYear();

      return year >= 1895 && year <= currentYear;
    }, {
      message: `O ano deve estar entre 1895 e ${new Date().getFullYear()}`,
    }),

    
  genres: z
    .array(z
      .string()
      .min(1, "Gênero inválido")
      .max(50, "Gênero deve ter até 50 caracteres")
    )
    .min(1, "Insira pelo menos um gênero"),
});

export type NewMovieOrSeriesSchema = z.infer<typeof newMovieOrSeriesSchema>;