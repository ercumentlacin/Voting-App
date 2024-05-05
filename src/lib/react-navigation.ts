import {
  useNavigation as useReactNavigation,
  useRoute as useReactRoute,
} from "@react-navigation/native";
import type {
  GenericScreenNavigationProp,
  HomeTabParamList,
  RootStackParamList,
  RootStackScreenProps,
} from "src/types";

export const useNavigation = () =>
  useReactNavigation<GenericScreenNavigationProp<keyof HomeTabParamList>>();

export const useRoute = <T extends keyof RootStackParamList>() =>
  useReactRoute<RootStackScreenProps<T>["route"]>();
