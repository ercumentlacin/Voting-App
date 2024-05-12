import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTabScreens from "./home/screens/home-screen";
const Tab = createBottomTabNavigator();

export default function TabRoot() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen
				name="HomeTab"
				component={HomeTabScreens}
				options={{
					tabBarIcon: ({ color }) => (
						<AntDesign name="home" size={24} color={color} />
					),
				}}
			/>
			{/* <Tab.Screen name="SettingsTab" component={SettingsTab} /> */}
		</Tab.Navigator>
	);
}
