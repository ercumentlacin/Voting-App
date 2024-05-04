import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import { SafeAreaView, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { COLORS } from "./constants/colors";
import { Providers } from "./providers";
import { Router } from "./router/router";

function App() {
	return (
		<Providers>
			<SafeAreaView style={styles.container}>
				<Router />
			</SafeAreaView>
		</Providers>
	);
}

let AppEntryPoint = App;

if (Constants?.expoConfig?.extra?.storybookEnabled === "true") {
	AppEntryPoint = require("../.storybook").default;
}

registerRootComponent(AppEntryPoint);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.seasalt["900"],
	},
});

export default AppEntryPoint;
