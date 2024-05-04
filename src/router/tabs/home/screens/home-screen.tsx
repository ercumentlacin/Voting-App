import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "src/constants/colors";
import HomeScreen from "src/screens/HomeScreen";
import PollDetailScreen from "src/screens/polls/[pollId]";
import type { RootStackParamList } from "src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeTabScreens() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: COLORS.seasalt["900"] },
			}}
		>
			<Stack.Screen
				name="HomeScreen"
				options={{
					headerTitle: "Polls",
					headerShown: true,
				}}
				component={HomeScreen}
			/>
			<Stack.Screen
				name="PollDetailScreen"
				options={{
					headerTitle: "PollDetailScreen",
				}}
				component={PollDetailScreen}
			/>
		</Stack.Navigator>
	);
}
