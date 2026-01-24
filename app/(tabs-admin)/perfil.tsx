import React from "react";
import { ScrollView } from "react-native";
import AppHeader from "../../src/components/layout/AppHeader";
import UserProfile from "../../src/components/profile/UserProfile";

export default function PerfilScreen() {
  return (
    <>
      {/* Header global */}
      <AppHeader />

      {/* Contenido */}
      <ScrollView>
        <UserProfile />
      </ScrollView>
    </>
  );
}
