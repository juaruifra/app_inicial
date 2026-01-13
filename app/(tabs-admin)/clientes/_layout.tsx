import { Stack } from "expo-router";
import AppHeader from "../../../src/components/layout/AppHeader";

export default function RootLayout() {
    return (
        <Stack screenOptions={{
            headerTitle: '',
            header: (props) => <AppHeader {...props} />,
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="[id]" />
        </Stack>
    );
}