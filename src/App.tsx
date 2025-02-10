import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import styles from "@/assets/styles/common.module.scss";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

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

toastr.options = {
    timeOut: 2000,
    positionClass: "toast-bottom-center",
};

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
