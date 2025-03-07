import { getUsers, IUser } from "@/apis/firebase";
import { useEffect, useState } from "react";
import styles from "./UsersList.module.scss";
import { Link } from "react-router-dom";
import Loading from "@/components/ui/Loading";

export default function UsersList() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error("유저 데이터를 가져오는 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    if (loading) {
        return <Loading fixed={false} />;
    }

    return (
        <ul className={styles.usersList}>
            {users.map((user) => (
                <li key={user.id}>
                    <Link to={`/user/${user.id}`}>
                        {user.email} ({user.displayName || "닉네임 없음"})
                    </Link>
                </li>
            ))}
        </ul>
    );
}