import css from "./Header.module.css";
import { useTheme } from "../theme/useTheme";
import type { ThemeName } from "../theme/types";

type HeaderProps = {
  onLogin: () => void;
  onRegister: () => void;
};

export default function Header({ onLogin, onRegister }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  return (
    <div className={css.headerContainer}>
      <div className="container">
        <nav className={css.headerNavigation}>
          <a href="/index.html" className={css.logo}>
            <svg width="133" height="28">
              <use href="/symbol-defs.svg#icon-logo"></use>
            </svg>
          </a>

          <ul className={css.headerNavList}>
            <li className={css.headerNavItem}>
              <a href="/index.html" className={css.headerNavLink}>
                Home
              </a>
            </li>
            <li className={css.headerNavItem}>
              <a href="" className={css.headerNavLink}>
                Teachers
              </a>
            </li>
          </ul>
        </nav>
        <div className={css.headerBtn}>
          <button className={css.logInBtn} onClick={onLogin} type="button">
            <svg className={css.logInIcon} width="20" height="20">
              <use href="/symbol-defs.svg#icon-log-in"></use>
            </svg>
            Log in
          </button>
          <button className={css.registrBtn} onClick={onRegister} type="button">
            Registration
          </button>
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
