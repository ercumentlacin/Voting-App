import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "src/constants/colors";
import HomeScreen from "src/screens/HomeScreen";
import PollDetailScreen from "src/screens/polls/[pollId]";
import PoolCreateScreen from "src/screens/polls/new";
import type { RootStackParamList, RootStackScreenProps } from "src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeTabScreens() {
	const navigation =
		useNavigation<RootStackScreenProps<"HomeScreen">["navigation"]>();
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
					headerRight: () => (
						<AntDesign
							name="plus"
							size={24}
							color="black"
							onPress={() => navigation.navigate("PoolCreateScreen")}
						/>
					),
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

			<Stack.Screen
				name="PoolCreateScreen"
				options={{
					headerTitle: "Create Pool",
				}}
				component={PoolCreateScreen}
			/>
		</Stack.Navigator>
	);
}
