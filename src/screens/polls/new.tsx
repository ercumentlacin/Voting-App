import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "src/constants/colors";
import { useNavigation } from "src/lib/react-navigation";
import { supabase } from "src/lib/supabase";
import { useAuth } from "src/providers/auth-provider";

export default function PoolCreateScreen() {
	const [title, setTitle] = useState("");
	const [options, setOptions] = useState<string[]>(["a", "b"]);
	const [error, setError] = useState<string | null>(null);

	const navigation = useNavigation();
	const session = useAuth();

	useEffect(() => {
		if (!session) {
			return navigation.replace("LoginScreen");
		}
	}, [session, navigation]);

	const updateOptionText = (text: string, index: number): void => {
		setOptions((prevState) => [
			...new Set(prevState.map((item, i) => (i === index ? text : item))),
		]);
	};

	const removeOption = (index: number) =>
		setOptions((p) => p.filter((_, i) => i !== index));

	const validatePollForm = () => {
		setError(null);

		const isTitleEmpty = title.trim() === "";
		const isOptionsEmpty = options.some((option) => option.trim() === "");
		const isOptionsDuplicate = new Set(options).size !== options.length;
		const isOptionsLessThanTwo = options.length < 2;

		if (isTitleEmpty) return setError("Title is required");

		if (isOptionsEmpty) return setError("Options are required");

		if (isOptionsDuplicate) return setError("Options must be unique");

		if (isOptionsLessThanTwo)
			return setError("At least two options are required");
	};
	const createNewPoll = async () => {
		validatePollForm();

		const { data, error } = await supabase
			.from("polls")
			.insert({
				options,
				question: title,
			})
			.select()
			.single();

		if (error) {
			return Alert.alert("Error creating poll", error.message);
		}

		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Title</Text>
			<TextInput
				style={styles.input}
				placeholder="Type your poll title"
				value={title}
				onChangeText={setTitle}
			/>

			<Text style={styles.label}>Options</Text>
			{options.map((option, index) => (
				<View key={index} style={styles.optionsContainer}>
					<TextInput
						style={styles.input}
						placeholder={`Option ${index + 1}`}
						value={option}
						onChangeText={(text) => updateOptionText(text, index)}
					/>
					<Feather
						name="x"
						size={18}
						color={COLORS.slate_gray.DEFAULT}
						onPress={() => removeOption(index)}
						style={styles.iconX}
					/>
				</View>
			))}

			<Button
				title="Add Option"
				onPress={() => setOptions((p) => p.concat(""))}
			/>

			<Button title="Create Poll" onPress={createNewPoll} />
			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		gap: 5,
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
	optionsContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconX: {
		position: "absolute",
		right: 10,
		top: 10,
	},
	errorText: {
		color: "crimson",
	},
});
