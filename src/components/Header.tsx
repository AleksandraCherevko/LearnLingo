import css from "./Header.module.css";
export default function Header() {
  return (
    <div className="container">
      <a href="/index.html" className={css.logo}>
        <svg width="133" height="28">
          <use href="/src/assets/symbol-defs.svg#icon-logo"></use>
        </svg>
      </a>
      <nav className={css.headerNavigation}>
        <ul className={css.headerNavList}>
          <li className={css.headerNavItem}>Home</li>
          <li className={css.headerNavItem}>Teachers</li>
        </ul>
        <button className={css.logInBtn} type="button">
          <svg className={css.logInIcon} width="20" height="20">
            <use href="/src/assets/symbol-defs.svg#icon-log-in"></use>
          </svg>
          Log in
        </button>
        <button className={css.registrBtn} type="button">
          Registration
        </button>
      </nav>
    </div>
  );
}
