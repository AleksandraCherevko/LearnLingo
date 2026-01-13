import css from "./FavoriteButton.module.css";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

export default function FavoriteButton({
  isFavorite,
  onToggle,
  disabled,
}: FavoriteButtonProps) {
  return (
    <button
      className={`${css.favouritsBtn} ${isFavorite ? css.active : ""}`}
      onClick={onToggle}
      disabled={disabled}
    >
      <svg width="26" height="26" className={css.favouritsBtnIcon}>
        <use href="/symbol-defs.svg#icon-hurt"></use>
      </svg>
    </button>
  );
}
