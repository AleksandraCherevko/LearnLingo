import { useEffect, useState, useContext } from "react";
import { fetchTeachers } from "../services/teachersService";
import type { Teacher } from "../types/teacher";
import css from "./Teachers.module.css";

import { PropagateLoader } from "react-spinners";
import { AuthContext } from "../auth/AuthContext";
import TeacherCard from "./TeacherCard";
import Button from "./Button";

const ITEMS_PER_LOAD = 4;

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const { user } = useContext(AuthContext);

  // favourites

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (!user) return [];

    const saved = localStorage.getItem(`favorites_${user.uid}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!user) return;

    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(favorites));
  }, [favorites, user]);

  const toggleFavorite = (teacherKey: string) => {
    if (!user) {
      alert("This feature is available only for authorized users");
      return;
    }

    setFavorites((prev) =>
      prev.includes(teacherKey)
        ? prev.filter((key) => key !== teacherKey)
        : [...prev, teacherKey]
    );
  };

  useEffect(() => {
    fetchTeachers()
      .then(setTeachers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={css.loader}>
        <PropagateLoader color="var(--accent-color)" />
      </div>
    );
  }

  const visibleTeachers = teachers.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  return (
    <div className={css.teachersSection}>
      <div className="container">
        <div className={css.teachersList}>
          {visibleTeachers.map((teacher) => (
            <TeacherCard
              key={`${teacher.name}-${teacher.surname}`}
              teacher={teacher}
              isFavorite={favorites.includes(
                `${teacher.name}-${teacher.surname}`
              )}
              onToggleFavorite={toggleFavorite}
            />
          ))}

          {visibleCount < teachers.length && (
            <Button onClick={handleLoadMore} className={css.loadMoreBtn}>
              Load more
            </Button>
          )}
        </div>
      </div>
    </div>
    // <div className={css.teachersSection}>
    //   <div className="container">
    //     <div className={css.teachersList}>
    //       {visibleTeachers.map((teacher, index) => {
    //         const isExpanded = expandedCards[index];
    //         const teacherKey = `${teacher.name}-${teacher.surname}`;
    //         const isFavorite = favorites.includes(teacherKey);
    //         return (
    //           <div key={index} className={css.teacherCard}>
    //             <div className={css.leftSide}>
    //               <div className={css.photoWrapper}>
    //                 <img
    //                   className={css.teachersPhoto}
    //                   src={teacher.avatar_url}
    //                   width={96}
    //                   height={96}
    //                   alt={`${teacher.name} ${teacher.surname}`}
    //                 />
    //                 <span className={css.onlineDot} />
    //               </div>
    //             </div>
    //             <div className={css.rightSide}>
    //               <div className={css.pretitleWrapper}>
    //                 <p className={css.teachersPreTitle}>Languages</p>
    //                 <div className={css.pretitleWrapperList}>
    //                   <ul className={css.pretitleWrapperListList}>
    //                     <li className={css.pretitleWrapperItem}>
    //                       <div className={css.pretitleWrapperItemIcon}>
    //                         <svg
    //                           width="16"
    //                           height="16"
    //                           className={css.teachersBookIcon}
    //                         >
    //                           <use href="/symbol-defs.svg#icon-book"></use>
    //                         </svg>
    //                         <p className={css.teachersSubscribe}>
    //                           Lessons online
    //                         </p>
    //                       </div>
    //                     </li>
    //                     <li className={css.pretitleWrapperItem}>
    //                       <div className={css.pretitleWrapperItemIcon}>
    //                         <p className={css.teachersSubscribe}>
    //                           Lessons done: {teacher.lessons_done}
    //                         </p>
    //                       </div>
    //                     </li>
    //                     <li className={css.pretitleWrapperItem}>
    //                       <div className={css.pretitleWrapperItemIcon}>
    //                         <svg
    //                           width="16"
    //                           height="16"
    //                           className={css.teachersRatingIcon}
    //                         >
    //                           <use href="/symbol-defs.svg#icon-star"></use>
    //                         </svg>
    //                         <p className={css.teachersSubscribe}>
    //                           Rating: {teacher.rating}
    //                         </p>
    //                       </div>
    //                     </li>
    //                     <li className={css.pretitleWrapperItem}>
    //                       <div className={css.pretitleWrapperItemIcon}>
    //                         <p className={css.teachersSubscribe}>
    //                           Price / 1 hour:
    //                           <span className={css.teachersSubscribeSpan}>
    //                             {teacher.price_per_hour}$
    //                           </span>
    //                         </p>
    //                       </div>
    //                     </li>
    //                   </ul>
    //                 </div>
    //                 <div className={css.favouritsBtnWrapper}>
    //                   <button
    //                     className={`${css.favouritsBtn} ${
    //                       isFavorite ? css.favouriteActive : ""
    //                     }`}
    //                     onClick={() => toggleFavorite(teacherKey)}
    //                   >
    //                     <svg
    //                       width="26"
    //                       height="26"
    //                       className={css.favouritsBtnIcon}
    //                     >
    //                       <use href="/symbol-defs.svg#icon-hurt"></use>
    //                     </svg>
    //                   </button>
    //                 </div>
    //               </div>
    //               <h3 className={css.teachersName}>
    //                 {teacher.name} {teacher.surname}
    //               </h3>
    //               <div className={css.teachersSkillsWrapper}>
    //                 <ul className={css.teachersSkillsList}>
    //                   <li>
    //                     <p className={css.teachersSkillsDescription}>
    //                       <span className={css.teachersSkills}>
    //                         Speaks: {""}
    //                       </span>
    //                       <span className={css.teachersSkillsLang}>
    //                         {" "}
    //                         {teacher.languages.join(", ")}
    //                       </span>
    //                     </p>
    //                   </li>
    //                   <li>
    //                     <p className={css.teachersSkillsDescription}>
    //                       <span className={css.teachersSkills}>
    //                         {" "}
    //                         Lesson Info:{" "}
    //                       </span>
    //                       {teacher.lesson_info}
    //                     </p>
    //                   </li>
    //                   <li>
    //                     <p className={css.teachersSkillsDescription}>
    //                       <span className={css.teachersSkills}>
    //                         Conditions:
    //                       </span>{" "}
    //                       {teacher.conditions.join(", ")}
    //                     </p>
    //                   </li>
    //                 </ul>
    //               </div>
    //               {isExpanded && (
    //                 <>
    //                   <div className={css.teachersExperienceWrapper}>
    //                     <p className={css.teachersExperience}>
    //                       {teacher.experience}
    //                     </p>
    //                   </div>
    //                   <div className={css.teachersFeedbackListWrapper}>
    //                     <ul className={css.teachersFeedbackList}>
    //                       {teacher.reviews.map((review, idx) => (
    //                         <li className={css.teachersFeedbackItem} key={idx}>
    //                           <div className={css.reviewerNameIcon}>
    //                             <div className={css.avatarCircle}>
    //                               {review.reviewer_name[0]}
    //                             </div>

    //                             <div className={css.reviewerNameContainer}>
    //                               <p className={css.reviewerName}>
    //                                 {review.reviewer_name}
    //                               </p>
    //                               <div className={css.reviewerRatingIcon}>
    //                                 <svg
    //                                   width="16"
    //                                   height="16"
    //                                   className={css.reviewerRatingIconSvg}
    //                                 >
    //                                   <use href="/symbol-defs.svg#icon-star"></use>
    //                                 </svg>

    //                                 <p className={css.reviewerRating}>
    //                                   ({review.reviewer_rating})
    //                                 </p>
    //                               </div>
    //                             </div>
    //                           </div>
    //                           <p className={css.reviewerComment}>
    //                             {review.comment}
    //                           </p>
    //                         </li>
    //                       ))}
    //                     </ul>
    //                   </div>
    //                   <ul className={css.teachersLevelsList}>
    //                     {teacher.levels.map((level, idx) => (
    //                       <li key={idx} className={css.teachersLevelsItem}>
    //                         <p className={css.teachersLevels}>
    //                           <span className={css.hash}>#</span>
    //                           {level}
    //                         </p>
    //                       </li>
    //                     ))}
    //                   </ul>

    //                   <Button className={css.bookingBtn}>
    //                     Book trial lesson
    //                   </Button>
    //                 </>
    //               )}

    //               <Button
    //                 className={css.readMoreBtn}
    //                 onClick={() => toggleCard(index)}
    //               >
    //                 {isExpanded ? "Show less" : "Read more"}
    //               </Button>
    //             </div>
    //             {/* <div className={css.favouritsBtnWrapper}>
    //               <button className={css.favouritsBtn}>
    //                 <svg
    //                   width="26"
    //                   height="26"
    //                   className={css.favouritsBtnIcon}
    //                 >
    //                   <use href="/symbol-defs.svg#icon-hurt"></use>
    //                 </svg>
    //               </button>
    //             </div> */}
    //           </div>
    //         );
    //       })}

    //       {visibleCount < teachers.length && (
    //         <Button onClick={handleLoadMore} className={css.loadMoreBtn}>
    //           Load more
    //         </Button>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}
