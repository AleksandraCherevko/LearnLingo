//
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";
import css from "./LoginForm.module.css";
import Button from "./Button";

type FormData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),

    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be max 30 characters")
      .required("Password is required"),
  })
  .required();

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("User signed in:", userCredential.user);
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case "auth/user-not-found":
          setAuthError("User not found. Please register first.");
          break;

        case "auth/wrong-password":
          setAuthError("Incorrect password.");
          break;

        case "auth/invalid-email":
          setAuthError("Invalid email address.");
          break;

        default:
          setAuthError("Invalid email address or password!");
          break;
      }
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={css.loginFormContainer}>
      <h3 className={css.loginFormTitle}>Log In</h3>
      <p className={css.loginFormAfterTitle}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>

      <div className={css.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={css.loginForm}>
          <div className={css.loginFormWrapperPosition}>
            <input
              className={`${css.loginFormInput} ${css.loginFormPosition}`}
              id="email"
              {...register("email")}
              type="text"
              placeholder="Email"
            />
            <p className={css.loginFormError}>{errors.email?.message}</p>
          </div>
          <div className={css.loginFormWrapper}>
            <input
              className={css.loginFormInput}
              id="password"
              {...register("password")}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />
            <button
              className={css.loginFormInputBtn}
              type="button"
              onClick={togglePassword}
            >
              <svg className={css.loginFormIcon} width="20" height="20">
                <use href="/symbol-defs.svg#icon-eye"></use>
              </svg>
            </button>
          </div>
          <p className={css.loginFormError}>{errors.password?.message}</p>
          {authError && <p className={css.loginFormError}>{authError}</p>}

          <Button className={css.loginFormBtn} type="submit">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
