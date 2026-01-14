import { useEffect, useState, useContext } from "react";
import { fetchTeachers } from "../services/teachersService";
import type { Teacher } from "../types/teacher";
import css from "./Teachers.module.css";

import { PropagateLoader } from "react-spinners";
import { AuthContext } from "../auth/AuthContext";
import TeacherCard from "./TeacherCard";
import Button from "./Button";

import toast from "react-hot-toast";
const ITEMS_PER_LOAD = 4;

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const { user } = useContext(AuthContext);

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
      toast.error("This feature is available only for authorized users");
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
  );
}
