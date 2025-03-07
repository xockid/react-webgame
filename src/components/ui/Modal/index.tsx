import { ReactNode } from "react";
import styles from "./Modal.module.scss";

type Props = {
    title: string;
    content: ReactNode;
};

export default function Modal({ title, content }: Props) {
    return (
        <div className={styles.modal}>
            <div className={styles.modal__content}>
                <h3>{title}</h3>
                {content}
            </div>
        </div>
    );
}

// 사용예시 <Modal title="모달 제목" content={<p>모달 내용</p>} />
