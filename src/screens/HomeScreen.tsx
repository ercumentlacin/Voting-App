import { FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS } from "src/constants/colors";

const polls = [1, 2, 3];

const renderPoll = ({ item }: { item: number }) => {
	return (
		<View style={styles.pollContainer}>
			<Text style={styles.pollTitle}>Example poll title</Text>
		</View>
	);
};

export default function HomeScreen() {
	return (
		<FlatList
			style={styles.root}
			data={polls}
			renderItem={renderPoll}
			contentContainerStyle={styles.container}
			keyExtractor={(item) => item.toString()}
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
