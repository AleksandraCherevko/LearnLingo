import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import css from "./RegisterForm.module.css";
import Button from "./Button";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const schema = yup
  .object({
    name: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be max 30 characters")
      .matches(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(/(?=.*[0-9])/, "Password must contain at least one number")
      .matches(
        /(?=.*[!@#$%^&*])/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  })
  .required();

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
      await updateProfile(user, { displayName: data.name });

      console.log("User registered:", user);
      console.log("Display Name:", user.displayName);
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      console.error(
        "Registration error:",
        firebaseError.code,
        firebaseError.message
      );
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={css.loginFormContainer}>
      <h3 className={css.loginFormTitle}>Registration</h3>
      <p className={css.loginFormAfterTitle}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={css.loginForm}>
        <div className={css.loginFormWrapperPosition}>
          <input
            className={`${css.loginFormInput} ${css.loginFormPosition}`}
            id="name"
            {...register("name")}
            type="text"
            placeholder="Name"
          />
          <p className={css.loginFormError}>{errors.name?.message}</p>
        </div>

        <div className={css.loginFormWrapperPosition}>
          <input
            className={`${css.loginFormInput} ${css.loginFormPosition}`}
            id="email"
            {...register("email")}
            type="email"
            placeholder="Email"
          />
          <p className={css.loginFormError}>{errors.email?.message}</p>
        </div>
        <div className={css.loginFormWrapper}>
          <input
            className={css.loginFormInput}
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={togglePassword}
            className={css.loginFormInputBtn}
          >
            <svg width="20" height="20" className={css.loginFormIcon}>
              <use href="/symbol-defs.svg#icon-eye"></use>
            </svg>
          </button>
        </div>
        <p className={css.loginFormError}>{errors.password?.message}</p>

        <Button className={css.loginFormBtn} type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
}
