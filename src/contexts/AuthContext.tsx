import { createContext, useContext } from "react";
import {
    socialLogin,
    login,
    logout,
    signup,
    fetchUser,
} from "@apis/firebase";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
    // const [user, setUser] = useState<any>();
    const {
        data: isUser,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: fetchUser,
        staleTime: 60 * 1000, // 기본 설정은 0 (fresh -> stale)
        gcTime: 300 * 1000, // 기본 값이 300 * 1000, 5분임
    });

    // useEffect(() => {
    //     onUserStateChange((user) => setUser(user));
    // }, []);

    return (
        <AuthContext.Provider
            value={{
                user: isUser,
                uid: isUser && isUser.uid,
                isLoading,
                isError,
                socialLogin,
                login,
                logout,
                signup,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}
