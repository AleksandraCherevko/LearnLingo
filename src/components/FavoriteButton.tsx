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
      aria-label="Toggle favorite"
    >
      <svg width="26" height="26" className={css.favouritsBtnIcon}>
        <use
          href={
            isFavorite
              ? "/symbol-defs.svg#icon-heart-hover"
              : "/symbol-defs.svg#icon-heart"
          }
        />
      </svg>
    </button>
  );
}
