import Link from "next/link";
import styles from "./Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEror, setIsEror] = useState("");
  const { push, query } = useRouter();
  const callbackUrl = query.callbackUrl || "/";
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsEror("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: callbackUrl as string,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl as string);
      } else {
        setIsLoading(false);
        setIsEror("email or password wrong");
      }
    } catch (error) {
      setIsLoading(false);
      setIsEror("email or password wrong");
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {isEror && <p style={{ color: "red" }}>{isEror}</p>}
      <form action="post" onSubmit={handleLogin} className={styles.login__form}>
        <div className={styles.login__form__item}>
          <label htmlFor="email" className={styles.login__form__item__label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="email"
            name="email"
            className={styles.login__form__item__input}
          />
        </div>
        <div className={styles.login__form__item}>
          <label htmlFor="password" className={styles.login__form__item__label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            name="password"
            className={styles.login__form__item__input}
          />
        </div>
        <button
          type="submit"
          className={styles.login__form__item__button}
          disabled={isLoading}
        >
          {isLoading ? "loading..." : "login"}
        </button>
      </form>
      <button
        className={styles.login__form__item__google}
        onClick={() =>
          signIn("google", {
            callbackUrl: callbackUrl as string,
            redirect: false,
          })
        }
      >
        Sign In With Google
      </button>
      <p className={styles.login__haveAccount}>
        dont have an account? <Link href="/auth/login">Register</Link>
      </p>
    </div>
  );
};

export default LoginView;
/*
ket:
pada div tersebut pemanggilan style class dengan styles.login yang didapatkan dari ./Login.module.css
pada h2 tersebut pemanggilan style menggunakan tailwind
pada h1 tersebut pemanggilan class big diambil dari global css
pada p tersebut styling diterapkan langsung ke javascriptnya langsung dengan cara style={{ color: "red", fontSize: "20px" }}
*/
