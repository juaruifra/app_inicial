import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Appbar, Menu, Divider, Text, Avatar, useTheme } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";

type AppHeaderProps = {
    title? : string
};
    
export default function AppHeader({ title = "" }: AppHeaderProps) {
  // Obtenemos el usuario y la función de logout desde el contexto
  const { user, logout } = useAuth();

  // Estado para controlar si el menú está abierto o cerrado
  const [menuVisible, setMenuVisible] = React.useState(false);

  // Abrimos el menú
  const openMenu = () => setMenuVisible(true);

  // Cerramos el menú
  const closeMenu = () => setMenuVisible(false);

  const theme = useTheme();

  // Si por algún motivo no hay usuario, no mostramos la barra
  if (!user) {
    return null;
  }

  return (
    <Appbar.Header>
      {/* Logo de la aplicación a la izquierda */}
      <Image
        source={require("../../../assets/img/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Espaciador con el título para empujar el avatar a la derecha */}
      <Appbar.Content title={title} titleStyle={{
          fontSize: 18,
            fontWeight: "bold",
            color: theme.colors.primary
        }} />

      {/* Menú de usuario */}
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
            <Pressable onPress={openMenu}>
                <View style={styles.avatarWrapper}>
                    <Avatar.Icon
                    size={36}
                    icon="account"
                    color="white"
                    style={styles.avatar}
                    />
                </View>
            </Pressable>
        }
>
        {/* Información del usuario */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {user.name}
          </Text>
          <Text style={styles.userEmail}>
            {user.email}
          </Text>
        </View>

        <Divider />

        {/* Opciones futuras */}
        <Menu.Item
          onPress={() => {
            closeMenu();
          }}
          title="Preferencias"
        />

        <Menu.Item
          onPress={() => {
            closeMenu();
          }}
          title="Editar perfil"
        />

        <Menu.Item
          onPress={() => {
            closeMenu();
          }}
          title="Cambiar contraseña"
        />

        <Divider />

        {/* Cerrar sesión */}
        <Menu.Item
          onPress={async () => {
            closeMenu();
            await logout();
          }}
          title="Cerrar sesión"
        />
      </Menu>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({

    avatarWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        overflow: "hidden",
        marginRight: 15
    },
    avatar: {
        backgroundColor: "#6750A4",
    },
    logo: {
        height: 95,
        width: 120,
        marginLeft: 8,
    },
    userInfo: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    userName: {
        fontWeight: "bold",
    },
    userEmail: {
        fontSize: 12,
        opacity: 0.7,
    }
});
