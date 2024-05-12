import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "src/constants/colors";
import { useNavigation } from "src/lib/react-navigation";
import { useAuth } from "src/providers/auth-provider";
import SafeAreaViewProvider from "src/providers/safe-area-view-provider";
import {
	useGetPollByIdQuery,
	useGetVoteByIdQuery,
	useUpsertVoteMutation,
} from "src/redux/api/supabase-api";
import type { RootStackScreenProps, Vote } from "src/types";

export default function PollDetailScreen() {
	const {
		params: { pollId, poll: initialPoll },
	} = useRoute<RootStackScreenProps<"PollDetailScreen">["route"]>();
	const navigation = useNavigation();
	const session = useAuth();

	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [userVote, setUserVote] = useState<Vote | null>(null);

	const userId = session?.user.id;

	const {
		data: pollData,
		error: pollError,
		isLoading: pollLoading,
		isFetching: pollFetching,
		refetch: refetchPoll,
	} = useGetPollByIdQuery(Number(pollId));

	const poll = pollData || initialPoll;

	const {
		data: voteData,
		error: voteError,
		isLoading: voteLoading,
		isFetching: voteFetching,
		refetch: refetchVote,
	} = useGetVoteByIdQuery({ pollId: Number(pollId), userId: userId });

	useEffect(() => {
		if (voteData) {
			setSelectedOption(voteData.option);
			setUserVote(voteData);
		}
	}, [voteData]);

	const [createOrUpdateVoteMutation, { isLoading: voteMutationLoading }] =
		useUpsertVoteMutation();

	if (!poll) {
		return <Text>Poll not found</Text>;
	}

	const handleVote = async () => {
		if (!selectedOption)
			return Alert.alert("Vote Error", "Please select an option to vote");

		if (!session?.user) return Alert.alert("Error", "Please sign in to vote");

		await createOrUpdateVoteMutation({
			option: selectedOption,
			poll_id: poll.id,
			user_id: session?.user?.id,
			id: userVote?.id,
		})
			.then(() => {
				Alert.alert("Success", "Vote submitted successfully");
				navigation.navigate("HomeScreen");
			})
			.catch((error) => {
				Alert.alert("Error", error.message);
			});
	};

	return (
		<SafeAreaViewProvider>
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
					<Button
						title={!voteMutationLoading ? "Vote" : "Voting..."}
						onPress={handleVote}
						disabled={voteMutationLoading}
					/>
				</View>
			</View>
		</SafeAreaViewProvider>
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
