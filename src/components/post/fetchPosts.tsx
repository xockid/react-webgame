import { getPosts } from "@/apis/firebase";
import { useEffect, useState } from "react";
import toastr from "toastr";

function fetchPosts(limit: number = 0) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const data = await getPosts();
                setPosts(limit > 0 ? data.slice(0, limit) : data);
            } catch (err) {
                console.error(err);
                toastr.error("글을 불러오는 중 오류 발생");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [limit]);

    return { posts, loading };
}

export default fetchPosts;
