import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import "react-native-gesture-handler";
import { Providers } from "./providers";
import { Router } from "./router/router";

function App() {
	return (
		<Providers>
			<Router />
		</Providers>
	);
}

let AppEntryPoint = App;

if (Constants?.expoConfig?.extra?.storybookEnabled === "true") {
	AppEntryPoint = require("../.storybook").default;
}

registerRootComponent(AppEntryPoint);

export default AppEntryPoint;
