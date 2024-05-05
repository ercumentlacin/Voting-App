import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "src/constants/colors";
import { useNavigation } from "src/lib/react-navigation";
import { supabase } from "src/lib/supabase";
import { useAuth } from "src/providers/auth-provider";
import type { RootStackScreenProps, Vote } from "src/types";

export default function PollDetailScreen() {
	const {
		params: { pollId, poll: initialPoll },
	} = useRoute<RootStackScreenProps<"PollDetailScreen">["route"]>();
	const navigation = useNavigation();
	const session = useAuth();

	const [poll, setPoll] = useState(initialPoll);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [userVote, setUserVote] = useState<Vote | null>(null);

	const userId = session?.user.id;

	useEffect(() => {
		async function fetchPoll(id: number) {
			const { data: poll, error } = await supabase
				.from("polls")
				.select("*")
				.eq("id", id)
				.single();

			if (error) return Alert.alert("Fetch Poll Error", error.message);

			if (poll) setPoll(poll);
		}

		fetchPoll(Number(pollId));
	}, [pollId]);

	useEffect(() => {
		async function fetchUserVote(pollId: number, userId?: string) {
			if (!userId) return;
			const { data: vote } = await supabase
				.from("votes")
				.select("*")
				.eq("poll_id", pollId)
				.eq("user_id", userId)
				.limit(1)
				.single();

			if (vote) {
				setSelectedOption(vote.option);
				setUserVote(vote);
			}
		}

		fetchUserVote(Number(pollId), userId);
	}, [pollId, userId]);

	if (!poll) {
		return <Text>Poll not found</Text>;
	}

	const handleVote = async () => {
		if (!selectedOption)
			return Alert.alert("Vote Error", "Please select an option to vote");

		if (!session?.user) return Alert.alert("Error", "Please sign in to vote");

		const { data, error } = await supabase
			.from("votes")
			.upsert({
				id: userVote?.id || undefined,
				option: selectedOption,
				poll_id: poll.id,
				user_id: session?.user?.id,
			})
			.select()
			.single();

		if (error) return Alert.alert("Error", error.message);

		if (data) {
			Alert.alert("Success", "Vote submitted successfully");
			navigation.navigate("HomeScreen");
		}
	};

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
						<Text>{option}</Text>
					</Pressable>
				))}
			</View>

			<View>
				<Button title="Vote" onPress={handleVote} />
			</View>
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
