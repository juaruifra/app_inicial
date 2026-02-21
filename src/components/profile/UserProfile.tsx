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

import { useSnackbar } from "../../hooks/useSnackbar";
import { getInitials } from "../../utils/user";

import { FormAuthTextInput } from "../form/FormAuthTextInput";
import AppHeader from "../layout/AppHeader";

// import { profileFormSchema,ProfileFormValues} from "./profileForm.schema";
import { createProfileFormSchema,ProfileFormValues} from "./profileForm.schema";
import { useAvatarManagement } from "../../hooks/user/useAvatarManagement";

import { useTranslation } from "react-i18next";



export default function UserProfile() {
  const theme = useTheme();
  const { t } = useTranslation();

  // Usuario global desde Zustand
  const user = useUserStore((state) => state.user);

  const { showSuccess, showError: showSnackbarError, SnackbarUI } = useSnackbar();

  // Mutación para actualizar el nombre
  const updateNameMutation = useUpdateUserName({
    onSuccess: () => {
      showSuccess(t("profile.nameUpdated"));
    },
    onError: (error) => {
      showSnackbarError(
        error instanceof Error ? error.message : t("profile.nameUpdateError")
      );
    },
  });

  const profileFormSchema = createProfileFormSchema(t);

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

  // Hook que gestiona toda la lógica del avatar
  const {
    handlePickAvatar,
    handleDeleteAvatar,
    isUploading,
    isDeleting,
    SnackbarUI: AvatarSnackbarUI,
    ConfirmDialogUI: AvatarConfirmDialogUI,
  } = useAvatarManagement({ userId: user.id });

  // Guardar cambios en BD y luego en el store
  const onSubmit = (data: ProfileFormValues) => {
    updateNameMutation.mutate({
      userId: user.id,
      name: data.name,
    });
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
                {isUploading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                  </View>
                )}
              </Pressable>

              <Text variant="titleMedium" style={styles.title}>
                {t("profile.title")}
              </Text>

              <Text style={styles.role}>
                {t("profile.role")} {user.role === "ADMIN" ? t("home.roleAdmin") : t("home.roleUser")}
              </Text>
            </View>

            {/* Botón para eliminar avatar (solo visible si hay avatar) */}
            {user.avatarUrl && (
              <Button
                mode="text"
                icon="delete"
                onPress={handleDeleteAvatar}
                loading={isDeleting}
                textColor={theme.colors.error}
                style={{ marginTop: 8 }}
              >
                {t("profile.deleteAvatar")}
              </Button>
            )}

            {/* Nombre editable */}
            <FormAuthTextInput
              control={control}
              name="name"
              label={t("common.name")}
              autoCapitalize="words"
              left={<TextInput.Icon icon="account" />}
            />

            {/* Email solo lectura */}
            <FormAuthTextInput
              control={control}
              name="email"
              label={t("common.email")}
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
              {t("profile.saveChanges")}
            </Button>
          </Card.Content>
        </Card>
      </View>

      {/* Modal y mensajes del avatar */}
      <AvatarConfirmDialogUI />
      <AvatarSnackbarUI />

      {/* Mensajes de éxito/error */}
      <SnackbarUI />

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
