import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthHeader from "../../components/AuthHeader";
import { FormAuthTextInput } from "../../components/form/FormAuthTextInput";
import { FormPasswordInput } from "../../components/form/FormPasswordInput";

import {
  loginSchema,
  LoginFormValues,
} from "../../schemas/login.schema";

const Login: React.FC = () => {

  /*
    useForm crea y controla el formulario
    - resolver conecta Zod con el formulario
    - defaultValues son los valores iniciales
  */
  const {
    control,
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /*
    Esta función solo se ejecuta
    si TODOS los campos son válidos
  */
  const onSubmit = (data: LoginFormValues) => {
    console.log("Datos válidos:", data);
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        title="Bienvenido"
        subtitle="Introduce tus credenciales para continuar"
      />

      {/* Input de email */}
      <FormAuthTextInput
        control={control}
        name="email"
        label="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email" />}
      />

      {/* Input de contraseña */}
      <FormPasswordInput
        control={control}
        name="password"
      />

      <Button mode="text" style={styles.forgot}>
        ¿Olvidaste tu contraseña?
      </Button>

      {/* El submit pasa primero por Zod */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
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
        <Text style={styles.registerLink}>
          Regístrate ahora
        </Text>
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

export default Login;


