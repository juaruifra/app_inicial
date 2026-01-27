import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Correo electrónico inválido"),

  password: z
    .string()
    .min(4, "La contraseña debe tener al menos 4 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
