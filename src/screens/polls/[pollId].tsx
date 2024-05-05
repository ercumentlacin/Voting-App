import { Feather } from "@expo/vector-icons";
import { Link, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "src/constants/colors";
import { useNavigation } from "src/lib/react-navigation";
import type { RootStackScreenProps } from "src/types";

const poll = {
	question: "React vs Vue",
	options: ["React", "Vue"],
};

export default function PollDetailScreen() {
	const {
		params: { pollId },
	} = useRoute<RootStackScreenProps<"PollDetailScreen">["route"]>();
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			headerTitle: poll.question,
		});
	}, [navigation]);

	const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
			>
				<Text style={styles.nextButtonText}>Next</Text>
			</Link>
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
	option: {
		// fontSize: 18,
	},
	nextButton: {
		position: "absolute",
		bottom: 16,
		right: 16,
		backgroundColor: "blue",
		padding: 16,
		borderRadius: 8,
	},
	nextButtonText: {
		color: "white",
		fontSize: 18,
	},
});
