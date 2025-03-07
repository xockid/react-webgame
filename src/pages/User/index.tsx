import { getUser } from "@/apis/firebase";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./User.module.scss";
import Loading from "@/components/ui/Loading";

function User() {
    const { uid } = useParams<{ uid: string }>();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const isUser = await getUser(uid);
                setUser(isUser);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [uid]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={styles.user}>
            <ul className={styles.user__info}>
                <li>
                    <span className={styles.label}>이메일</span>
                    <span className={styles.value}>{user?.email}</span>
                </li>
                <li>
                    <span className={styles.label}>닉네임</span>
                    <span className={styles.value}>
                        {user?.displayName || "이름 없음"}
                    </span>
                </li>
                <li>
                    <span className={styles.label}>생성일</span>
                    <span className={styles.value}>
                        {dayjs(user?.createdAt).format(
                            "YYYY년 MM월 DD일 A HH시 mm분"
                        )}
                    </span>
                </li>
                <li>
                    <span className={styles.label}>마지막 접속일</span>
                    <span className={styles.value}>
                        {dayjs(user?.lastLogin).format(
                            "YYYY년 MM월 DD일 A HH시 mm분"
                        )}
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default User;
