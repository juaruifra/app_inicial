import { useMutation } from "@tanstack/react-query";
import { uploadAndSaveAvatar } from "../../services/userProfileService";
import { useUserStore } from "../../store/userStore";

// Datos que recibe la mutación
type UploadAvatarParams = {
  userId: number;
  fileUri: string;
  fileType?: string;
};

/**
 * Hook para subir un avatar
 * - Sube la imagen a Supabase Storage
 * - Guarda la URL en la base de datos
 * - Si tiene éxito, actualiza el store local con la nueva URL
 */
export function useUploadAvatar() {
  // Obtenemos la función para actualizar el store
  const updateUser = useUserStore((state) => state.updateUser);

  return useMutation({
    // Función que ejecuta la subida y guardado del avatar
    mutationFn: ({ userId, fileUri, fileType }: UploadAvatarParams) =>
      uploadAndSaveAvatar(userId, fileUri, fileType),

    // Si la subida fue exitosa, actualizamos el store con la nueva URL
    onSuccess: (avatarUrl) => {
      updateUser({ avatarUrl });
    },

  });
}