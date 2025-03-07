import { database } from "@/apis/firebase";
import dayjs from "dayjs";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <div>
            <p>이메일: {userData?.email}</p>
            <p>닉네임: {userData?.displayName || "이름 없음"}</p>
            <p>
                생성일:{" "}
                {dayjs(userData?.createdAt).format(
                    "YYYY년 MM월 DD일 A HH시 mm분"
                )}
            </p>
            <p>
                마지막 접속일:{" "}
                {dayjs(userData?.lastLogin).format(
                    "YYYY년 MM월 DD일 A HH시 mm분"
                )}
            </p>
        </div>
    );
}

export default User;
