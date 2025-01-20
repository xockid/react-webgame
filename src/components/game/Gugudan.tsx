import styles from '@/components/game/Gugudan.module.scss';
import { useState, useRef, FormEvent, ChangeEvent } from 'react';

const Gugudan = () => {
    const [first, setFirst] = useState<number>(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState<number>(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
        setResult(`정답: ${value}`);
        setFirst(Math.ceil(Math.random() * 9));
        setSecond(Math.ceil(Math.random() * 9));
        setValue('');
        inputRef.current?.focus();
        } else {
        setResult('땡');
        setValue('');
        inputRef.current?.focus();
        }
    };

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
    };

    return (
        <div className={styles.gugudan}>
        <div className={styles.gugudan__question}>{first} × {second} ＝ </div>
        <form className={styles.gugudan__form} onSubmit={onSubmitForm}>
            <input
                className={styles.gugudan__form__input}
                ref={inputRef}
                type="number"
                onChange={onChangeInput}
                value={value}
            />
            <button className={styles.gugudan__form__button}>입력</button>
        </form>
        <div className={styles.gugudan__result}>{result}</div>
        </div>
    );
};

export { Gugudan };