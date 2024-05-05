import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "src/constants/colors";
import { useAuth } from "src/providers/auth-provider";
import HomeScreen from "src/screens/HomeScreen";
import LoginScreen from "src/screens/auth/login";
import PollDetailScreen from "src/screens/polls/[pollId]";
import PoolCreateScreen from "src/screens/polls/new";
import ProfileScreen from "src/screens/profile";
import type { RootStackParamList, RootStackScreenProps } from "src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeTabScreens() {
	const navigation =
		useNavigation<RootStackScreenProps<"HomeScreen">["navigation"]>();

	const session = useAuth();

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
					headerRight: () =>
						!session?.user.is_anonymous ? (
							<AntDesign
								name="plus"
								size={24}
								color="black"
								onPress={() => navigation.navigate("PoolCreateScreen")}
							/>
						) : null,
					headerLeft: () => (
						<AntDesign
							name={session?.user ? "user" : "login"}
							size={24}
							color="black"
							onPress={() =>
								navigation.navigate(
									!session?.user.is_anonymous ? "ProfileScreen" : "LoginScreen",
								)
							}
						/>
					),
				}}
				component={HomeScreen}
			/>

			<Stack.Screen
				name="PollDetailScreen"
				options={{
					headerTitle: "Poll",
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

			<Stack.Screen
				name="LoginScreen"
				options={{
					headerTitle: "Login",
				}}
				component={LoginScreen}
			/>

			<Stack.Screen
				name="ProfileScreen"
				options={{
					headerTitle: "Profile",
				}}
				component={ProfileScreen}
			/>
		</Stack.Navigator>
	);
}
