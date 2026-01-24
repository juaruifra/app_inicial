import React from "react";
import { View, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Text,
  Card,
  Avatar,
  Chip,
  useTheme,
} from "react-native-paper";
import AppHeader from "../layout/AppHeader";
import { useUserStore } from "../../store/userStore";

export default function HomeScreen() {
  const theme = useTheme();
  const user = useUserStore((state) => state.user);

  // Mientras el usuario se restaura desde storage
  if (!user) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  const isAdmin = user.role === "ADMIN";

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <AppHeader />

      {/* Contenido */}
      <View style={styles.content}>
        {/* Card de bienvenida */}
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Icon
              size={64}
              icon="account"
              style={{
                backgroundColor: theme.colors.primary,
              }}
            />

            <View style={styles.userInfo}>
              <Text variant="titleMedium">
                Bienvenido,
                <Text style={{ fontWeight: "bold" }}> {user.name}</Text>
              </Text>

              <Chip
                style={[
                  styles.roleChip,
                  {
                    backgroundColor: isAdmin
                      ? theme.colors.errorContainer
                      : theme.colors.secondaryContainer,
                  },
                ]}
                textStyle={{
                  color: isAdmin
                    ? theme.colors.error
                    : theme.colors.secondary,
                  fontWeight: "600",
                }}
                icon={isAdmin ? "shield-account" : "account-check"}
              >
                {isAdmin ? "Administrador" : "Usuario"}
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Texto contextual */}
        <Text
          variant="bodyMedium"
          style={[
            styles.subtitle,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          Desde aquí puedes acceder a los distintos módulos de la aplicación y
          gestionar tu trabajo diario.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  userInfo: {
    flex: 1,
    gap: 6,
  },
  roleChip: {
    alignSelf: "flex-start",
  },
  subtitle: {
    opacity: 0.8,
    lineHeight: 20,
  },
});
