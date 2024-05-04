import type { PropsWithChildren } from "react";
import AuthProvider from "./auth-provider";
import { ReduxProvider } from "./redux-provider";

export function Providers({ children }: Readonly<PropsWithChildren>) {
	return (
		<AuthProvider>
			<ReduxProvider>{children}</ReduxProvider>
		</AuthProvider>
	);
}
