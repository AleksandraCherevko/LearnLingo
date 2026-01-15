import { useContext, useState, useEffect, useMemo } from "react";
import { AuthContext } from "../auth/AuthContext";
import { fetchTeachers } from "../services/teachersService";
import type { Teacher } from "../types/teacher";
import css from "../components/Teachers.module.css";
import { PropagateLoader } from "react-spinners";
import TeacherCard from "../components/TeacherCard";
import toast from "react-hot-toast";

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (!user) return [];
    const saved = localStorage.getItem(`favorites_${user.uid}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchTeachers()
      .then(setTeachers)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const saved = user ? localStorage.getItem(`favorites_${user.uid}`) : null;

    const timer = setTimeout(() => {
      setFavorites(saved ? JSON.parse(saved) : []);
    }, 0);

    return () => clearTimeout(timer);
  }, [user]);

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

  const favoriteTeachers = useMemo(() => {
    const favSet = new Set(favorites);
    return teachers.filter((teacher) =>
      favSet.has(`${teacher.name}-${teacher.surname}`)
    );
  }, [favorites, teachers]);

  if (!user) {
    return (
      <div className={css.teachersSection}>
        <div className="container">
          <p>You need to be logged in to see your favorites.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={css.loader}>
        <PropagateLoader color="var(--accent-color)" />
      </div>
    );
  }

  return (
    <div className={css.teachersSection}>
      <div className="container">
        {favoriteTeachers.length === 0 && (
          <p className={css.noFavoritesYet}>No favorites yet</p>
        )}

        <div className={css.teachersList}>
          {favoriteTeachers.map((teacher) => (
            <TeacherCard
              key={`${teacher.name}-${teacher.surname}`}
              teacher={teacher}
              isFavorite={favorites.includes(
                `${teacher.name}-${teacher.surname}`
              )}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
