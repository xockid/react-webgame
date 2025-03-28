import Loading from "@/components/ui/Loading";
import cx from "classnames";
import commonStyles from "@/assets/styles/common.module.scss";
import styles from "./PostList.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "@/utils";
import fetchPosts from "@/components/post/fetchPosts";

function PostList() {
    const navigate = useNavigate();
    const { posts, loading } = fetchPosts();

    if (loading) {
        return <Loading />;
    }

    if (posts.length === 0) {
        return (
            <div className={styles.page}>
                <p className={styles.page__post__nodata}>글이 없습니다.</p>
                <Link
                    to="/post/write"
                    className={cx(
                        styles.page__post__btn,
                        commonStyles.commonBtnStyle
                    )}
                >
                    글 작성하러 가기
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <h1>글 목록</h1>
            <ul className={styles.page__post__list}>
                {posts.map((post) => (
                    <li
                        key={post.id}
                        onClick={() => navigate(`/post/${post.id}`)}
                    >
                        <div className={styles.title}>{post.title}</div>
                        <p className={styles.preview}>
                            {post.content.length > 100
                                ? post.content.slice(0, 120) + "..."
                                : post.content}
                        </p>
                        <span className={styles.date}>
                            {formatDate(post.createdAt.seconds)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;
