import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput  } from "react-native-paper";
import AuthHeader from "../components/AuthHeader";
import AuthTextInput from "../components/AuthTextInput";
import PasswordInput from "../components/PasswordInput";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={styles.container}>
      <AuthHeader
        title="Bienvenido"
        subtitle="Introduce tus credenciales para continuar"
      />

      <AuthTextInput
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email" />} 
      />

      <PasswordInput
        value={password}
        onChangeText={setPassword}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
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
});

export default LoginScreen;


