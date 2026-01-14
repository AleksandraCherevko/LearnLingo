import css from "./Header.module.css";
import { useTheme } from "../theme/useTheme";
import type { ThemeName } from "../theme/types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { auth } from "../firebase";

type HeaderProps = {
  onLogin: () => void;
  onRegister: () => void;
};

export default function Header({ onLogin, onRegister }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { user, isAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div className={css.headerContainer}>
      <div className="container">
        <nav className={css.headerNavigation}>
          <Link to="/" className={css.logo}>
            <svg className={css.logoIcon} width="133" height="28">
              <use href="/symbol-defs.svg#icon-logo"></use>
            </svg>
        </Link>
          <ul className={css.headerNavList}>
            <li className={css.headerNavItem}>
              <Link to="/" className={css.headerNavLink}>
                Home
              </Link>
            </li>
            <li className={css.headerNavItem}>
              <Link to="/teachers" className={css.headerNavLink}>
                Teachers
              </Link>
            </li>
            {isAuth && (
              <li className={css.headerNavItem}>
                <Link to="/favorites" className={css.headerNavLink}>
                  Favorites
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className={css.headerBtn}>
          {!isAuth ? (
            <>
              <button className={css.logInBtn} onClick={onLogin} type="button">
                <svg className={css.logInIcon} width="20" height="20">
                  <use href="/symbol-defs.svg#icon-log-in"></use>
                </svg>
                Log in
              </button>
              <button
                className={css.registrBtn}
                onClick={onRegister}
                type="button"
              >
                Registration
              </button>
            </>
          ) : (
            <>
              <p className={css.userNameHello}>
                Hello,{" "}
                <span className={css.userName}>
                  {user?.displayName || user?.email}
                </span>
              </p>

              <button
                className={css.registrBtn}
                onClick={handleLogout}
                type="button"
              >
                Logout
              </button>
            </>
          )}
        </div>
        <select
          className={css.themeSelect}
          value={theme}
          onChange={(e) => setTheme(e.target.value as ThemeName)}
        >
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
        </select>
      </div>
    </div>
  );
}
