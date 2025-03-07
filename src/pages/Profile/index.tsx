import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import commonStyles from "@/assets/styles/common.module.scss";
import styles from "./Profile.module.scss";
import Loading from "@/components/ui/Loading";
import Modal from "@/components/ui/Modal";
import { useQueryClient } from "@tanstack/react-query";
import cx from 'classnames';
import { getProvider } from "@/utils";

function Profile() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { user, isLoading, removeUser } = useAuthContext();
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
        try {
            if (user?.providerData[0]?.providerId === "password") {
                setShowModal(true);
                return;
            }

            await removeUser();
            navigate("/login");
            queryClient.invalidateQueries({
                queryKey: ["user", "me"],
            });
        } catch (error) {
            console.error("회원 탈퇴 에러:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            const result = await removeUser(user?.email, password);

            if (result === true) {
                setShowModal(false);
                navigate("/login");
                queryClient.invalidateQueries({
                    queryKey: ["user", "me"],
                });
            }
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
                            <span className={styles.label}>
                                로그인 제공업체
                            </span>
                            <span className={styles.value}>
                                {getProvider(user?.providerData[0]?.providerId)}
                            </span>
                        </li>
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
            <div className={commonStyles.commonBtn}>
                <button
                    className={commonStyles.commonBtnStyle}
                    onClick={handleRemoveUser}
                >
                    회원탈퇴
                </button>
            </div>

            {/* 모달 */}
            {showModal && (
                <Modal
                    title="비밀번호 확인"
                    content={
                        <div>
                            <p>회원 탈퇴를 위해 비밀번호를 입력해주세요.</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호"
                                className={commonStyles.commonInput}
                            />
                            <div
                                className={cx(commonStyles.commonBtn, styles.modalBtn) }
                            >
                                <button
                                    className={commonStyles.commonBtnStyle}
                                    onClick={handleSubmit}
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
