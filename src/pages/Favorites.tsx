// import { useContext, useState, useEffect, useMemo } from "react";
// import { AuthContext } from "../auth/AuthContext";
// import { fetchTeachers } from "../services/teachersService";
// import type { Teacher } from "../types/teacher";
// import css from "../components/Teachers.module.css";
// import TeacherCard from "../components/TeacherCard";

// import { PropagateLoader } from "react-spinners";

// export default function Favorites() {
//   const { user } = useContext(AuthContext);
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState<string[]>(() => {
//     if (!user) return [];
//     const saved = localStorage.getItem(`favorites_${user.uid}`);
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Загружаем всех учителей
//   useEffect(() => {
//     fetchTeachers()
//       .then(setTeachers)
//       .finally(() => setLoading(false));
//   }, []);

//   // Обновляем favorites безопасно при смене пользователя
//   useEffect(() => {
//     const saved = user ? localStorage.getItem(`favorites_${user.uid}`) : null;

//     // Используем setTimeout, чтобы избежать предупреждения ESLint
//     const timer = setTimeout(() => {
//       setFavorites(saved ? JSON.parse(saved) : []);
//     }, 0);

//     return () => clearTimeout(timer);
//   }, [user]);

//   // Сохраняем изменения в localStorage
//   useEffect(() => {
//     if (!user) return;
//     localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(favorites));
//   }, [favorites, user]);

//   const favoriteTeachers = useMemo(() => {
//     const favSet = new Set(favorites);
//     return teachers.filter((teacher) =>
//       favSet.has(`${teacher.name}-${teacher.surname}`)
//     );
//   }, [favorites, teachers]);

//   if (!user) {
//     return (
//       <div className={css.teachersSection}>
//         <div className="container">
//           <p>You need to be logged in to see your favorites.</p>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className={css.loader}>
//         <PropagateLoader color="var(--accent-color)" />
//       </div>
//     );
//   }

//   return (
//     <div className={css.teachersSection}>
//       <div className="container">
//         <h1>Your Favorites</h1>
//         {favoriteTeachers.length === 0 && <p>No favorites yet</p>}

//         <div className={css.teachersList}>
//           {favoriteTeachers.map((teacher) => (
//             <TeacherCard
//               key={`${teacher.name}-${teacher.surname}`}
//               teacher={teacher}
//               isFavorite={favorites.includes(
//                 `${teacher.name}-${teacher.surname}`
//               )}
//               onToggleFavorite={toggleFavorite}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useContext, useState, useEffect, useMemo } from "react";
import { AuthContext } from "../auth/AuthContext";
import { fetchTeachers } from "../services/teachersService";
import type { Teacher } from "../types/teacher";
import css from "../components/Teachers.module.css";
import { PropagateLoader } from "react-spinners";
import TeacherCard from "../components/TeacherCard";

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (!user) return [];
    const saved = localStorage.getItem(`favorites_${user.uid}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Загружаем всех учителей
  useEffect(() => {
    fetchTeachers()
      .then(setTeachers)
      .finally(() => setLoading(false));
  }, []);

  // Обновляем favorites безопасно при смене пользователя
  useEffect(() => {
    const saved = user ? localStorage.getItem(`favorites_${user.uid}`) : null;

    // Используем setTimeout, чтобы избежать предупреждения ESLint
    const timer = setTimeout(() => {
      setFavorites(saved ? JSON.parse(saved) : []);
    }, 0);

    return () => clearTimeout(timer);
  }, [user]);
  // Сохраняем изменения в localStorage
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
        <h1>Your Favorites</h1>
        {favoriteTeachers.length === 0 && <p>No favorites yet</p>}

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
