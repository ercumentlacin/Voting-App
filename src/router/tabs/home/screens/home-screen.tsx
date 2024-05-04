import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "src/constants/colors";
import HomeScreen from "src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function HomeTabScreens() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="HomeScreen"
				options={{
					headerTitle: "Polls",
					headerStyle: { backgroundColor: COLORS.seasalt["900"] },
				}}
				component={HomeScreen}
			/>
		</Stack.Navigator>
	);
}
