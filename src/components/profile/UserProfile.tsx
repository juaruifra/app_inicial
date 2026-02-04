import React from "react";
import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import {
  Card,
  Text,
  Button,
  Avatar,
  useTheme,
  TextInput,
} from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUserStore } from "../../store/userStore";
import { useUpdateUserName } from "../../hooks/user/useUpdateUserName";

import { useUploadAvatar } from "../../hooks/user/useUploadAvatar";
import * as ImagePicker from "expo-image-picker";

import { FormAuthTextInput } from "../form/FormAuthTextInput";
import AppHeader from "../layout/AppHeader";

import {
  profileFormSchema,
  ProfileFormValues,
} from "./profileForm.schema";



export default function UserProfile() {
  const theme = useTheme();

  // Usuario global desde Zustand
  const user = useUserStore((state) => state.user);

  // Mutación para actualizar el nombre
  const updateNameMutation = useUpdateUserName();

  const uploadAvatarMutation = useUploadAvatar();

  //const updateUser = useUserStore((state) => state.updateUser);

  // Formulario con validación
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  // Seguridad extra
  if (!user) {
    return null;
  }

  // Guardar cambios en BD y luego en el store
  const onSubmit = (data: ProfileFormValues) => {
    updateNameMutation.mutate({
      userId: user.id,
      name: data.name,
    });
  };


  // Función para seleccionar y subir un avatar
  const handlePickAvatar = async () => {
    // Pedimos permiso para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== "granted") {
      alert("Necesitamos permisos para acceder a tus fotos");
      return;
    }

    // Abrimos el selector de imágenes
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Permite recortar la imagen
      aspect: [1, 1], // Proporción cuadrada para el avatar
      quality: 0.8, // Calidad de la imagen (0-1)
    });

    // Si el usuario no canceló la selección
    if (!result.canceled && result.assets[0]) {
      const selectedImage = result.assets[0];
      
      // Subimos el avatar
      uploadAvatarMutation.mutate({
        userId: user.id,
        fileUri: selectedImage.uri,
        fileType: selectedImage.mimeType || "image/jpeg",
      });
    }
  };


  const getInitials = (name: string) => {
    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("");
  };

  return (
    <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
      {/* Barra superior (SIN padding) */}
      <AppHeader />

      {/* Contenido con padding */}
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            {/* Cabecera del perfil */}
            <View style={styles.header}>
              {/* Avatar clickable con indicador de que se puede cambiar */}
              <Pressable onPress={handlePickAvatar} style={styles.avatarContainer}>
                {user.avatarUrl ? (
                  // Si hay avatar, mostramos la imagen
                  <Avatar.Image
                    size={72}
                    source={{ uri: user.avatarUrl }}
                  />
                ) : (
                  // Si no hay avatar, mostramos las iniciales
                  <Avatar.Text
                    size={72}
                    label={getInitials(user.name)}
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                )}
                
                {/* Icono de cámara superpuesto para indicar que es clickable */}
                <View style={styles.cameraIcon}>
                  <Avatar.Icon 
                    size={28} 
                    icon="camera" 
                    style={{ backgroundColor: theme.colors.primaryContainer }}
                  />
                </View>
                
                {/* Indicador de carga mientras sube */}
                {uploadAvatarMutation.isPending && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                  </View>
                )}
              </Pressable>

              <Text variant="titleMedium" style={styles.title}>
                Perfil de usuario
              </Text>

              <Text style={styles.role}>
                Rol: {user.role === "ADMIN" ? "Administrador" : "Usuario"}
              </Text>
            </View>

            {/* Nombre editable */}
            <FormAuthTextInput
              control={control}
              name="name"
              label="Nombre"
              autoCapitalize="words"
              left={<TextInput.Icon icon="account" />}
            />

            {/* Email solo lectura */}
            <FormAuthTextInput
              control={control}
              name="email"
              label="Correo electrónico"
              disabled
              defaultValue={user.email}
              left={<TextInput.Icon icon="email" />}
            />

            {/* Botón guardar */}
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting || updateNameMutation.isPending}
              style={styles.button}
            >
              Guardar cambios
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
  },
  cardContent: {
    gap: 12,
  },
  header: {
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    marginTop: 8,
    fontWeight: "600",
  },
  role: {
    opacity: 0.7,
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    alignSelf: "stretch",
  },
  avatarContainer: {
    position: "relative", // Para posicionar el icono encima
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 14,
    overflow: "hidden",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});
