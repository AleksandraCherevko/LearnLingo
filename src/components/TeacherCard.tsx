import { useState } from "react";
import type { Teacher } from "../types/teacher";
import css from "./TeacherCard.module.css";
import Button from "./Button";

type TeacherCardProps = {
  teacher: Teacher;
  isFavorite: boolean;
  onToggleFavorite: (key: string) => void;
};

export default function TeacherCard({
  teacher,
  isFavorite,
  onToggleFavorite,
}: TeacherCardProps) {
  const [expanded, setExpanded] = useState(false);
  const teacherKey = `${teacher.name}-${teacher.surname}`;

  return (
    <div className={css.teacherCard}>
      <div className={css.leftSide}>
        <div className={css.photoWrapper}>
          <img
            className={css.teachersPhoto}
            src={teacher.avatar_url}
            width={96}
            height={96}
            alt={`${teacher.name} ${teacher.surname}`}
          />
          <span className={css.onlineDot} />
        </div>
      </div>

      <div className={css.rightSide}>
        <div className={css.pretitleWrapper}>
          <p className={css.teachersPreTitle}>Languages</p>
          <div className={css.pretitleWrapperList}>
            <ul className={css.pretitleWrapperListList}>
              <li className={css.pretitleWrapperItem}>
                <div className={css.pretitleWrapperItemIcon}>
                  <svg width="16" height="16" className={css.teachersBookIcon}>
                    <use href="/symbol-defs.svg#icon-book"></use>
                  </svg>
                  <p className={css.teachersSubscribe}>Lessons online</p>
                </div>
              </li>
              <li className={css.pretitleWrapperItem}>
                <div className={css.pretitleWrapperItemIcon}>
                  <p className={css.teachersSubscribe}>
                    Lessons done: {teacher.lessons_done}
                  </p>
                </div>
              </li>
              <li className={css.pretitleWrapperItem}>
                <div className={css.pretitleWrapperItemIcon}>
                  <svg
                    width="16"
                    height="16"
                    className={css.teachersRatingIcon}
                  >
                    <use href="/symbol-defs.svg#icon-star"></use>
                  </svg>
                  <p className={css.teachersSubscribe}>
                    Rating: {teacher.rating}
                  </p>
                </div>
              </li>
              <li className={css.pretitleWrapperItem}>
                <div className={css.pretitleWrapperItemIcon}>
                  <p className={css.teachersSubscribe}>
                    Price / 1 hour:
                    <span className={css.teachersSubscribeSpan}>
                      {teacher.price_per_hour}$
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className={css.favouritsBtnWrapper}>
            <button
              className={`${css.favouritsBtn} ${isFavorite ? css.favouriteActive : ""}`}
              onClick={() => onToggleFavorite(teacherKey)}
            >
              <svg width="26" height="26" className={css.favouritsBtnIcon}>
                <use href="/symbol-defs.svg#icon-hurt"></use>
              </svg>
            </button>
          </div>
        </div>

        <h3 className={css.teachersName}>
          {teacher.name} {teacher.surname}
        </h3>

        <div className={css.teachersSkillsWrapper}>
          <ul className={css.teachersSkillsList}>
            <li>
              <p className={css.teachersSkillsDescription}>
                <span className={css.teachersSkills}>Speaks: </span>
                <span className={css.teachersSkillsLang}>
                  {teacher.languages.join(", ")}
                </span>
              </p>
            </li>
            <li>
              <p className={css.teachersSkillsDescription}>
                <span className={css.teachersSkills}>Lesson Info: </span>
                {teacher.lesson_info}
              </p>
            </li>
            <li>
              <p className={css.teachersSkillsDescription}>
                <span className={css.teachersSkills}>Conditions: </span>
                {teacher.conditions.join(", ")}
              </p>
            </li>
          </ul>
        </div>

        {expanded && (
          <>
            <div className={css.teachersExperienceWrapper}>
              <p className={css.teachersExperience}>{teacher.experience}</p>
            </div>
            {/* Здесь можно добавить отзывы и уровни */}
          </>
        )}

        <Button
          className={css.readMoreBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Read more"}
        </Button>
      </div>
    </div>
  );
}
