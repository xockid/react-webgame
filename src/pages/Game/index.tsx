import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Gugudan,
    WordRelay,
    NumberBaseball,
    ResponseCheck,
    RSP,
    Lotto,
    Tictactoe,
    MineSearch,
} from "@/components/game";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";
import commonStyles from '@/assets/styles/common.module.scss';

function Game() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { id } = useParams();

    useEffect(() => {
        if (!user) {
            // 인증되지 않은 회원은
            navigate("/login"); // 로그인 페이지로
        }
    }, [user]);

    function GameTitle(id) {
        if (id == "gugudan") {
            return "구구단";
        } else if (id === "word-relay") {
            return "끝말잇기";
        } else if (id === "number-baseball") {
            return "숫자야구";
        } else if (id === "response-check") {
            return "반응속도체크";
        } else if (id === "rsp") {
            return "가위바위보";
        } else if (id === "lotto") {
            return "로또 추첨기";
        } else if (id === "tictactoe") {
            return "틱택토";
        } else if (id === "mine-search") {
            return "지뢰찾기";
        }
    }

    function GameMatcher(id) {
        if (id == "gugudan") {
            return <Gugudan />;
        } else if (id === "word-relay") {
            return <WordRelay />;
        } else if (id === "number-baseball") {
            return <NumberBaseball />;
        } else if (id === "response-check") {
            return <ResponseCheck />;
        } else if (id === "rsp") {
            return <RSP />;
        } else if (id === "lotto") {
            return <Lotto />;
        } else if (id === "tictactoe") {
            return <Tictactoe />;
        } else if (id === "mine-search") {
            return <MineSearch />;
        }
    }

    return (
        <>
            <h2>{GameTitle(id)}</h2>
            {GameMatcher(id)}
            <div className={commonStyles.commonBtn}>
                <Link to="/">메인으로 가기</Link>
            </div>
        </>
    );
}

export default Game;
