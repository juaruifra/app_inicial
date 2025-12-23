import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthHeader from "../../src/components/AuthHeader";
import { FormAuthTextInput } from "../../src/components/form/FormAuthTextInput";
import { FormPasswordInput } from "../../src/components/form/FormPasswordInput";
import { LoginFormValues, loginSchema } from "../../src/schemas/login.schema";
import { useAuth } from "../../src/context/AuthContext";
import { router } from "expo-router";



const Login: React.FC = () => {

    // Estado para mostrar errores de autenticación
  const [authError, setAuthError] = React.useState<string | null>(null);

  // Estado para desactivar el botón mientras se valida
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  const { login } = useAuth();

  /*
    Esta función solo se ejecuta
    si TODOS los campos son válidos
  */
  const onSubmit = async (data: LoginFormValues) => {
    console.log("Datos válidos:", data);

    setAuthError(null);
    setIsSubmitting(true);

    try {
    // Intentamos autenticar
      await login(data.email, data.password);

      // Si todo va bien, entramos a la app
      router.replace("/home");
    } catch (error: any) {
      // Error real de autenticación (credenciales incorrectas)
      setAuthError(
        error?.message ?? "Correo o contraseña incorrectos"
      );
    } finally {
      setIsSubmitting(false);
    }
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

      {authError && (
        <Text
          style={{
            color: "red",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          {authError}
        </Text>
      )}


      <Button mode="text" style={styles.forgot}>
        ¿Olvidaste tu contraseña?
      </Button>

      {/* El submit pasa primero por Zod */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        loading={isSubmitting}
        disabled={isSubmitting}
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


