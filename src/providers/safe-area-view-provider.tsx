import type { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { COLORS } from "src/constants/colors";

export default function SafeAreaViewProvider({
	children,
}: Readonly<PropsWithChildren>) {
	return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.seasalt["900"],
	},
});
