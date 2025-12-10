import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import type { TextInputProps } from "react-native-paper";

type PasswordInputProps = Omit<TextInputProps, "secureTextEntry" | "right">;

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <TextInput
      {...props}
      label={props.label ?? "Contraseña"}
      mode="outlined"
      secureTextEntry={!showPassword}
      style={[styles.input, props.style]}
      left={<TextInput.Icon icon="lock" />}
      right={
        <TextInput.Icon
          icon={showPassword ? "eye-off" : "eye"}
          onPress={() => setShowPassword(!showPassword)}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
});

export default PasswordInput;
