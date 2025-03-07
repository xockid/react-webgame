import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import commonStyles from "@/assets/styles/common.module.scss";
import styles from "./Profile.module.scss";
import Loading from "@/components/ui/Loading";
import { removeUser } from "@/apis/firebase";
import Modal from "@/components/ui/Modal";

function Profile() {
    const navigate = useNavigate();
    const { user, isLoading } = useAuthContext();
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
        }
    }, [user, isLoading]);

    if (isLoading) {
        return <Loading />;
    }

    const handleRemoveUser = async () => {
        if (!user) return;

        //일반 인증 유저 탈퇴 시 모달 띄우기
        const providerId = user.providerData[0]?.providerId;
        if (providerId === "password") {
            setShowModal(true);
        } else {
            try {
                await removeUser();
                navigate("/login");
            } catch (error) {
                console.error("회원 탈퇴 에러:", error);
            }
        }
    };

    const handleConfirmRemove = async () => {
        if (!user || !password) return;

        try {
            await removeUser(user.email!, password);
            navigate("/login");
        } catch (error) {
            console.error("회원 탈퇴 에러:", error);
        }
    };

    return (
        <>
            <div className={styles.page}>
                <div className={styles.page__profile}>
                    <ul className={styles.page__profile__info}>
                        <li>
                            <span className={styles.label}>이메일</span>
                            <span className={styles.value}>{user?.email}</span>
                        </li>
                        <li>
                            <span className={styles.label}>닉네임</span>
                            <span className={styles.value}>
                                {user?.displayName ?? "방문자"}
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
            </div>
            <div>
                <button onClick={handleRemoveUser}>회원탈퇴</button>
            </div>

            {/* 모달 */}
            {showModal && (
                <Modal
                    title="비밀번호 확인"
                    content={
                        <div>
                            <p>비밀번호를 입력해주세요.</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={commonStyles.commonInput}
                            />
                            <div className={`${commonStyles.commonBtn} ${styles.modalBtn}`}>
                                <button
                                    className={commonStyles.commonBtnStyle}
                                    onClick={handleConfirmRemove}
                                >
                                    확인
                                </button>
                                <button
                                    className={commonStyles.commonBtnStyle}
                                    onClick={() => setShowModal(false)}
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    }
                />
            )}
        </>
    );
}

export default Profile;
