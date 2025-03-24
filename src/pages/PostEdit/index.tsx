import { getPostById, updatePost } from "@/apis/firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toastr from "toastr";
import commonStyles from "@/assets/styles/common.module.scss";
import styles from "./PostEdit.module.scss";
import Loading from "@/components/ui/Loading";

function PostEdit() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postData = await getPostById(postId);
                setTitle(postData.title);
                setContent(postData.content);
            } catch (err) {
                console.error(err);
                toastr.error("글을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            toastr.error("제목과 내용을 모두 입력해주세요.");
            return;
        }

        try {
            await updatePost(postId, title, content);
            toastr.success("글이 수정되었습니다.");
            navigate(`/post/${postId}`);
        } catch (err) {
            console.error(err);
            toastr.error("수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.page__post__edit}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className={commonStyles.commonInput}
                        placeholder="제목을 입력해주세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className={commonStyles.commonTextarea}
                        placeholder="내용을 입력해주세요."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <div className={commonStyles.commonBtn}>
                        <button type="submit">수정</button>
                        <button
                            type="button"
                            onClick={() => navigate(`/post/${postId}`)}
                        >
                            취소
                        </button>
                    </div>
                    {loading && <Loading />}
                </form>
            </div>
        </div>
    );
}

export default PostEdit;
