import { useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import RootNavigation from "./src";
import themes from "./src/utils/theme";

export default function App() {
  // get user dark mode preference
  const prefersDarkMode = useColorScheme() === "dark";
  const theme = prefersDarkMode ? themes.dark : themes.light;

  return (
    <PaperProvider theme={theme}>
      <RootNavigation />
    </PaperProvider>
  );
}