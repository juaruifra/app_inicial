import React from "react";
import { View, StyleSheet } from "react-native";
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
  const updateUser = useUserStore((state) => state.updateUser);

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

  // Guardar cambios en el store
  const onSubmit = (data: ProfileFormValues) => {
    updateUser({
      name: data.name,
    });
  };

  // Seguridad extra
  if (!user) {
    return null;
  }

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
              <Avatar.Text
                size={72}
                label={getInitials(user.name)}
                style={{ backgroundColor: theme.colors.primary }}
              />

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
              loading={isSubmitting}
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
});
