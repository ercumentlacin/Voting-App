import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "src/redux/store";

export function ReduxProvider({ children }: Readonly<PropsWithChildren>) {
	return <Provider store={store}>{children}</Provider>;
}
