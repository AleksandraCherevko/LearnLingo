import css from "./Hero.module.css";
import Button from "./Button";
import { useTheme } from "../theme/useTheme";
import { themes } from "../theme/theme";

export default function Hero() {
  const { theme } = useTheme();
  return (
    <div className={css.hero}>
      <div className="container">
        <div className={css.heroText}>
          <div className={css.heroContent}>
            <h1 className={css.heroTitle}>
              Unlock your potential with <br />
              the best <span className={css.heroSpan}>language</span> tutors
            </h1>
            <p className={css.heroAfterTitle}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <Button className={css.heroBtn} type="submit">
              Get Started
            </Button>
          </div>
        </div>
        <div className={css.heroImgContainer}>
          <img
            className={css.heroImg}
            src={themes[theme].heroImage}
            alt="girl with iMac in yellow theme"
            width={568}
            height={530}
          />
        </div>
      </div>
    </div>
  );
}
