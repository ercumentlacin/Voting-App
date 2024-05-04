import type { Session } from "@supabase/supabase-js";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type PropsWithChildren,
} from "react";
import { supabase } from "src/lib/supabase";

type AuthProviderContextType = Session | null;

const AuthProviderContext = createContext<AuthProviderContextType>(null);

export default function AuthProvider({
	children,
}: Readonly<PropsWithChildren>) {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<AuthProviderContext.Provider value={session}>
			{children}
		</AuthProviderContext.Provider>
	);
}

export const useAuth = () => useContext(AuthProviderContext);
