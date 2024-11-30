import Link from "next/link";
import styles from "./Register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { isError } from "util";
const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEror, setIsEror] = useState("");
  const { push } = useRouter();
  const handleReg = async (e: any) => {
    e.preventDefault();
    setIsEror("");
    setIsLoading(true);
    const data = {
      email: e.target.email.value,
      fullname: e.target.fullname.value,
      password: e.target.password.value,
    };

    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      setIsLoading(false);
      e.target.reset();
      push("/auth/login");
    } else {
      setIsLoading(false);
      setIsEror(result.status === 400 ? "email already exist" : "");
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {isEror && <p style={{ color: "red" }}>{isEror}</p>}
      <form
        action="post"
        onSubmit={handleReg}
        className={styles.register__form}
      >
        <div className={styles.register__form__item}>
          <label htmlFor="email" className={styles.register__form__item__label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="email"
            name="email"
            className={styles.register__form__item__input}
          />
        </div>
        <div className={styles.register__form__item}>
          <label
            htmlFor="fullname"
            className={styles.register__form__item__label}
          >
            Fullname
          </label>
          <input
            type="text"
            id="fullname"
            placeholder="fullname"
            name="fullname"
            className={styles.register__form__item__input}
          />
        </div>
        <div className={styles.register__form__item}>
          <label
            htmlFor="password"
            className={styles.register__form__item__label}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            name="password"
            className={styles.register__form__item__input}
          />
        </div>
        <button
          type="submit"
          className={styles.register__form__item__button}
          disabled={isLoading}
        >
          {isLoading ? "loading..." : "register"}
        </button>
      </form>
      <p className={styles.register__haveAccount}>
        have account? <Link href="/auth/login">login</Link>
      </p>
    </div>
  );
};

export default RegisterView;
