export type Teacher = {
  id: string;
  avatar_url: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  experience: string;
  lesson_info: string;
  conditions: string[];
};

export type Review = {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};
