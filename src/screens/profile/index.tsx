import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "src/lib/react-navigation";
import { supabase } from "src/lib/supabase";
import { useAuth } from "src/providers/auth-provider";
import SafeAreaViewProvider from "src/providers/safe-area-view-provider";

export default function ProfileScreen() {
	const session = useAuth();
	const navigation = useNavigation();

	useEffect(() => {
		if (session?.user.is_anonymous) {
			return navigation.replace("HomeScreen");
		}
		if (!session) {
			return navigation.replace("LoginScreen");
		}
	}, [session, navigation]);

	return (
		<SafeAreaViewProvider>
			<View style={styles.container}>
				<Text style={styles.title}>
					{session?.user
						? `Signed in as ${session.user.email}`
						: "Not signed in"}
				</Text>
				<Button
					title="Sign out"
					onPress={() => {
						supabase.auth.signOut();
						navigation.navigate("HomeScreen");
					}}
				/>
			</View>
		</SafeAreaViewProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
