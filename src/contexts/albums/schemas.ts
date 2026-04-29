import { z } from "zod";

export const albumNewFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .max(255, { message: "O título deve conter no máximo 255 caracteres" }),
  photosIds: z.array(z.string().uuid()).optional(),
});

export type AlbumNewFormSchema = z.infer<typeof albumNewFormSchema>;
