import { Feather } from "@expo/vector-icons";
import { Link, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "src/constants/colors";
import { supabase } from "src/lib/supabase";
import type { RootStackScreenProps } from "src/types";

export default function PollDetailScreen() {
	const {
		params: { pollId, poll: initialPoll },
	} = useRoute<RootStackScreenProps<"PollDetailScreen">["route"]>();

	const [poll, setPoll] = useState(initialPoll);

	useEffect(() => {
		async function fetchPoll(id: number) {
			const { data: poll, error } = await supabase
				.from("polls")
				.select("*")
				.eq("id", id)
				.single();

			if (error) return Alert.alert("Error", error.message);

			if (poll) setPoll(poll);
		}

		fetchPoll(Number(pollId));
	}, [pollId]);

	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	if (!poll) {
		return <Text>Poll not found</Text>;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.question}>{poll.question}</Text>

			<View style={styles.optionList}>
				{poll.options.map((option) => (
					<Pressable
						key={option}
						style={styles.optionContainer}
						onPress={() => setSelectedOption(option)}
					>
						<Feather
							name={selectedOption === option ? "check-circle" : "circle"}
							size={18}
							color={selectedOption === option ? "green" : "black"}
						/>
						<Text style={styles.option}>{option}</Text>
					</Pressable>
				))}
			</View>

			<View>
				<Button title="Vote" onPress={() => {}} />
			</View>

			<Link
				to={{
					screen: "PollDetailScreen",
					params: { pollId: String(Number(pollId) + 1) },
				}}
				style={styles.nextButton}
			></Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		gap: 20,
		flex: 1,
	},
	question: {
		fontSize: 20,
		fontWeight: "600",
		color: COLORS.eerie_black.DEFAULT,
	},
	optionList: {
		gap: 5,
	},
	optionContainer: {
		backgroundColor: COLORS.seasalt.DEFAULT,
		padding: 10,
		borderRadius: 5,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
});
