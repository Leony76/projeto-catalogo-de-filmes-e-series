import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const RootLayout = (): React.JSX.Element | null => {
  const [loaded] = useFonts({
    "Bendayni-Demo" : require('@assets/fonts/bemdayniDemo.otf'),
    "Catalunya"     : require('@assets/fonts/catalunya.otf'),
    "Umbrata"       : require('@assets/fonts/umbrata.ttf'),
    "Nunito"        : require('@assets/fonts/nunito.ttf'),
    "Nunito-Italic" : require('@assets/fonts/nunitoItalic.ttf'),
  });

  if (!loaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="home/titles/[id]"
          options={{
            presentation : "transparentModal",
            animation    : "fade",
            headerShown  : false,
          }}
        />

        <Stack.Screen
          name="home/titles/new"
          options={{
            presentation : "transparentModal",
            animation    : "fade",
            headerShown  : false,
          }}
        />
      </Stack>
    </>
  );
};

export default RootLayout;
