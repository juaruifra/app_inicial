import { useMutation } from "@tanstack/react-query";
import { updateUserName } from "../../services/userProfileService";
import { useUserStore } from "../../store/userStore";

// Datos que recibe la mutación
type UpdateUserNameParams = {
  userId: number;
  name: string;
};

// Opciones opcionales para callbacks
type UseUpdateUserNameOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

/**
 * Hook para actualizar el nombre del usuario
 * - Llama al servicio que actualiza en base de datos
 * - Si tiene éxito, actualiza el store local (Zustand)
 * @param options - Callbacks opcionales de éxito y error
 */
export function useUpdateUserName(options?: UseUpdateUserNameOptions) {
  // Obtenemos la función para actualizar el store
  const updateUser = useUserStore((state) => state.updateUser);

  return useMutation({
    // Función que ejecuta la actualización en BD
    mutationFn: ({ userId, name }: UpdateUserNameParams) =>
      updateUserName(userId, name),

    // Si la actualización en BD fue exitosa, actualizamos el store local
    onSuccess: (data, variables) => {
      updateUser({ name: variables.name });
      // Llamamos al callback de éxito si existe
      options?.onSuccess?.();
    },

    // Si hay error, llamamos al callback de error si existe
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
}