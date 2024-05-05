import React, { useState } from "react";
import {
	Alert,
	AppState,
	Button,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { COLORS } from "src/constants/colors";
import { useNavigation } from "src/lib/react-navigation";
import { supabase } from "src/lib/supabase";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();

	async function signInWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	}

	async function signUpWithEmail() {
		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		else if (!session)
			Alert.alert("Please check your inbox for email verification!");
		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign in or Create an account</Text>
			<View style={styles.verticallySpaced}>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setEmail(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={"none"}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Text style={styles.label}>Password</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={"none"}
				/>
			</View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					title="Sign in"
					disabled={loading}
					onPress={() =>
						signInWithEmail().then(() => navigation.navigate("HomeScreen"))
					}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Button
					title="Sign up"
					disabled={loading}
					onPress={() =>
						signUpWithEmail().then(() => navigation.navigate("HomeScreen"))
					}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
		gap: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: "500",
	},
	verticallySpaced: {
		alignSelf: "stretch",
		gap: 5,
	},
	mt20: {
		marginTop: 20,
	},
	label: {
		fontWeight: "500",
		marginTop: 10,
	},
	input: {
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		backgroundColor: COLORS.seasalt[900],
		width: "100%",
	},
});
