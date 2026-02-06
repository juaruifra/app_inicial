import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Button, useTheme } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { useUserStore } from "../../store/userStore";
import { useChangePassword } from "../../hooks/user/useChangePassword";
import { useSnackbar } from "../../hooks/useSnackbar";
import { FormPasswordInput } from "../form/FormPasswordInput";
import AppHeader from "../layout/AppHeader";

import {
  changePasswordSchema,
  ChangePasswordFormValues,
} from "./changePassword.schema";

export default function ChangePasswordScreen() {
  const theme = useTheme();
  const user = useUserStore((state) => state.user);
  
  // Hook para mensajes
  const { showSuccess, showError, SnackbarUI } = useSnackbar();

  // Hook para cambiar contraseña
  const changePasswordMutation = useChangePassword({
    onSuccess: () => {
      showSuccess("Contraseña cambiada correctamente");
      // Limpiamos el formulario
      reset();
      // Volvemos atrás después de 1.5 segundos
      setTimeout(() => router.back(), 1500);
    },
    onError: (error) => {
      showError(
        error instanceof Error ? error.message : "Error al cambiar la contraseña"
      );
    },
  });

  // Formulario con validación
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Función para enviar el formulario
  const onSubmit = (data: ChangePasswordFormValues) => {
    if (!user?.email) return;

    changePasswordMutation.mutate({
      email: user.email,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <AppHeader />

      {/* Contenido */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Title title="Cambiar contraseña" />
          <Card.Content style={styles.cardContent}>

            {/* Contraseña actual */}
            <FormPasswordInput
              control={control}
              name="currentPassword"
              label="Contraseña actual"
            />

            {/* Nueva contraseña */}
            <FormPasswordInput
              control={control}
              name="newPassword"
              label="Nueva contraseña"
            />

            {/* Confirmar contraseña */}
            <FormPasswordInput
              control={control}
              name="confirmPassword"
              label="Confirmar contraseña"
            />

            {/* Botón guardar */}
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting || changePasswordMutation.isPending}
              style={styles.button}
            >
              Cambiar contraseña
            </Button>

            {/* Botón cancelar */}
            <Button
              mode="text"
              onPress={() => router.back()}
              disabled={changePasswordMutation.isPending}
              style={styles.cancelButton}
            >
              Cancelar
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Mensajes */}
      <SnackbarUI />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
  },
  cardContent: {
    gap: 16,
  },
  button: {
    marginTop: 8,
  },
  cancelButton: {
    marginTop: 4,
  },
});