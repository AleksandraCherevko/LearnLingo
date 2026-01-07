import css from "./Header.module.css";

type HeaderProps = {
  onLogin: () => void;
  onRegister: () => void;
};

export default function Header({ onLogin, onRegister }: HeaderProps) {
  return (
    <div className="container">
      <a href="/index.html" className={css.logo}>
        <svg width="133" height="28">
          <use href="/symbol-defs.svg#icon-logo"></use>
        </svg>
      </a>
      <nav className={css.headerNavigation}>
        <ul className={css.headerNavList}>
          <li className={css.headerNavItem}>
            <a href="/index.html">Home</a>
          </li>
          <li className={css.headerNavItem}>
            <a href="">Teachers</a>
          </li>
        </ul>
        <button className={css.logInBtn} onClick={onLogin} type="button">
          <svg className={css.logInIcon} width="20" height="20">
            <use href="/symbol-defs.svg#icon-log-in"></use>
          </svg>
          Log in
        </button>
        <button className={css.registrBtn} onClick={onRegister} type="button">
          Registration
        </button>
      </nav>
    </div>
  );
}
