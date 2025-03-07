import styles from "@/components/common/Header.module.scss";
import { useAuthContext } from "@/contexts/AuthContext";
import cx from "classnames";
import commonStyles from "@/assets/styles/common.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user, logout } = useAuthContext();
    const handleLogout = async () => {
        await logout();
        await queryClient.invalidateQueries({
            queryKey: ["user", "me"],
        });
        navigate("/login");
    };

    return (
        <header className={styles.header}>
            <span></span>
            <h1>
                <Link to="/">Vite + React.js로 웹게임 만들기</Link>
            </h1>
            <div
                className={cx(styles.header__utilmenu, commonStyles.commonBtn)}
            >
                {user ? (
                    <>
                        <Link to="/profile">
                            {user.displayName ?? "방문자"}님 반갑습니다.
                        </Link>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <Link to="/login">회원가입/로그인</Link>
                )}
            </div>
        </header>
    );
}
