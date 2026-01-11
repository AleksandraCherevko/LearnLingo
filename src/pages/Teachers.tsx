import { useEffect, useState } from "react";
import { fetchTeachers } from "../services/teachersService";
import type { Teacher } from "../types/teacher";

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers()
      .then(setTeachers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Teachers</h1>

      {teachers.map((teacher, index) => (
        <div key={index}>
          <img src={teacher.avatar_url} width={80} />
          <h3>
            {teacher.name} {teacher.surname}
          </h3>
          <p>⭐ {teacher.rating}</p>
        </div>
      ))}
    </div>
  );
}
