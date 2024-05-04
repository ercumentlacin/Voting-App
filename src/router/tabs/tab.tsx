import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "./home/home-tab";
import SettingsTab from "./settings/settings-tab";

const Tab = createBottomTabNavigator();

export default function TabRoot() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen name="HomeTab" component={HomeTab} />
			<Tab.Screen name="SettingsTab" component={SettingsTab} />
		</Tab.Navigator>
	);
}
