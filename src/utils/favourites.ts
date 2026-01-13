export const getFavorites = (): string[] => {
  const data = localStorage.getItem("favorites");
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = (favorites: string[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
