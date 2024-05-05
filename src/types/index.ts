import type {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import type {
  CompositeNavigationProp,
  CompositeScreenProps,
  RouteProp,
} from "@react-navigation/native";
import type {
  StackNavigationProp,
  StackScreenProps,
} from "@react-navigation/stack";
import type { Database } from "./supabase";

export type Row<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Poll = Row<"polls">;
export type Vote = Row<"votes">;

export type RootStackParamList = {
  HomeScreen: undefined;
  PollDetailScreen: { pollId: string; poll?: Row<"polls"> };
  PoolCreateScreen: undefined;
  LoginScreen: undefined;
  ProfileScreen: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
  HomeTab: undefined;
  SettingsTab: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type GenericScreenNavigationProp<T extends keyof HomeTabParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<HomeTabParamList, T>,
    StackNavigationProp<RootStackParamList>
  >;

export type GenericScreenRouteProp<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>;

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }
