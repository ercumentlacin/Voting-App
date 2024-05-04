import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTabScreens from "./home/screens/home-screen";
import SettingsTab from "./settings/settings-tab";

const Tab = createBottomTabNavigator();

export default function TabRoot() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen name="HomeTab" component={HomeTabScreens} />
			<Tab.Screen name="SettingsTab" component={SettingsTab} />
		</Tab.Navigator>
	);
}
