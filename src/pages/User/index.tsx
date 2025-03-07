import { database } from "@/apis/firebase";
import dayjs from "dayjs";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./User.module.scss";

function User() {
    const { uid } = useParams<{ uid: string }>();
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (uid) {
            const fetchUserData = async () => {
                try {
                    const userDocRef = doc(database, "users", uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        setUserData(userDocSnap.data());
                    } else {
                        setError("유저 정보를 찾을 수 없습니다.");
                    }
                } catch (error) {
                    console.error(
                        "유저 정보를 불러오는 데 실패했습니다.",
                        error
                    );
                    setError("유저 정보를 불러오는 데 실패했습니다.");
                }
            };

            fetchUserData();
        }
    }, [uid]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.user}>
            <ul className={styles.user__info}>
                <li>
                    <span className={styles.label}>이메일</span>
                    <span className={styles.value}>{userData?.email}</span>
                </li>
                <li>
                    <span className={styles.label}>닉네임</span>
                    <span className={styles.value}>
                        {userData?.displayName || "이름 없음"}
                    </span>
                </li>
                <li>
                    <span className={styles.label}>생성일</span>
                    <span className={styles.value}>
                        {dayjs(userData?.createdAt).format(
                            "YYYY년 MM월 DD일 A HH시 mm분"
                        )}
                    </span>
                </li>
                <li>
                    <span className={styles.label}>마지막 접속일</span>
                    <span className={styles.value}>
                        {dayjs(userData?.lastLogin).format(
                            "YYYY년 MM월 DD일 A HH시 mm분"
                        )}
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default User;
