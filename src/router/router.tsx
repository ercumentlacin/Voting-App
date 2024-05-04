import { NavigationContainer } from "@react-navigation/native";
import TabRoot from "./tabs/tab";

export function Router() {
	return (
		<NavigationContainer>
			<TabRoot />
		</NavigationContainer>
	);
}
