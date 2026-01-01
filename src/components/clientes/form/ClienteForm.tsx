import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Switch, Text, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ClienteFormValues } from "./clienteForm.types";
import { clienteFormSchema } from "./clienteForm.schema";
import { FormAuthTextInput } from "../../form/FormAuthTextInput";

type Props = {
  defaultValues: ClienteFormValues;
  onSubmit: (data: ClienteFormValues) => void;
  onCancel: () => void;
  submitLabel: string;
};

export default function ClienteForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClienteFormValues>({
    defaultValues,
    resolver: zodResolver(clienteFormSchema),
  });

  return (
    <View>
      {/* Nombre */}
      {/* <Controller
        control={control}
        name="nombre"
        render={({ field }) => (
          <TextInput
            label="Nombre"
            value={field.value}
            onChangeText={field.onChange}
            error={!!errors.nombre}
            style={styles.input}
          />
        )}
      />
      {errors.nombre && (
        <Text style={styles.error}>{errors.nombre.message}</Text>
      )} */}

      <FormAuthTextInput
              control={control}
              name="nombre"
              label="Nombre"
              //keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="account" />} //email
            />

      {/* NIF / CIF */}
      {/* <Controller
        control={control}
        name="nifCif"
        render={({ field }) => (
          <TextInput
            label="NIF / CIF"
            value={field.value}
            onChangeText={field.onChange}
            style={styles.input}
          />
        )}
      /> */}

      <FormAuthTextInput
              control={control}
              name="nifCif"
              label="NIF / CIF"
              autoCapitalize="none"
              left={<TextInput.Icon icon="card-account-details-outline" />} 
            />

      {/* Email */}
      {/* <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput
            label="Email"
            value={field.value}
            onChangeText={field.onChange}
            keyboardType="email-address"
            error={!!errors.email}
            style={styles.input}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.error}>{errors.email.message}</Text>
      )} */}

      <FormAuthTextInput
              control={control}
              name="email"
              label="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="email" />}
            />

      {/* Teléfono */}
      {/* <Controller
        control={control}
        name="telefono"
        render={({ field }) => (
          <TextInput
            label="Teléfono"
            value={field.value}
            onChangeText={field.onChange}
            keyboardType="phone-pad"
            style={styles.input}
          />
        )}
      /> */}

      <FormAuthTextInput
              control={control}
              name="telefono"
              label="Teléfono"
              keyboardType="phone-pad"
              autoCapitalize="none"
              left={<TextInput.Icon icon="phone" />}
            />

      {/* Notas */}
      {/* <Controller
        control={control}
        name="notas"
        render={({ field }) => (
          <TextInput
            label="Notas"
            value={field.value}
            onChangeText={field.onChange}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
        )}
      /> */}

      <FormAuthTextInput
        control={control}
        name="notas"
        label="Notas"
        autoCapitalize="none"
        multiline
        numberOfLines={3}
        left={<TextInput.Icon icon="note-text-outline" />} 
      />

      {/* Activo */}
      <Controller
        control={control}
        name="activo"
        render={({ field }) => (
          <View style={styles.switchRow}>
            <Text>Activo</Text>
            <Switch
              value={field.value}
              onValueChange={field.onChange}
            />
          </View>
        )}
      />

      {/* Acciones */}
      <View style={styles.actions}>
        <Button onPress={onCancel}>Cancelar</Button>
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          {submitLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 16,
  },
});
