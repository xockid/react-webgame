import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import styles from "@/assets/styles/common.module.scss";
import { AuthContextProvider } from "@/contexts/AuthContext";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

toastr.options = {
    timeOut: 2000,
    positionClass: "toast-bottom-center",
};

function App() {
    return (
        <AuthContextProvider>
            <div className={styles.wrapper}>
                <Header />
                <div className={styles.container}>
                    <Outlet />
                </div>
            </div>
        </AuthContextProvider>
    );
}

export default App;
