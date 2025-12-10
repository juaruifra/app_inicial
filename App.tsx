import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./src/app/LoginScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <LoginScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

