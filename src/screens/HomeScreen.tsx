import { Link } from "@react-navigation/native";
import type { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { COLORS } from "src/constants/colors";
import { supabase } from "src/lib/supabase";
import type { Row } from "src/types/supabase";

type Poll = Row<"polls">;

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
	const [polls, setPolls] = useState<Poll[]>([]);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState<PostgrestError | null>(null);

	useEffect(() => {
		async function fetchPolls() {
			setIsPending(true);
			const { data: polls, error } = await supabase.from("polls").select("*");
			if (error) {
				setError(error);
			} else {
				setPolls(polls);
			}
			setIsPending(false);
		}
		fetchPolls();
	}, []);

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
