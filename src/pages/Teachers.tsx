import { useEffect, useState } from "react";
import { fetchTeachers } from "../services/teachersService";
import type { Teacher } from "../types/teacher";

const ITEMS_PER_LOAD = 4;

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  useEffect(() => {
    fetchTeachers()
      .then(setTeachers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  const visibleTeachers = teachers.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  return (
    <div>
      {visibleTeachers.map((teacher, index) => (
        <div key={index}>
          <img
            src={teacher.avatar_url}
            width={80}
            alt={`${teacher.name} ${teacher.surname}`}
          />
          <p>Languages</p>

          <p>Lessons online</p>

          <p>Lessons done: {teacher.lessons_done}</p>

          <svg width="16" height="16">
            <use href="/symbol-defs.svg#icon-star"></use>
          </svg>
          <p> Rating: {teacher.rating}</p>

          <p>Price/1 hour: {teacher.price_per_hour}</p>

          <button>
            <svg width="26" height="26">
              <use href="/symbol-defs.svg#icon-hurt"></use>
            </svg>
          </button>
          <h3>
            {teacher.name} {teacher.surname}
          </h3>

          <h4>Speaks</h4>
          <p>{teacher.languages.join(", ")}</p>

          <h4>Lesson Info:</h4>
          <p>{teacher.lesson_info}</p>

          <h4>Conditions:</h4>
          <p>{teacher.conditions.join(", ")}</p>

          <ul>
            {teacher.reviews.map((review, idx) => (
              <li key={idx}>
                <p>
                  {review.reviewer_name} ({review.reviewer_rating}⭐):{" "}
                  {review.comment}
                </p>
              </li>
            ))}
          </ul>
          <p>{teacher.experience}</p>
          <p>{teacher.levels}</p>
          <button>Book trial lesson</button>
        </div>
      ))}

      {visibleCount < teachers.length && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
    </div>
  );
}
