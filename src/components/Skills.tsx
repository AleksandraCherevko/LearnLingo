import css from "./Skills.module.css";

export default function Skills() {
  return (
    <div className={css.skillsContainer}>
      <div className="container">
        <svg
          className={css.skillsBorderSVG}
          width="1360"
          height="116"
          viewBox="0 0 1360 116"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.75"
            y="0.75"
            width="1360"
            height="114.5"
            rx="30"
            stroke="var(--accent-color)"
            strokeWidth="1.5"
            strokeDasharray="15 15"
          />
        </svg>
        <div className={css.skillsBorder}>
          <ul className={css.skillsList}>
            <li className={css.skillsItem}>
              <div
                className={`${css.skillsItemWrapper} ${css.skillsItemExper}`}
              >
                <p className={css.skillsCount}>32,000</p>
                <p className={css.skillsDescribe}>Experienced tutors</p>
              </div>
            </li>

            <li className={css.skillsItem}>
              <div className={`${css.skillsItemWrapper} ${css.skillsItemStar}`}>
                <p className={css.skillsCount}>300,000</p>
                <p className={css.skillsDescribe}>5-star tutor reviews</p>
              </div>
            </li>

            <li className={css.skillsItem}>
              <div className={`${css.skillsItemWrapper} ${css.skillsItemSub}`}>
                <p className={css.skillsCount}>120</p>
                <p className={css.skillsDescribe}>Subjects taught</p>
              </div>
            </li>

            <li className={css.skillsItem}>
              <div className={`${css.skillsItemWrapper} ${css.skillsItemSub}`}>
                <p className={css.skillsCount}>200</p>
                <p className={css.skillsDescribe}>Tutor nationalities</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
