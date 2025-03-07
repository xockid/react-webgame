import { getUsers } from "@/apis/firebase";
import { useEffect, useState } from "react";
import styles from "./UsersList.module.scss";
import { Link } from "react-router-dom";

type User = {
    uid: string;
    displayName?: string | null;
};

function UsersList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
        }
        fetchUsers();
    }, []);

    return (
        <ul className={styles.usersList}>
            {users.length > 0 ? (
                users.map((user) => (
                    <li key={user.uid}>
                        <Link to={`/user/${user.uid}`}>
                            {user.displayName || "방문자"}
                        </Link>
                    </li>
                ))
            ) : (
                <li>유저가 없습니다.</li>
            )}
        </ul>
    );
}

export default UsersList;
