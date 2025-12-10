import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text,Avatar } from "react-native-paper";


const LoginScreen: React.FC = () => {

  // Variables de estado para los campos de entrada
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.container}>

      <Avatar.Icon size={72} icon="account" style={styles.avatar} />

      <Text style={styles.title}>Bienvenido</Text>

      <Text style={styles.subtitle}>Introduce tus credenciales para continuar</Text>

      <TextInput
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email" />}
        style={styles.input}
      />

      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry={!showPassword}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        style={styles.input}
      />

      <Button mode="text" onPress={() => {}} style={styles.forgot}>
        ¿Olvidaste tu contraseña?
      </Button>

      <Button mode="contained" onPress={() => {}} style={styles.button}>
        Iniciar Sesión
      </Button>

      <Text style={styles.or}>O continúa con</Text>

      <Button
        mode="outlined"
        icon="google"
        onPress={() => {}}
        style={styles.googleButton}
      >
        Google
      </Button>

      <Text style={styles.register}>
        ¿No tienes una cuenta?{" "}
        <Text style={styles.registerLink}>Regístrate ahora</Text>
      </Text>
    </View>
  );
};

// Crea una variable de estilos para aplicarlos a los elementos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 28,
    fontWeight: "bold"
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  input: {
    marginBottom: 12,
  },
  forgot: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  button: {
    marginBottom: 24,
  },
  or: {
    textAlign: "center",
    marginBottom: 16,
    color: "#888",
  },
  googleButton: {
    marginBottom: 24,
  },
  register: {
    textAlign: "center",
  },
  registerLink: {
    color: "#6200EE",
    fontWeight: "bold",
  },
  avatar: {
    alignSelf: "center",
    marginBottom: 20,
  }
});

export default LoginScreen;

