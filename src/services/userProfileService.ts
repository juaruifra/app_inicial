import { supabase } from "../lib/supabaseClient";

/**
 * Actualiza el nombre del usuario en la base de datos
 * @param userId - ID del usuario a actualizar
 * @param name - Nuevo nombre
 */
export async function updateUserName(
  userId: number,
  name: string
): Promise<void> {
  // Actualizamos el campo 'name' en la tabla 'users'
  const { error } = await supabase
    .from("users")
    .update({ name })
    .eq("id", userId);

  // Si hay error, lo lanzamos para que lo capture React Query
  if (error) {
    throw new Error(`Error al actualizar el nombre: ${error.message}`);
  }
}

/**
 * Actualiza la URL del avatar en la base de datos
 * @param userId - ID del usuario
 * @param avatarUrl - URL pública del avatar
 */
export async function updateUserAvatar(
  userId: number,
  avatarUrl: string
): Promise<void> {
  // Guardamos la URL del avatar en la tabla users
  const { error } = await supabase
    .from("users")
    .update({ avatar_url: avatarUrl })
    .eq("id", userId);

  if (error) {
    throw new Error(`Error al actualizar el avatar: ${error.message}`);
  }
}

/**
 * Tipos de archivo permitidos para avatares
 */
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

/**
 * Valida que el tipo de archivo sea una imagen permitida
 * @param fileType - Tipo MIME del archivo
 * @returns true si es válido, false si no
 */
function isValidImageType(fileType: string): boolean {
  return ALLOWED_IMAGE_TYPES.includes(fileType.toLowerCase());
}

/**
 * Obtiene la extensión del archivo según su tipo MIME
 * @param fileType - Tipo MIME del archivo
 * @returns Extensión del archivo (.jpg o .png)
 */
function getFileExtension(fileType: string): string {
  if (fileType === "image/png") return ".png";
  return ".jpg"; // Por defecto jpeg/jpg
}

/**
 * Sube un avatar a Supabase Storage y devuelve su URL pública
 * Solo permite imágenes JPG y PNG
 * @param userId - ID del usuario (se usa para nombrar el archivo)
 * @param fileUri - URI local del archivo en el dispositivo
 * @param fileType - Tipo MIME del archivo (debe ser 'image/jpeg' o 'image/png')
 */
export async function uploadAvatarToStorage(
  userId: number,
  fileUri: string,
  fileType: string = "image/jpeg"
): Promise<string> {
  // Validamos que sea un tipo de imagen permitido
  if (!isValidImageType(fileType)) {
    throw new Error(
      "Tipo de archivo no permitido. Solo se aceptan imágenes JPG y PNG"
    );
  }

  // Leemos el archivo desde el dispositivo
  const response = await fetch(fileUri);
  const blob = await response.blob();

  // Nombre único: userId-timestamp con la extensión correcta
  const timestamp = Date.now();
  const extension = getFileExtension(fileType);
  const fileName = `${userId}-${timestamp}${extension}`;

  // Subimos el archivo al bucket 'avatars' en Supabase Storage
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, blob, {
      contentType: fileType,
      upsert: true, // Si existe, lo reemplaza
    });

  if (error) {
    throw new Error(`Error al subir el avatar: ${error.message}`);
  }

  // Obtenemos la URL pública del archivo subido
  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

/**
 * Función completa: sube el avatar y actualiza la BD
 * @param userId - ID del usuario
 * @param fileUri - URI local del archivo
 * @param fileType - Tipo MIME del archivo
 * @returns La URL pública del nuevo avatar
 */
export async function uploadAndSaveAvatar(
  userId: number,
  fileUri: string,
  fileType?: string
): Promise<string> {
  // Subimos el archivo a Supabase Storage
  const avatarUrl = await uploadAvatarToStorage(userId, fileUri, fileType);

  // Guardamos la URL en la base de datos
  await updateUserAvatar(userId, avatarUrl);

  // Devolvemos la URL para actualizar el estado local
  return avatarUrl;
}