//
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";

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
          setAuthError(
            "Invalid email address or password!"
          );
          break;
      }
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div>
      <h3>Log In</h3>
      <p>Welcome back! Please enter your credentials to access your account.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="email"
          {...register("email")}
          type="text"
          placeholder="Email"
        />
        <p>{errors.email?.message}</p>
        <input
          id="password"
          {...register("password")}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
        />
        <button type="button" onClick={togglePassword}>
          <svg width="20" height="20">
            <use href="/symbol-defs.svg#icon-eye"></use>
          </svg>
        </button>
        <p>{errors.password?.message}</p>
        {authError && <p>{authError}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
