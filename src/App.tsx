import 'react-native-gesture-handler';
import { registerRootComponent } from "expo";
import { StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { Router } from "./router/router";
import { Providers } from "./providers";

function App() {
	return (
		<Providers>
			<SafeAreaView
				style={{
					flex: 1,
				}}
			>
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
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default AppEntryPoint;
