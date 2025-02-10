import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import styles from "@/assets/styles/common.module.scss";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retryOnMount: true,
            refetchOnReconnect: false,
            retry: false,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <div className={styles.wrapper}>
                    <Header />
                    <div className={styles.container}>
                        <Outlet />
                    </div>
                </div>
            </AuthContextProvider>
            <ReactQueryDevtools
                initialIsOpen={import.meta.env.VITE_PUBLIC_MODE === "local"}
            />
        </QueryClientProvider>
    );
}

export default App;
