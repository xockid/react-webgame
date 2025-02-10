import { getProvider } from "@/utils";
import styles from "@/pages/Profile/Profile.module.scss";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const { user, isLoading } = useAuthContext();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
        }
    }, [user, isLoading]);


    return (
        <div className={styles.page}>
            <div className={styles.page__profile}>
                <ul className={styles.page__profile__info}>
                    <li>
                        <span className={styles.label}>로그인 제공업체</span>
                        <span className={styles.value}>
                            {getProvider(user?.providerData[0]?.providerId)}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Profile;
