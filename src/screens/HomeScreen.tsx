import { Link } from "@react-navigation/native";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import { COLORS } from "src/constants/colors";
import { useGetPollsQuery } from "src/redux/api/supabase-api";
import type { Poll } from "src/types";

const renderPoll = ({ item }: { item: Poll }) => {
	return (
		<Link
			to={{
				screen: "PollDetailScreen",
				params: { pollId: item.id.toString(), poll: item },
			}}
			style={styles.pollContainer}
		>
			<Text style={styles.pollTitle}>{item.question}</Text>
		</Link>
	);
};

export default function HomeScreen() {
	const { data: polls, isLoading } = useGetPollsQuery();

	if (isLoading) {
		return <ActivityIndicator size="large" color={COLORS.seasalt.DEFAULT} />;
	}

	return (
		<FlatList
			style={styles.root}
			data={polls}
			renderItem={renderPoll}
			contentContainerStyle={styles.container}
			keyExtractor={(item) => item.id.toString()}
		/>
	);
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: COLORS.platinum.DEFAULT,
	},
	container: {
		flex: 1,
		padding: 10,
		gap: 5,
	},
	pollContainer: {
		backgroundColor: COLORS.seasalt.DEFAULT,
		padding: 10,
		borderRadius: 5,
	},
	pollTitle: {
		fontSize: 16,
		fontWeight: "bold",
	},
});
