import { SignedIn, SignedOut, ClerkProvider } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Text } from 'react-native';
import LoginScreen from "../components/loginScreen";
import tokenCache from "../hooks/useTokenCache";


export default function RootLayout() {
  useFonts({
    'numito': require('./../assets/fonts/Nunito-Italic-VariableFont_wght.ttf'),
    'roboto': require('./../assets/fonts/RobotoSlab-VariableFont_wght.ttf')
  })
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Stack screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen/>
      </SignedOut>
    </ClerkProvider>
  );
}
