import { Link } from "@react-navigation/native";
import type { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { COLORS } from "src/constants/colors";
import { supabase } from "src/lib/supabase";
import type { Database } from "src/types/supabase";

const polls = [{ id: "1" }, { id: "2" }, { id: "3" }];

const renderPoll = ({ item }: { item: { id: string } }) => {
	return (
		<Link
			to={{
				screen: "PollDetailScreen",
				params: { pollId: item.id },
			}}
			style={styles.pollContainer}
		>
			<Text style={styles.pollTitle}>Example poll title</Text>
		</Link>
	);
};

export default function HomeScreen() {
	const [polls, setPolls] = useState<
		Database["public"]["Tables"]["polls"]["Row"][]
	>([]);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState<PostgrestError | null>(null);

	useEffect(() => {
		async function fetchPolls() {
			setIsPending(true);
			const { data: polls, error } = await supabase.from("polls").select("*");
			console.log("🚀 ~ fetchPolls ~ polls, error:", polls, error);
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
			keyExtractor={(item) => item.id}
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
