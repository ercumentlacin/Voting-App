import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import { supabase } from "src/lib/supabase";
import { useAuth } from "src/providers/auth-provider";

export default function ProfileScreen() {
	const session = useAuth();
	const navigation = useNavigation();

	if (!session) {
		return navigation.navigate("LoginScreen");
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{session?.user ? `Signed in as ${session.user.email}` : "Not signed in"}
			</Text>

			<Button title="Sign out" onPress={() => supabase.auth.signOut()} />
		</View>
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
