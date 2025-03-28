import Loading from "@/components/ui/Loading";
import { Link, useNavigate } from "react-router-dom";
import cx from "classnames";
import commonStyles from "@/assets/styles/common.module.scss";
import styles from "./PostsList.module.scss";
import { formatDate } from "@/utils";
import fetchPosts from "@/components/post/fetchPosts";

function PostsList() {
    const navigate = useNavigate();
    const { posts, loading } = fetchPosts(5);

    if (loading) {
        return <Loading />;
    }

    if (posts.length == 0) {
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
        <>
            <div className={styles.page}>
                <ul className={styles.page__post__list}>
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            onClick={() => navigate(`/post/${post.id}`)}
                        >
                            <span className={styles.title}>{post.title}</span>
                            <span className={styles.date}>
                                {formatDate(post.createdAt.seconds)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <Link
                to={"/postlist"}
                className={cx(
                    styles.page__post__btn,
                    commonStyles.commonBtnStyle
                )}
            >
                더보기
            </Link>
        </>
    );
}

export default PostsList;
