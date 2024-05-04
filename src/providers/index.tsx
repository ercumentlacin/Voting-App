import type { PropsWithChildren } from "react";
import { ReduxProvider } from "./redux-provider";

export function Providers({ children }: Readonly<PropsWithChildren>) {
	return <ReduxProvider>{children}</ReduxProvider>;
}
