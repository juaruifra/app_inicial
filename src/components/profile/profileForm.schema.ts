import { z } from "zod";

/**
 * Validación del formulario de perfil
 * Solo permitimos editar el nombre
 */
export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre es demasiado largo"),
  email: z.string().email("El correo electrónico no es válido").optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
